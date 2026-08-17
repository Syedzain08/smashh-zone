'use client';

import Link from 'next/link';
import { useState, useSyncExternalStore } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

const EVENT_DATE = new Date('2026-09-12T09:00:00+05:00'); 

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const DEFAULT_TIME: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

let cachedTimeLeft: TimeLeft = DEFAULT_TIME;

function calculateTimeLeft(): TimeLeft {
  const diff = Math.max(EVENT_DATE.getTime() - Date.now(), 0);

  if (diff <= 0) return DEFAULT_TIME;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  if (
    cachedTimeLeft.days === days &&
    cachedTimeLeft.hours === hours &&
    cachedTimeLeft.minutes === minutes &&
    cachedTimeLeft.seconds === seconds
  ) {
    return cachedTimeLeft;
  }

  cachedTimeLeft = { days, hours, minutes, seconds };
  return cachedTimeLeft;
}

function subscribeToClock(callback: () => void) {
  const interval = setInterval(callback, 1000);
  return () => clearInterval(interval);
}

function getServerSnapshot(): TimeLeft | null {
  return null;
}

const SCHEDULE = [
  {
    day: 'Day 01',
    date: 'Sep 12, 2026',
    title: 'Championship Rounds',
    events: [
      { time: '09:00 AM', label: 'Gates Open & Registration' },
      { time: '10:00 AM', label: 'Group Stage Matches' },
      { time: '06:00 PM', label: 'Quarterfinal Showdowns' },
    ],
  },
  {
    day: 'Day 02',
    date: 'Sep 13, 2026',
    title: 'Finals + Concert Night',
    events: [
      { time: '10:00 AM', label: 'Semifinal Battles' },
      { time: '04:00 PM', label: 'Championship Final' },
      { time: '07:30 PM', label: 'Concert Night & Closing' },
    ],
  },
];

function ScoreboardDigit({ value, label }: { value: number | null; label: string }) {
  const displayValue = value !== null ? String(value).padStart(2, '0') : '--';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex h-18 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#050806] shadow-2xl backdrop-blur-md sm:h-22 sm:w-22 md:h-26 md:w-24">
        <span className="font-primary text-3xl font-black tabular-nums tracking-tight text-accent sm:text-4xl md:text-5xl drop-shadow-[0_0_12px_rgba(212,242,30,0.4)]">
          {displayValue}
        </span>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function EventDetails() {
  const timeLeft = useSyncExternalStore(
    subscribeToClock,
    calculateTimeLeft,
    getServerSnapshot
  );

  const [isNavigating, setIsNavigating] = useState(false);

  return (
    <section id='event-details' className="relative overflow-hidden bg-linear-to-b from-[#090d0b] via-[#0f1712] to-[#090d0b] px-6 py-20 text-white md:px-12 md:py-28">
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-96 w-xl -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #d4f21e 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-block rounded-full border border-[#d4f21e]/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            Mark Your Calendar
          </span>
          <h2 className="mt-4 font-primary text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
            Two Days On The Clock
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-slate-300 md:text-base leading-relaxed">
            Championship badminton by day, Concert Night to close it out. Here&apos;s how it plays out on court &mdash; and how long you have to grab a seat.
          </p>
        </div>
        <div className="mx-auto mt-12 flex w-fit items-center justify-center gap-2 rounded-3xl border border-white/10 bg-white/3 p-4 sm:gap-4 sm:p-6 md:p-8 backdrop-blur-md shadow-2xl">
          <ScoreboardDigit value={timeLeft?.days ?? null} label="Days" />
          <span className="pb-6 font-primary text-2xl font-bold text-white/30 sm:text-3xl">:</span>
          <ScoreboardDigit value={timeLeft?.hours ?? null} label="Hours" />
          <span className="pb-6 font-primary text-2xl font-bold text-white/30 sm:text-3xl">:</span>
          <ScoreboardDigit value={timeLeft?.minutes ?? null} label="Mins" />
          <span className="pb-6 font-primary text-2xl font-bold text-white/30 sm:text-3xl">:</span>
          <ScoreboardDigit value={timeLeft?.seconds ?? null} label="Secs" />
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {SCHEDULE.map((day) => (
            <div
              key={day.day}
              className="group relative rounded-3xl border border-white/10 bg-white/3 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-[#d4f21e]/40 hover:bg-white/5 hover:shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">
                    {day.day}
                  </span>
                  <h3 className="mt-1 font-primary text-2xl font-extrabold uppercase text-white sm:text-3xl">
                    {day.title}
                  </h3>
                </div>
                <span className="shrink-0 whitespace-nowrap rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-300 sm:px-3 sm:py-1.5">
                  {day.date}
                </span>
              </div>

              <ul className="mt-6 flex flex-col gap-4">
                {day.events.map((event) => (
                  <li
                    key={event.label}
                    className="flex items-center justify-between text-sm text-slate-300 transition-colors group-hover:text-white"
                  >
                    <span className="font-primary font-bold tabular-nums text-accent">
                      {event.time}
                    </span>
                    <span className="font-medium text-slate-200">{event.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/event-details"
            aria-disabled={isNavigating}
            onClick={(e) => {
              if (isNavigating) {
                e.preventDefault();
                return;
              }
              setIsNavigating(true);
            }}
            className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:border-accent/50 hover:bg-white/10 ${
              isNavigating ? 'pointer-events-none opacity-70' : ''
            }`}
          >
            {isNavigating ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Loading&hellip;
              </>
            ) : (
              <>
                Full Schedule &amp; Categories
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </Link>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-y-4 text-xs font-medium uppercase tracking-widest text-slate-400 sm:flex-row sm:gap-x-8 sm:gap-y-2">
          <div className="flex items-start gap-2 text-left sm:items-center">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent sm:mt-0" />
            <span>Ages 15+</span>
          </div>
          <div className="flex items-start gap-2 text-left sm:items-center">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent sm:mt-0" />
            <span>Concert access included with All-Access &amp; Concert tiers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
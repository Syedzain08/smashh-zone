import Link from 'next/link';
import {
  Trophy,
  Clock,
  Users,
  ShieldCheck,
  IdCard,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Details | Smashh Zone Badminton Championship',
  description:
    'Full schedule and match categories for the Smashh Zone Badminton Championship — U17, U19, and Open — Sep 5–6, 2026 at Gaddafi Stadium, Lahore.',
};

type Category = {
  code: string;
  name: string;
  eligibility: string;
  format: string;
  day: string;
  window: string;
  note?: string;
};

const CATEGORIES: Category[] = [
  {
    code: 'U17',
    name: 'Under-17',
    eligibility: 'Ages 15 to 16 (Under 17 as of Sep 5, 2026)',
    format: 'Singles, Doubles & Mixed',
    day: 'Day 01 · Sep 5',
    window: 'Starts 10:00 AM',
    note: 'Original CNIC or B-Form required at check-in for age verification',
  },
  {
    code: 'U19',
    name: 'Under-19',
    eligibility: 'Ages 15 to 18 (Under 19 as of Sep 5, 2026)',
    format: 'Singles, Doubles & Mixed',
    day: 'Day 01 · Sep 5',
    window: 'Starts 10:00 AM',
    note: 'Original CNIC or B-Form required at check-in for age verification',
  },
  {
    code: 'OPEN',
    name: 'Open Category',
    eligibility: 'Ages 15 and above (No upper age limit)',
    format: 'Singles, Doubles & Mixed',
    day: 'Day 01 · Sep 5',
    window: 'Starts 10:00 AM',
    note: 'Open to all skill levels meeting the 15+ age requirement',
  },
];

const SCHEDULE = [
  {
    day: 'Day 01',
    date: 'Sep 5, 2026',
    title: 'Group Stage & Elimination Rounds',
    events: [
      { time: '09:00 AM', label: 'Gates Open & Player Registration' },
      { time: '10:00 AM', label: 'U17 Category Matches (Singles, Doubles, Mixed)' },
      { time: '10:00 AM', label: 'U19 Category Matches (Singles, Doubles, Mixed)' },
      { time: '10:00 AM', label: 'Open Category Matches (Singles, Doubles, Mixed)' },
      { time: '06:00 PM', label: 'Quarterfinal Showdowns (All Categories)' },
    ],
  },
  {
    day: 'Day 02',
    date: 'Sep 6, 2026',
    title: 'Finals + Concert Night',
    events: [
      { time: '10:00 AM', label: 'Semifinal Battles (All Categories)' },
      { time: '04:00 PM', label: 'Championship Finals & Podium Ceremony' },
      { time: '07:30 PM', label: 'Qawwali Night & Closing Ceremony' },
    ],
  },
];

function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="group relative flex flex-col rounded-3xl border border-white/10 bg-white/3 p-6 backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:bg-white/5 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
          <Users className="h-5 w-5" />
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-300">
          {category.day}
        </span>
      </div>

      <h3 className="mt-6 font-primary text-3xl font-extrabold uppercase text-white">
        {category.code}
      </h3>
      <p className="mt-1 text-xs font-bold uppercase tracking-wider text-accent">
        {category.name}
      </p>

      <ul className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-300 sm:text-sm">
        <li className="flex items-start gap-2.5">
          <IdCard className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <span>{category.eligibility}</span>
        </li>
        <li className="flex items-start gap-2.5">
          <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <span>{category.format}</span>
        </li>
        <li className="flex items-start gap-2.5">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <span>{category.window}</span>
        </li>
      </ul>

      {category.note && (
        <p className="mt-5 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-[11px] leading-relaxed text-slate-400">
          {category.note}
        </p>
      )}
    </div>
  );
}

export default function EventDetailsPage() {
  return (
    <main className="min-h-screen bg-[#050806] px-6 pb-20 pt-28 text-white md:px-12">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -right-40 bottom-1/3 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <section className="mx-auto max-w-3xl py-12 text-center">
          <span className="rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent">
            Sep 5–6, 2026 · Gaddafi Stadium, Lahore
          </span>
          <h1 className="mt-6 font-primary text-4xl font-extrabold uppercase tracking-tight sm:text-6xl">
            Event <span className="font-display font-normal lowercase text-accent">Details</span>
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-slate-400 md:text-base">
            Everything you need to know before stepping onto Gaddafi Stadium grounds — tournament match categories, the full schedule, and entry requirements.
          </p>
        </section>

        <section className="my-16">
          <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                Tournament Categories
              </span>
              <h2 className="mt-1 font-primary text-2xl font-extrabold uppercase sm:text-3xl">
                Match Divisions
              </h2>
            </div>
            <p className="hidden max-w-xs text-right text-xs text-slate-400 sm:block">
              All categories feature Singles, Doubles, and Mixed events. Minimum age 15+.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {CATEGORIES.map((c) => (
              <CategoryCard key={c.code} category={c} />
            ))}
          </div>
        </section>

        <section className="my-16">
          <div className="border-b border-white/10 pb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Run of Show
            </span>
            <h2 className="mt-1 font-primary text-2xl font-extrabold uppercase sm:text-3xl">
              Full Schedule
            </h2>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {SCHEDULE.map((day) => (
              <div
                key={day.day}
                className="group relative rounded-3xl border border-white/10 bg-white/3 p-6 backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:bg-white/5 sm:p-8"
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
        </section>

        <section className="my-16 rounded-3xl border border-accent/30 bg-accent/5 p-8 backdrop-blur-md md:p-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent">
                <ShieldCheck className="h-4 w-4" />
                <span>Before You Arrive</span>
              </div>
              <h2 className="mt-3 text-2xl font-extrabold uppercase md:text-3xl">
                Check-In Guidelines
              </h2>
              <ul className="mt-4 flex flex-col gap-2 text-xs leading-relaxed text-slate-300 md:text-sm">
                <li>• Minimum age requirement for all participants and spectators is 15 years.</li>
                <li>• Digital ticket QR code, matched to your CNIC.</li>
                <li>• CNIC or B-Form required for all U17 and U19 category players.</li>
                <li>• Entry via Gate 3 starting at 9:00 AM both days.</li>
              </ul>
            </div>

            <div className="flex shrink-0 flex-col gap-3">
              <Link
                href="/#tickets"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-black transition-all hover:scale-105"
              >
                Get Tickets
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
          <MapPin className="h-3.5 w-3.5 text-accent" />
          Gaddafi Stadium, Gulberg III, Lahore — questions? support@smashhzone.com
        </p>
      </div>
    </main>
  );
}
'use client';

import Link from 'next/link';
import { Check, X, Flame, Mic, Trophy, Star } from 'lucide-react';

type PassFeature = {
  label: string;
  included: boolean;
};

type Pass = {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  totalTickets: number;
  popular?: boolean;
  icons: React.ReactNode;
  features: PassFeature[];
};

const PASSES: Pass[] = [
  {
    slug: 'rhythm',
    name: 'The Rhythm Pass',
    tagline: 'Concert Only Access',
    price: '1,999',
    totalTickets: 2300,
    icons: (
      <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 p-2 text-accent">
        <Mic className="h-4 w-4" />
      </div>
    ),
    features: [
      { label: 'Badminton Access', included: false },
      { label: 'Base Concert Access', included: true },
      { label: 'VIP Concert Access', included: false },
      { label: 'Front Row Seats', included: false },
    ],
  },
  {
    slug: 'champion',
    name: 'The Champion Pass',
    tagline: 'Badminton + Concert Access',
    price: '2,299',
    totalTickets: 1000,
    popular: true,
    icons: (
      <div className="flex items-center gap-1.5 rounded-xl border border-accent/30 bg-accent/10 p-2 text-accent">
        <Trophy className="h-4 w-4" />
        <span className="text-xs font-black text-slate-400">+</span>
        <Mic className="h-4 w-4" />
      </div>
    ),
    features: [
      { label: 'Badminton Access', included: true },
      { label: 'Base Concert Access', included: true },
      { label: 'VIP Concert Access', included: false },
      { label: 'Front Row Seats', included: false },
    ],
  },
  {
    slug: 'elite',
    name: 'The Elite Pass',
    tagline: 'VIP Experience + Badminton Access',
    price: '4,999',
    totalTickets: 200,
    icons: (
      <div className="flex items-center gap-1.5 rounded-xl border border-accent/40 bg-accent/20 p-2 text-accent">
        <Trophy className="h-4 w-4" />
        <span className="text-xs font-black text-slate-400">+</span>
        <Mic className="h-4 w-4" />
        <span className="text-xs font-black text-slate-400">+</span>
        <Star className="h-4 w-4 fill-accent" />
      </div>
    ),
    features: [
      { label: 'Badminton Access', included: true },
      { label: 'Base Concert Access', included: true },
      { label: 'VIP Concert Access', included: true },
      { label: 'Front Row Seats', included: true },
    ],
  },
];

export default function Pricing() {
  return (
    <section id="tickets" className="relative overflow-hidden bg-linear-to-b from-[#090d0b] via-[#0d1410] to-[#080c0a] px-6 py-20 text-white md:px-12 md:py-28">

      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-120 w-xl -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #d4f21e 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            Choose Your Experience
          </span>
          <h2 className="mt-4 font-primary text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
            Grab Your Tickets
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-slate-300 md:text-base leading-relaxed">
            Only 3,500 total passes available across two action-packed days at Gaddafi Stadium. Lock in your spot before they&apos;re gone.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:items-stretch">
          {PASSES.map((pass) => (
            <div
              key={pass.name}
              className={`group relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 backdrop-blur-md sm:p-8 ${
                pass.popular
                  ? 'z-10 border-2 border-accent bg-white/3 shadow-[0_0_35px_rgba(212,242,30,0.15)]'
                  : 'border border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/3'
              }`}
            >
              {pass.popular && (
                <div className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-accent px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-black shadow-lg">
                  <Flame className="h-3.5 w-3.5 fill-black" />
                  Most Popular
                </div>
              )}

              <div>
                <div className="border-b border-white/10 pb-6">
                  <div className="flex items-center justify-between gap-2">
                    {pass.icons}
                    <span className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                      {pass.totalTickets} Available
                    </span>
                  </div>

                  <h3 className="mt-4 font-primary text-2xl font-extrabold uppercase text-white">
                    {pass.name}
                  </h3>
                  
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-accent">
                    {pass.tagline}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="font-primary text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                      PKR {pass.price}
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                    *Exclusive of applicable taxes
                  </p>
                </div>

                <ul className="mt-6 flex flex-col gap-3">
                  {pass.features.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center justify-between gap-3 text-xs sm:text-sm"
                    >
                      <span
                        className={
                          item.included
                            ? 'font-medium text-slate-200'
                            : 'text-slate-500 line-through'
                        }
                      >
                        {item.label}
                      </span>
                      {item.included ? (
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      ) : (
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5 text-slate-600">
                          <X className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/checkout?tier=${pass.slug}`}
                className={`mt-8 w-full block text-center rounded-full py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  pass.popular
                    ? 'bg-accent text-black hover:scale-[1.02] hover:bg-[#c2e01a] shadow-[0_0_20px_rgba(212,242,30,0.3)]'
                    : 'border border-white/20 bg-white/5 text-white hover:border-accent/50 hover:bg-white/10'
                }`}
              >
                Buy Pass &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
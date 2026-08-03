'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Check, X, Flame, Mic, Trophy, Star, Loader2 } from 'lucide-react';
import { VARIANTS, PassTierKey } from '@/lib/pricing';

const PASS_ICONS: Record<PassTierKey, React.ReactNode> = {
  rhythm: (
    <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 p-2 text-accent">
      <Mic className="h-4 w-4" />
    </div>
  ),
  champion: (
    <div className="flex items-center gap-1.5 rounded-xl border border-accent/30 bg-accent/10 p-2 text-accent">
      <Trophy className="h-4 w-4" />
      <span className="text-xs font-black text-slate-400">+</span>
      <Mic className="h-4 w-4" />
    </div>
  ),
  elite: (
    <div className="flex items-center gap-1.5 rounded-xl border border-accent/40 bg-accent/20 p-2 text-accent">
      <Trophy className="h-4 w-4" />
      <span className="text-xs font-black text-slate-400">+</span>
      <Mic className="h-4 w-4" />
      <span className="text-xs font-black text-slate-400">+</span>
      <Star className="h-4 w-4 fill-accent" />
    </div>
  ),
};

const DISPLAY_ORDER: PassTierKey[] = ['rhythm', 'champion', 'elite'];

export default function Pricing() {
  const passes = DISPLAY_ORDER.map((slug) => VARIANTS[slug]);
  const [loadingTier, setLoadingTier] = useState<PassTierKey | null>(null);

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
          {passes.map((pass) => {
            const isLoading = loadingTier === pass.slug;
            const isOtherLoading = loadingTier !== null && !isLoading;

            return (
              <div
                key={pass.slug}
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
                      {PASS_ICONS[pass.slug]}
                      <span className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                        {pass.totalTickets} Available
                      </span>
                    </div>

                    <h3 className="mt-4 font-primary text-2xl font-extrabold uppercase text-white">
                      {pass.label}
                    </h3>

                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-accent">
                      {pass.tagline}
                    </p>

                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="font-primary text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                        PKR {(pass.price / 100).toLocaleString()}
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
                  aria-disabled={isLoading || isOtherLoading}
                  onClick={(e) => {
                    if (isLoading || isOtherLoading) {
                      e.preventDefault();
                      return;
                    }
                    setLoadingTier(pass.slug);
                  }}
                  className={`mt-8 flex w-full items-center justify-center gap-2 rounded-full py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                    pass.popular
                      ? 'bg-accent text-black hover:scale-[1.02] hover:bg-[#c2e01a] shadow-[0_0_20px_rgba(212,242,30,0.3)]'
                      : 'border border-white/20 bg-white/5 text-white hover:border-accent/50 hover:bg-white/10'
                  } ${isOtherLoading ? 'pointer-events-none opacity-50' : ''} ${
                    isLoading ? 'pointer-events-none' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Loading&hellip;
                    </>
                  ) : (
                    <>Buy Pass &rarr;</>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-b from-[#090d0b] via-[#0d1410] to-[#080c0a] px-6 py-20 text-white">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-120 w-xl -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #d4f21e 0%, transparent 70%)' }}
      />

      <div className="relative w-full max-w-md rounded-3xl border border-accent/30 bg-white/3 p-8 text-center backdrop-blur-md shadow-[0_0_35px_rgba(212,242,30,0.15)] sm:p-10">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-accent/40 bg-accent/20 text-accent ring-8 ring-accent/10">
          <Check className="h-10 w-10 animate-bounce" />
        </div>

        <h1 className="font-primary text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
          You&apos;re All Set! 🏸
        </h1>

        <p className="mt-3 text-sm text-slate-300 leading-relaxed">
          An email is on its way to you with your tickets!
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <Link
            href="/"
            className="w-full rounded-full bg-accent py-4 text-xs font-bold uppercase tracking-widest text-black transition-all duration-300 hover:scale-[1.02] hover:bg-[#c2e01a] shadow-[0_0_20px_rgba(212,242,30,0.3)]"
          >
            Back to Home
          </Link>

          <Link
            href="/support/missing-tickets"
            className="text-xs font-semibold text-slate-400 underline decoration-slate-600 underline-offset-4 transition hover:text-accent"
          >
            Didn’t get your tickets?
          </Link>
        </div>
      </div>
    </main>
  );
}
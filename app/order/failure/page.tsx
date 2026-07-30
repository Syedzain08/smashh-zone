'use client';

import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function OrderFailurePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-b from-[#090d0b] via-[#0d1410] to-[#080c0a] px-6 py-20 text-white">
     
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-120 w-xl -translate-x-1/2 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #f43f5e 0%, transparent 70%)' }}
      />

      <div className="relative w-full max-w-md rounded-3xl border border-rose-500/30 bg-white/3 p-8 text-center backdrop-blur-md shadow-[0_0_35px_rgba(244,63,94,0.12)] sm:p-10">
   
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-rose-500/40 bg-rose-500/20 text-rose-400 ring-8 ring-rose-500/10">
          <AlertTriangle className="h-10 w-10 animate-pulse" />
        </div>

        <h1 className="font-primary text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
          Payment Unsuccessful
        </h1>

        <p className="mt-3 text-sm text-slate-300 leading-relaxed">
          Something went wrong while processing your payment. Don’t worry, your card was not charged.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <Link
            href="/checkout"
            className="w-full rounded-full bg-rose-500 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.02] hover:bg-rose-600 shadow-[0_0_20px_rgba(244,63,94,0.3)]"
          >
            Try Again
          </Link>

          <Link
            href="mailto:support@smashhzone.com"
            className="text-xs font-semibold text-slate-400 underline decoration-slate-600 underline-offset-4 transition hover:text-white"
          >
            Need help with your payment?
          </Link>
        </div>
      </div>
    </main>
  );
}
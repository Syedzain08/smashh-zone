'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export default function MissingTicketsPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/support/resend-tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: 'success',
          message: data.message || 'Check your inbox! If an order exists, your tickets are on the way.',
        });
        setEmail('');
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Failed to request tickets. Please check your email and try again.',
        });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Network error. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-b from-[#090d0b] via-[#0d1410] to-[#080c0a] px-6 py-20 text-white">
    
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-120 w-xl -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #d4f21e 0%, transparent 70%)' }}
      />

      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/3 p-8 text-center backdrop-blur-md shadow-[0_0_35px_rgba(212,242,30,0.1)] sm:p-10">
        
  
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
          <Mail className="h-8 w-8" />
        </div>

        <h1 className="font-primary text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
          Find Your Tickets
        </h1>

        <p className="mt-2 text-xs text-slate-300 leading-relaxed">
          Enter the email address you used during checkout and we&apos;ll resend your event passes immediately.
        </p>

  
        {status && (
          <div
            className={`mt-6 flex items-start gap-3 rounded-2xl p-4 text-left text-xs font-medium border ${
              status.type === 'success'
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
            }`}
          >
            {status.type === 'success' ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
            )}
            <p>{status.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="text-left">
            <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 ml-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-xs font-bold uppercase tracking-widest text-black transition-all duration-300 hover:scale-[1.02] hover:bg-[#c2e01a] shadow-[0_0_20px_rgba(212,242,30,0.3)] disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Sending Tickets...</span>
              </>
            ) : (
              <span>Resend My Tickets &rarr;</span>
            )}
          </button>
        </form>

        <div className="mt-8 border-t border-white/10 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Main Page</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
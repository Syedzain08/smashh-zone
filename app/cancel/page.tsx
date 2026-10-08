import { CalendarX, Phone } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event cancelled',
  description: 'The Smashh Zone event has been cancelled. For refunds or reimbursements, contact Najam Ali Khan on +92 316 4968340.',
  robots: { index: false, follow: false },
};

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-[#050806] text-white px-6 md:px-12 flex items-center justify-center">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-1/3 -right-40 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <section
        role="alert"
        className="relative w-full max-w-2xl rounded-3xl border border-accent/30 bg-accent/5 p-8 md:p-12 backdrop-blur-md"
      >
        <CalendarX className="h-10 w-10 text-accent" aria-hidden="true" />

        <h1 className="mt-6 text-3xl sm:text-5xl font-extrabold tracking-tight">
          This event has been cancelled
        </h1>

        <p className="mt-4 text-sm md:text-base text-slate-300 leading-relaxed">
          Smashh Zone has been cancelled due to security concerns. Ticket sales are closed.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400 leading-relaxed">
            For any refunds or reimbursements, contact:
          </p>
          <p className="mt-2 text-lg font-bold">Najam Ali Khan</p>
          <a
            href="tel:+923164968340"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-slate-950 transition-all hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            +92 316 4968340
          </a>
        </div>
      </section>
    </main>
  );
}
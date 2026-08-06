import Link from 'next/link';
import { Trophy, Music, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Smashh Zone — Lahore’s premier badminton championship and live music festival managed by JSM.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050806] text-white pt-28 pb-20 px-6 md:px-12">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-1/3 -right-40 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <section className="text-center max-w-3xl mx-auto py-12">
          <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">
            The Ultimate Experience
          </span>
          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight">
            Where High-Octane Sport Meets <span className="text-accent font-display font-normal">Live Music</span>
          </h1>
          <p className="mt-6 text-slate-400 text-sm md:text-base leading-relaxed">
          Smashh Zone is Lahore&apos;s premier sports-entertainment festival — an open badminton championship bringing players from across the city together with powerhouse musical artists on one legendary stage at Gaddafi Stadium.          </p>
        </section>

    
        <section className="grid gap-6 md:grid-cols-3 my-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <Trophy className="h-10 w-10 text-accent mb-4" />
            <h3 className="text-lg font-bold">Championship Badminton</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Watch registered players compete in high-stakes matches designed to keep you on the edge of your seat.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <Music className="h-10 w-10 text-accent mb-4" />
            <h3 className="text-lg font-bold">Live Concerts</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Feel the energy soar as electrifying musical artists perform live sets after the tournament action.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <MapPin className="h-10 w-10 text-accent mb-4" />
            <h3 className="text-lg font-bold">Iconic Venue</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Hosted in the heart of Lahore at Gaddafi Stadium with world-class lighting, sound, and seating arrangements.
            </p>
          </div>
        </section>

     
        <section className="my-16 rounded-3xl border border-accent/30 bg-accent/5 p-8 md:p-12 backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="h-4 w-4" />
                <span>Event Management</span>
              </div>
              <h2 className="mt-3 text-2xl md:text-3xl font-extrabold uppercase">
                Directed & Managed by <span className="text-accent">JSM</span>
              </h2>
              <p className="mt-3 text-xs md:text-sm text-slate-300 leading-relaxed">
                Organized by <strong className="text-white">JSM - JOJO Sports & Management</strong>, Smashh Zone sets a new benchmark for professional sports event execution, seamlessly combining competitive badminton with unforgettable spectator entertainment
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/#artist-showcase"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-slate-950 transition-all hover:scale-105"
              >
                Explore Lineup
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center border-t border-white/10 pt-12 text-slate-300">
          <div>
            <span className="block text-3xl font-black text-accent">100%</span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Pure Energy</span>
          </div>
          <div>
            <span className="block text-3xl font-black text-accent">Gaddafi</span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Stadium Lahore</span>
          </div>
          <div>
            <span className="block text-3xl font-black text-accent">Live</span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Artist Performances</span>
          </div>
          <div>
            <span className="block text-3xl font-black text-accent">JSM</span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Managed Event</span>
          </div>
        </section>
      </div>
    </main>
  );
}
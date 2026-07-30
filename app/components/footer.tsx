'use client';

import Link from 'next/link';
import { Mail, ArrowUpRight, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#050806] border-t border-white/10 px-6 pt-16 pb-12 text-white md:px-12 md:pt-20">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-80 w-120 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between border-b border-white/10 pb-12">
          <div>
            <Link 
              href="/" 
              className="font-display text-3xl md:text-4xl text-white hover:text-accent transition-colors"
            >
              Smashh <span className="text-accent">zone</span>
            </Link>
            <p className="mt-2 max-w-sm text-xs text-slate-400 leading-relaxed">
              The ultimate fusion of high-octane badminton action and live music performance at Gaddafi Stadium.
            </p>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-accent/30 bg-accent/10 px-6 py-4 backdrop-blur-md">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                An Event Directed & Managed By
              </span>
              <span className="font-primary text-base font-extrabold uppercase tracking-wide text-accent">
                JSM - JOJO Sports & Management
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12">
         
          <div className="lg:col-span-7">
            <h4 className="text-xs font-bold uppercase tracking-widest text-accent">
              Sitemap
            </h4>
            <ul className="mt-6 grid grid-cols-2 gap-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home Page
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  About Page
                </Link>
              </li>
              <li>
                <Link href="/artists" className="hover:text-accent transition-colors">
                  Artists Page
                </Link>
              </li>
              <li>
                <Link
                  href="/support/missing-tickets"
                  className="inline-flex items-center gap-1 text-accent hover:underline"
                >
                  Didn&apos;t Get Your Ticket?
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-accent transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-accent">
              Contact & Support
            </h4>
            <ul className="mt-6 flex flex-col gap-3 text-xs text-slate-300">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <span className="text-slate-400">General Contact:</span>
                <Link
                  href="mailto:contact@smashhzone.com"
                  className="font-medium text-white hover:text-accent underline transition-colors"
                >
                  contact@smashhzone.com
                </Link>
              </li>
                <li className="flex flex-wrap items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-accent" />
                  <span className="text-slate-400">Support Enquiries:</span>
                  <Link
                    href="mailto:support@smashhzone.com"
                    className="font-medium text-white hover:text-accent underline transition-colors"
                  >
                    support@smashhzone.com
                  </Link>
                </li>
                <li className="flex flex-wrap items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-accent" />
                  <span className="text-slate-400">CEO:</span>
                  <Link
                    href="tel:+923164968340"
                    className="font-medium text-white hover:text-accent underline transition-colors"
                  >
                    0316 4968340
                  </Link>
                </li>
                <li className="flex flex-wrap items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-accent" />
                  <span className="text-slate-400">COO:</span>
                  <Link
                    href="tel:+923208430514"
                    className="font-medium text-white hover:text-accent underline transition-colors"
                  >
                    0320 8430514
                  </Link>
                </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between text-[11px] font-medium text-slate-500">
          <div className="flex flex-wrap items-center gap-4">
            <p>© {new Date().getFullYear()} Smashhzone. All rights reserved.</p>
            <span className="hidden sm:inline">•</span>
            <div className="flex gap-3">
              <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-slate-300 transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
          <p className="uppercase tracking-wider">
            Organized by <span className="text-slate-300">JSM - JOJO Sports & Management</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
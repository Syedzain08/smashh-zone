'use client';

import { MapPin, Navigation, Clock, ShieldCheck, Car } from 'lucide-react';

export default function VenueSection() {
  const stadiumAddress = 'Gaddafi Stadium, Hafeez Kardar Rd, Block E 2 Gulberg III, Lahore, Punjab';
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(stadiumAddress)}`;
  const embedMapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.383181827443!2d74.33159027660232!3d31.51227097421867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904618e7b1c31%3A0x6a1a1f3b8b1b1b1b!2sGaddafi%20Stadium!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk`;

  return (
    <section id="venue" className="relative overflow-hidden bg-[#060907] px-6 py-20 text-white md:px-12 md:py-28">
      <div
        className="pointer-events-none absolute -bottom-32 right-1/4 h-112 w-md rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            Location & Access
          </span>
          <h2 className="mt-4 font-primary text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
            The Venue
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-300 md:text-base">
            Smash Zone 2026 takes center stage at the iconic Gaddafi Stadium in Lahore. Get your route, entrance details, and parking guidance below.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:items-stretch">
          
     
          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/3 p-6 backdrop-blur-md sm:p-8 lg:col-span-5">
            <div>
      
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent">
                    Official Host Stadium
                  </span>
                  <h3 className="mt-1 font-primary text-2xl font-extrabold uppercase text-white sm:text-3xl">
                    Gaddafi Stadium
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Gulberg III, Lahore, Punjab, Pakistan
                  </p>
                </div>
                <div className="flex shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 p-3 text-accent">
                  <MapPin className="h-6 w-6" />
                </div>
              </div>

          
              <div className="mt-6 flex flex-col gap-5">
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent">
                    <Navigation className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Entrance Gate</h4>
                    <p className="mt-0.5 text-xs text-slate-300">
                      General Entry via Gate 3
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Gates Opening</h4>
                    <p className="mt-0.5 text-xs text-slate-300">
                      Gates open at 9:00 AM PST. Matches start at 10:00 AM.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent">
                    <Car className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Parking Facility</h4>
                    <p className="mt-0.5 text-xs text-slate-300">
                      Designated vehicle parking available near Indoor Gymnasium Hall
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Security & Verification</h4>
                    <p className="mt-0.5 text-xs text-slate-300">
                      CNIC & digital ticket QR match required at security checkpoints.
                    </p>
                  </div>
                </div>
              </div>
            </div>

        
            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-[1.02] hover:opacity-90"
            >
              <Navigation className="h-4 w-4 fill-black" />
              Get Directions on Google Maps
            </a>
          </div>


          <div className="relative min-h-87.5 overflow-hidden rounded-3xl border border-white/10 bg-white/2 backdrop-blur-md lg:col-span-7 lg:min-h-full">
          
            <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/80 px-3.5 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-200">
                Gaddafi Stadium · Live Location
              </span>
            </div>

            <iframe
              title="Gaddafi Stadium Location Map"
              src={embedMapUrl}
              className="h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
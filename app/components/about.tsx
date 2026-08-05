'use client';

import Image from 'next/image';
import Link from 'next/link'
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

const images = ['/bg-img.jpg', '/bg-secondary.jpg'];

export default function About() {
  const [isNavigating, setIsNavigating] = useState(false);

  return (
    <section id='about-teaser' className="relative overflow-hidden bg-[#0a0f0d] px-6 py-20 text-white md:px-12 md:py-28">
      <div 
        className="pointer-events-none absolute -top-1/4 left-1/2 h-96 w-xl -translate-x-1/2 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #d4f21e 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
          <Carousel className="h-full w-full [&>div]:h-full">
            <CarouselContent className="h-full">
              {images.map((src) => (
                <CarouselItem key={src} className="relative h-full">
                  <Image
                    src={src}
                    alt="Event Preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-4 hidden border-white/10 bg-black/60 text-white backdrop-blur-md hover:bg-black/80 md:flex" />
            <CarouselNext className="right-4 hidden border-white/10 bg-black/60 text-white backdrop-blur-md hover:bg-black/80 md:flex" />
          </Carousel>

        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            About the Event
          </span>
       <h2 className="mt-3 font-primary text-4xl font-extrabold uppercase leading-tight text-white md:text-5xl">
            More Than a <span className="font-display font-normal text-accent lowercase">Championship</span>
          </h2>
          <p className="mt-6 max-w-md text-sm text-slate-300 md:text-base leading-relaxed">
            Smashh Zone brings Lahore&apos;s youth together for two days of
            competitive badminton and a live concert night — built and run by
            JSM (Jojo Sports &amp; Management), a new team on a mission to
            create the region&apos;s biggest sports and culture events.
          </p>
          <Link
            href="/about"
            aria-disabled={isNavigating}
            onClick={(e) => {
              if (isNavigating) {
                e.preventDefault();
                return;
              }
              setIsNavigating(true);
            }}
            className={`mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase text-black transition-all hover:scale-105 hover:bg-[#c2e01a] md:px-8 md:py-4 ${
              isNavigating ? 'pointer-events-none opacity-70' : ''
            }`}
          >
            {isNavigating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading&hellip;
              </>
            ) : (
              <>Learn More →</>
            )}
          </Link>
        </div>
      </div>
    </section>
  );
}
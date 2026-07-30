import Image from 'next/image';
import Navbar from './navbar';


export default function Hero() {
  return (<>
    <Navbar></Navbar>
    <section id="hero" className="relative h-screen w-full">
      <Image
        src="/bg-secondary.jpg"
        alt="Badminton hero background"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/10" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex flex-1 flex-col justify-center px-6 md:px-12">
          <p className="text-xs uppercase tracking-widest text-secondary/70 md:text-sm">
            Sep 5–6, 2026 · Gaddafi Stadium, Lahore
          </p>

          <h1 className="mt-3 font-primary text-5xl font-extrabold uppercase leading-none text-secondary sm:text-6xl md:text-7xl lg:text-8xl">
            Smash Hard.
            <br />
            <span className="text-primary" >Inspire More.</span>
          </h1>

          <p className="mt-6 max-w-md text-sm text-secondary/80 md:text-base">
            Two days of badminton championship action, plus a live Qawwali
            Night with Zain Zohaib. Get your tickets before they&apos;re gone.
          </p>

          <button className="mt-8 w-fit rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-primary md:px-8 md:py-4 hover:scale-105 transition-all duration-300 hover:cursor-pointer">
            Buy Tickets →
          </button>
        </div>

      
        <div className="flex flex-wrap gap-8 px-6 pb-10 md:gap-16 md:px-12 md:pb-16">
          {[
            { number: '2026', label: 'Inaugural Edition' },
            { number: '2', label: 'Days of Live Action' },
            { number: '1', label: 'Concert' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl text-secondary md:text-4xl">
                {stat.number}
              </p>
              <p className="text-xs text-secondary/70 md:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
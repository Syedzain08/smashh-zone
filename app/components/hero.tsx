'use client'

import Link from 'next/link'

export default function Hero() {
  const scrollToTickets = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById('tickets');
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-[#050806]">
      {/* Court-line backdrop */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.12]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g stroke="#d4f21e" strokeWidth="2">
          <rect x="120" y="80" width="960" height="640" className="court-draw" style={{ animationDelay: '0.1s' }} />
          <line x1="120" y1="400" x2="1080" y2="400" className="court-draw" style={{ animationDelay: '0.5s' }} />
          <line x1="600" y1="80" x2="600" y2="720" className="court-draw" style={{ animationDelay: '0.7s' }} />
          <rect x="120" y="220" width="960" height="360" className="court-draw" style={{ animationDelay: '0.9s' }} />
          <line x1="255" y1="80" x2="255" y2="720" className="court-draw" style={{ animationDelay: '1.1s' }} />
          <line x1="945" y1="80" x2="945" y2="720" className="court-draw" style={{ animationDelay: '1.1s' }} />
        </g>
      </svg>

        {/* Badminton Racket - Upper Right */}
        <svg
          className="racket-float pointer-events-none absolute -right-16 top-[6%] h-[52vh] w-auto opacity-[0.18] md:right-[2%]"
          viewBox="0 0 200 500"
          fill="none"
        >
          <path 
            d="M 100,10 C 155,10 168,50 168,105 C 168,160 148,195 100,195 C 52,195 32,160 32,105 C 32,50 45,10 100,10 Z" 
            stroke="#d4f21e" 
            strokeWidth="3.5" 
          />
          
          {Array.from({ length: 15 }).map((_, i) => (
            <line 
              key={`v${i}`} 
              x1={40 + i * 8.5} 
              y1="15" 
              x2={40 + i * 8.5} 
              y2="190" 
              stroke="#d4f21e" 
              strokeWidth="0.75" 
              strokeOpacity="0.45" 
            />
          ))}
          
          {Array.from({ length: 17 }).map((_, i) => (
            <line 
              key={`h${i}`} 
              x1="36" 
              y1={20 + i * 10} 
              x2="164" 
              y2={20 + i * 10} 
              stroke="#d4f21e" 
              strokeWidth="0.75" 
              strokeOpacity="0.45" 
            />
          ))}

          <path d="M 74,188 L 100,225 L 126,188" stroke="#d4f21e" strokeWidth="3" fill="none" />

          <line x1="100" y1="225" x2="100" y2="380" stroke="#d4f21e" strokeWidth="3.5" />

          <path d="M 94,380 L 106,380 L 108,395 L 92,395 Z" fill="#d4f21e" />

          <path 
            d="M 92,395 L 108,395 L 106,485 Q 106,492 100,492 Q 94,492 94,485 Z" 
            stroke="#d4f21e" 
            strokeWidth="3" 
            fill="#050806" 
          />
        </svg>

      <svg
        className="shuttle-float pointer-events-none absolute -left-6 bottom-[14%] h-[26vh] w-auto opacity-[0.22] md:left-[4%]"
        viewBox="0 0 160 220"
        fill="none"
      >
        <ellipse cx="80" cy="188" rx="30" ry="22" stroke="#d4f21e" strokeWidth="5" />
        <path d="M52 178 L20 30 M68 184 L46 14 M92 184 L114 14 M108 178 L140 30" stroke="#d4f21e" strokeWidth="4" strokeLinecap="round" />
        <path d="M20 30 Q80 8 140 30" stroke="#d4f21e" strokeWidth="4" strokeLinecap="round" />
      </svg>

      {/* Rally shuttlecock — travels off-screen both directions */}
        <div className="shuttle-x-container pointer-events-none absolute top-[20%] left-0 z-20">
          <div className="shuttle-y-container origin-center">
            <svg className="h-8 w-8" viewBox="0 0 160 220" fill="none">
              <ellipse cx="80" cy="188" rx="30" ry="22" fill="#d4f21e" fillOpacity="0.95" />
              <path
                d="M52 178 L20 30 M68 184 L46 14 M92 184 L114 14 M108 178 L140 30"
                stroke="#d4f21e"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M20 30 Q80 8 140 30"
                stroke="#d4f21e"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute inset-0 bg-linear-to-t from-[#050806] via-[#050806]/60 to-[#050806]/20" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex flex-1 flex-col justify-center px-6 md:px-12">
          <p className="hero-in text-xs uppercase tracking-widest text-secondary/70 md:text-sm" style={{ animationDelay: '0.2s' }}>
            Sep 5–6, 2026 · Gaddafi Stadium, Lahore
          </p>

          <h1 className="mt-3 font-primary text-5xl font-extrabold uppercase leading-none text-secondary sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="hero-in inline-block" style={{ animationDelay: '0.35s' }}>Smash Hard.</span>
            <br />
            <span className="hero-in inline-block text-accent" style={{ animationDelay: '0.5s' }}>Inspire More.</span>
          </h1>

          <p className="hero-in mt-6 max-w-md text-sm text-secondary/80 md:text-base" style={{ animationDelay: '0.65s' }}>
            Two days of badminton championship action, plus a live Concert
            Night. Get your tickets before they&apos;re gone.
          </p>
            <Link
                  href="/#tickets"
                  onClick={scrollToTickets}
                  className="hero-in mt-8 inline-block w-fit rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:scale-105 hover:cursor-pointer md:px-8 md:py-4"
                  style={{ animationDelay: '0.8s' }}
                >
                  Buy Tickets →
                </Link>
        </div>

        <div className="flex flex-wrap gap-8 px-6 pb-10 md:gap-16 md:px-12 md:pb-16">
          {[
            { number: '2026', label: 'Inaugural Edition' },
            { number: '2', label: 'Days of Live Action' },
            { number: '1', label: 'Concert' },
          ].map((stat, i) => (
            <div key={stat.label} className="hero-in" style={{ animationDelay: `${0.95 + i * 0.1}s` }}>
              <p className="font-display text-3xl text-secondary md:text-4xl">{stat.number}</p>
              <p className="text-xs text-secondary/70 md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
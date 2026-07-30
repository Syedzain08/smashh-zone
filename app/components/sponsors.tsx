import Image from 'next/image';

type Sponsor = {
  name: string;
  logo: string;
  href: string;
  glow: string;
};
const LOGO_DEV_TOKEN = process.env.LOGO_DEV_TOKEN;

const sponsors: Sponsor[] = [
  { name: 'Pepsi', logo: `https://img.logo.dev/pepsi.com?token=${LOGO_DEV_TOKEN}`, href: 'https://pepsi.com', glow: '#1c4ea8' },
  { name: 'Coca-Cola', logo: `https://img.logo.dev/coca-cola.com?token=${LOGO_DEV_TOKEN}`, href: 'https://coca-cola.com', glow: '#e30613' },
  { name: 'Nike', logo:`https://img.logo.dev/nike.com?token=${LOGO_DEV_TOKEN}`, href: 'https://nike.com', glow: '#111111' },
  { name: 'Adidas', logo: `https://img.logo.dev/adidas.com?token=${LOGO_DEV_TOKEN}`, href: 'https://adidas.com', glow: '#111111' },
  { name: 'Red Bull', logo: `https://img.logo.dev/redbull.com?token=${LOGO_DEV_TOKEN}`, href: 'https://redbull.com', glow: '#eab308' },
  { name: 'Puma', logo: `https://img.logo.dev/puma.com?token=${LOGO_DEV_TOKEN}`, href: 'https://puma.com', glow: '#f97316' },
];

const loopSponsors = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

export default function SponsorsMarquee() {
  return (
    <section id='sponsors' className="relative w-full overflow-hidden bg-linear-to-b from-primary via-primary to-[#083f2e] py-20 md:py-28">
      <div
        className="pointer-events-none absolute -top-1/3 left-1/4 h-150 w-150 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #d4f21e, transparent 70%)' }}
      />

      <p className="relative text-center text-xs uppercase tracking-widest text-secondary/60">
        Backed By
      </p>
      <h2 className="relative mt-3 text-center font-primary text-3xl font-extrabold uppercase text-secondary md:text-4xl">
        Our Partners
      </h2>

      <div className="relative mt-14">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-primary to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-[#083f2e] to-transparent md:w-40" />

        <div className="animate-marquee flex w-max items-center gap-6 md:gap-6">
          {loopSponsors.map((sponsor, i) => (
            <a
              key={`${sponsor.name}-${i}`}
              href={sponsor.href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={i < sponsors.length ? 0 : -1}
              aria-hidden={i >= sponsors.length}
              className="group relative flex h-[70vw] w-[70vw] max-h-64 max-w-64 shrink-0 flex-col items-center justify-center gap-4 rounded-3xl bg-secondary p-6 shadow-lg transition-all duration-300 hover:-translate-y-1.5 sm:h-48 sm:w-48 sm:max-h-none sm:max-w-none md:h-28 md:w-48 md:gap-2 md:rounded-2xl md:p-4"
              style={{ '--glow': sponsor.glow } as React.CSSProperties}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-40 md:rounded-2xl"
                style={{ background: 'var(--glow)' }}
              />
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={64}
                height={64}
                className="relative h-16 w-16 object-contain sm:h-14 sm:w-14 md:h-10 md:w-10"
              />
              <span className="relative text-sm uppercase tracking-wide text-primary/50 sm:text-xs md:text-[10px]">
                {sponsor.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
import Image from 'next/image';

type Artist = {
  name: string;
  role: string;
  image: string;
};

const artists: Artist[] = [
  { name: 'Hasan Raheem', role: 'Headliner', image: '/hassan.jpg' },
  { name: 'Young Stunners', role: 'Headliner', image: '/stunners.jpg' },
];

export default function ArtistShowcase() {
  return (
    <section id='artist-showcase' className="relative overflow-hidden bg-[#0a0f0d] px-6 py-20 md:px-12 md:py-28">
      <div
        className="pointer-events-none absolute -top-1/4 left-0 h-125 w-125 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, #f97316, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-1/4 right-0 h-125 w-125 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, #dc2626, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #d4f21e, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-secondary/50">
            Live On Stage
          </p>
          <h2 className="mt-3 font-primary text-4xl font-extrabold uppercase leading-tight text-secondary md:text-5xl">
            Concert Night
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-secondary/60 md:text-base">
            After two days of championship badminton, the courts fall quiet
            and the stage lights up — two headliners, one night, built to
            close out Smashh Zone 2026 in style.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {artists.map((artist) => (
            <div
              key={artist.name}
              className="group relative aspect-4/5 w-full overflow-hidden rounded-3xl sm:aspect-3/4"
           
            >
             
              <div
                className="pointer-events-none absolute -inset-1 rounded-3xl opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-70"

              />

              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-secondary shadow-lg"
                    style={{ background: 'var(--glow)' }}
                  >
                    {artist.role}
                  </span>
                  <h3 className="mt-3 font-primary text-2xl font-extrabold uppercase text-secondary drop-shadow-lg md:text-3xl">
                    {artist.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/artists"
            className="inline-block w-fit rounded-full bg-secondary px-8 py-4 text-sm font-semibold text-[#0a0f0d] transition-all hover:scale-105"
          >
            Meet The Full Lineup →
          </a>
        </div>
      </div>
    </section>
  );
}
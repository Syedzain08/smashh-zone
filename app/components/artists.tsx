import { Sparkles } from 'lucide-react';

type Artist = {
  role: string;
};

const artists: Artist[] = [
  { role: 'Headliner' },
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
            and the stage lights up — one night, built to close out Smashh
            Zone 2026 in style.
          </p>
        </div>

        <div className="mt-14 mx-auto max-w-md">
          {artists.map((artist) => (
            <div
              key={artist.role}
              className="group relative aspect-4/5 w-full overflow-hidden rounded-3xl border border-white/10 bg-black sm:aspect-3/4"
            >
              <div
                className="pointer-events-none absolute -inset-1 rounded-3xl opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-70"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl bg-linear-to-b from-black via-[#0a0a0a] to-black">
                <div className="pointer-events-none absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at center, #d4f21e, transparent 60%)' }} />

                <span
                  className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-secondary shadow-lg"
                  style={{ background: 'var(--glow)' }}
                >
                  {artist.role}
                </span>

                <Sparkles className="h-8 w-8 text-accent/70" />

                <span className="font-primary text-3xl font-extrabold uppercase tracking-widest text-white/80 md:text-4xl">
                  Coming Soon
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
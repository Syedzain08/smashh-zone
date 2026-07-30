export default function UrgencyBanner() {
  return (
    <div className="relative z-10 -my-4 -rotate-1 scale-105 overflow-hidden border-y border-[#d4f21e]/30 bg-accent py-3 shadow-[0_0_25px_rgba(212,242,30,0.2)]">
      <div className="flex w-max animate-marquee space-x-8 font-primary text-xs font-black uppercase tracking-widest text-black">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-center gap-8 shrink-0">
            <span>⚡ LIMITED SEATING — 3,500 PASSES ONLY</span>
            <span>•</span>
            <span>GADDAFI STADIUM LAHORE</span>
            <span>•</span>
            <span>2 DAYS OF CHAMPIONSHIP & CONCERT</span>
            <span>•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
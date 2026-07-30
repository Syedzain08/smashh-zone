export default function PolicySection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-[auto_1fr] md:gap-8">
      <div className="flex items-start gap-3 md:flex-col md:items-start md:gap-2">
        <span className="font-display text-2xl text-accent/60 md:text-3xl">
          {number}
        </span>
        <h2 className="font-primary text-lg font-bold uppercase tracking-wide text-white md:hidden">
          {title}
        </h2>
      </div>
      <div>
        <h2 className="hidden font-primary text-xl font-bold uppercase tracking-wide text-white md:block md:text-2xl">
          {title}
        </h2>
        <div className="policy-prose mt-4 flex flex-col gap-4 text-sm leading-relaxed text-slate-300 md:text-base [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-1 [&_li]:relative [&_li]:pl-5 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.6em] [&_li]:before:h-1 [&_li]:before:w-1 [&_li]:before:rounded-full [&_li]:before:bg-accent">
          {children}
        </div>
      </div>
    </div>
  );
}
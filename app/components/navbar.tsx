export default function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 w-full bg-transparent">
    <nav className="flex items-center justify-between px-6 py-6 md:px-12">
      <span className="font-display text-2xl text-secondary md:text-3xl">
        Smashh Zone
      </span>

      <div className="hidden items-center gap-8 text-secondary md:flex">
        <a href="#" className="hover:text-primary transition-colors">Home</a>
        <a href="#" className="hover:text-primary transition-colors">About</a>
        <a href="#" className="hover:text-primary transition-colors">Event</a>
        <a href="#" className="hover:text-primary transition-colors">Artists</a>
      </div>

      <button className="rounded-full bg-secondary px-5 py-2 text-sm font-semibold text-primary shadow-lg shadow-black/20 transition-all hover:scale-105 hover:shadow-xl md:px-6 md:py-3 hover:cursor-pointer">
        Get Tickets!
      </button>
    </nav>
    </header>
  );
}
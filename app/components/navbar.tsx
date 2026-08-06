"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Event", href: "/event-details" },
  { label: "Artists", href: "/#artist-showcase" },
  { label: "Tickets", href: "/#tickets" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleHashLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setOpen(false);

    if (href.includes("#")) {
      const [targetPath, hash] = href.split("#");
      const isSamePage = pathname === (targetPath || "/");

      if (isSamePage) {
        e.preventDefault();
        const element = document.getElementById(hash);

        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          window.history.pushState(null, "", `#${hash}`);
        }
      }
    }
  };

  return (
    <header className="sticky inset-x-0 top-0 z-50 w-full border-b border-white/10 bg-[#090d0b]/95 backdrop-blur-md">
      <nav className="flex items-center justify-between px-6 py-5 md:px-12 md:py-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-display text-2xl text-secondary transition-colors hover:text-accent md:text-3xl">
            Smashh <span className="text-accent">zone</span>
          </span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleHashLinkClick(e, link.href)}
              className="group relative text-sm font-bold uppercase tracking-widest text-secondary/80 transition-colors hover:text-secondary"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-1/2 h-px w-0 -translate-x-1/2 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <Link
          href="/#tickets"
          onClick={(e) => handleHashLinkClick(e, "/#tickets")}
          className="hidden items-center gap-1.5 rounded-full bg-accent px-6 py-3 text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_20px_rgba(212,242,30,0.25)] transition-all duration-300 hover:scale-105 hover:bg-[#c2e01a] md:inline-flex"
        >
          Get Tickets
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>

        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md md:hidden"
        >
          <span
            className={`h-0.5 w-5 bg-white transition-all duration-300 ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-white transition-all duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-white transition-all duration-300 ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

        {open && (
      <div className="menu-drop fixed inset-0 z-40 flex h-screen w-screen flex-col overflow-y-auto bg-[#090d0b] px-6 py-6 md:hidden">
        <div
          className="pointer-events-none absolute -top-32 left-1/2 h-120 w-xl -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #d4f21e 0%, transparent 70%)",
          }}
        />

        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >
            <span className="font-display text-2xl text-secondary">
              Smashh <span className="text-accent">zone</span>
            </span>
          </Link>
        </div>

        <div className="relative mt-12 flex flex-1 flex-col justify-center gap-1">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleHashLinkClick(e, link.href)}
              className="menu-link-in border-b border-white/10 py-4 font-primary text-3xl font-extrabold uppercase text-secondary transition-colors hover:text-accent"
              style={{ animationDelay: `${0.15 + i * 0.06}s` }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="menu-link-in relative pb-6 pt-8" style={{ animationDelay: `${0.15 + NAV_LINKS.length * 0.06}s` }}>
          <Link
            href="/#tickets"
            onClick={(e) => handleHashLinkClick(e, "/#tickets")}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-sm font-bold uppercase tracking-widest text-black shadow-[0_0_20px_rgba(212,242,30,0.3)]"
          >
            Get Tickets
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    )}
    </header>
  );
}
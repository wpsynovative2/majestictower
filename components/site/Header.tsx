"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks, project, contact } from "@/lib/content";
import { EnquireButton } from "@/components/lead/CtaTriggers";
import { PhoneIcon, CloseIcon } from "@/components/ui/Icons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-90 transition-all duration-500 ${
          scrolled
            ? "border-b border-forest-900/8 bg-cream-50/92 py-2 shadow-[0_10px_40px_-24px_rgba(8,23,15,0.5)] backdrop-blur-lg"
            : "border-b border-transparent bg-linear-to-b from-forest-950/55 to-transparent py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/#top"
            className="flex shrink-0 items-center gap-2.5 transition-transform duration-300 hover:scale-[1.02]"
            aria-label={`${project.name} home`}
          >
            <span
              className={`grid place-items-center rounded-xl transition-all duration-500 ${
                scrolled ? "h-10 w-14 bg-forest-900/5" : "h-11 w-16 bg-cream-50/92"
              }`}
            >
              <Image
                src="/images/Logo.png"
                alt={`${project.name} logo`}
                width={112}
                height={58}
                priority
                className="h-auto w-11 object-contain"
              />
            </span>
            <span className="hidden sm:block">
              <span
                className={`block font-display text-base leading-none font-semibold tracking-wide transition-colors duration-500 ${
                  scrolled ? "text-forest-900" : "text-cream-50"
                }`}
              >
                {project.name}
              </span>
              <span
                className={`mt-0.5 block text-[9px] tracking-[0.22em] uppercase transition-colors duration-500 ${
                  scrolled ? "text-gold-600" : "text-gold-300"
                }`}
              >
                by {project.developer}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${
                    scrolled
                      ? isActive
                        ? "text-clay-600"
                        : "text-forest-900/70 hover:text-forest-900"
                      : isActive
                        ? "text-gold-300"
                        : "text-cream-100/80 hover:text-cream-50"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100 ${
                      isActive ? "scale-x-100" : ""
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={contact.phoneTel}
              className={`hidden items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-all duration-300 md:inline-flex ${
                scrolled
                  ? "text-forest-900 hover:bg-forest-900/6"
                  : "text-cream-50 hover:bg-cream-50/12"
              }`}
            >
              <PhoneIcon className="h-4 w-4" />
              {contact.phoneDisplay}
            </a>

            <EnquireButton
              size="sm"
              variant="primary"
              shimmer
              withArrow={false}
              className="hidden sm:inline-flex"
            />

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className={`grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 lg:hidden ${
                scrolled
                  ? "bg-forest-900/6 text-forest-900"
                  : "bg-cream-50/12 text-cream-50"
              }`}
            >
              <span className="sr-only">Menu</span>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — a sibling of <header>, not a child. The header sets
          backdrop-blur once scrolled, and a backdrop-filter makes an element
          the containing block for fixed descendants, which would collapse this
          panel into the header's own strip. overflow-hidden keeps the closed
          panel, translated off to the right, from widening the document. */}
      <div
        className={`fixed inset-0 z-95 overflow-hidden lg:hidden ${
          menuOpen ? "" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-forest-950/70 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-y-0 right-0 flex w-[min(20rem,85vw)] flex-col bg-forest-900 px-6 py-6 text-cream-100 transition-transform duration-400 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-lg">{project.name}</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="grid h-9 w-9 place-items-center rounded-full bg-cream-50/10 transition-colors hover:bg-clay-500"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>

          <nav className="mt-8 flex flex-col gap-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{ transitionDelay: menuOpen ? `${index * 40 + 80}ms` : "0ms" }}
                className={`border-b border-cream-100/8 py-3.5 font-display text-xl transition-all duration-300 hover:text-gold-300 ${
                  menuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-3 pt-8">
            <EnquireButton size="lg" variant="primary" className="w-full" shimmer />
            <a
              href={contact.phoneTel}
              className="flex items-center justify-center gap-2 rounded-full border border-cream-100/25 py-3 text-sm font-semibold transition-colors hover:border-gold-400 hover:text-gold-300"
            >
              <PhoneIcon className="h-4 w-4" />
              {contact.phoneDisplay}
            </a>
            <p className="pt-2 text-center text-[10px] tracking-wider text-cream-200/45 uppercase">
              {project.reraAuthority} {project.rera}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

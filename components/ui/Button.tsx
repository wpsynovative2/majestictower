"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "gold" | "outline" | "ghost" | "ghostOnDark" | "onDark";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  // The primary conversion button — terracotta, lifts and deepens on hover.
  primary:
    "bg-clay-500 text-cream-50 shadow-[0_10px_30px_-12px_rgba(190,90,46,0.85)] hover:bg-clay-600 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-14px_rgba(190,90,46,0.95)] active:translate-y-0",
  gold: "bg-gold-400 text-forest-950 shadow-[0_10px_30px_-14px_rgba(199,151,60,0.9)] hover:bg-gold-300 hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "border border-forest-800/25 bg-transparent text-forest-900 hover:border-forest-800/60 hover:bg-forest-900 hover:text-cream-50 hover:-translate-y-0.5",
  onDark:
    "border border-cream-100/30 bg-transparent text-cream-100 hover:border-gold-400 hover:bg-gold-400 hover:text-forest-950 hover:-translate-y-0.5",
  ghost: "text-forest-900 hover:text-clay-500",
  ghostOnDark: "text-cream-200/70 hover:text-gold-300",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm md:text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Adds the sweeping highlight used on the headline CTAs. */
  shimmer?: boolean;
};

function inner(children: ReactNode, shimmer: boolean) {
  return (
    <>
      {shimmer ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-full w-1/2 bg-linear-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:animate-shimmer"
        />
      ) : null}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );
}

export function CtaButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  shimmer = false,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {inner(children, shimmer)}
    </button>
  );
}

export function CtaLink({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  shimmer = false,
  external = false,
  download = false,
}: CommonProps & { href: string; external?: boolean; download?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: "" } : {})}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {inner(children, shimmer)}
    </a>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${className}`}
    >
      <path
        d="M3.5 10h13m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

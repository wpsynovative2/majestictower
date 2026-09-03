"use client";

import Image from "next/image";
import { heroFacts, project, contact, tickerItems } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import { EnquireButton, SiteVisitButton, BrochureButton } from "@/components/lead/CtaTriggers";
import { PhoneIcon, SparkIcon } from "@/components/ui/Icons";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-forest-950 pt-28 pb-0 lg:pt-32">
      {/* Ambient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_15%_0%,rgba(36,87,65,0.55),transparent_60%),radial-gradient(90%_70%_at_95%_25%,rgba(199,151,60,0.16),transparent_65%)]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:pb-24">
        {/* ---------------------------------------------------------- copy */}
        <div className="max-w-xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/8 px-4 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-gold-300 uppercase">
              <SparkIcon className="h-3.5 w-3.5" />
              {project.reraAuthority} {project.rera}
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-6 font-display text-[2.6rem] leading-[1.02] font-light text-cream-50 text-balance-tight sm:text-6xl lg:text-[4.2rem]">
              The
              <span className="mx-3 inline-block bg-linear-to-r from-gold-300 via-gold-400 to-gold-600 bg-clip-text font-normal text-transparent italic">
                Majestic
              </span>
              <br className="hidden sm:block" />
              Experience
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-5 max-w-md text-base leading-relaxed text-cream-200/75">
              Premium {project.configurationShort} residences in {project.localityShort},
              Mumbai — built around a podium of gardens, water and open sky, by{" "}
              {project.developer}.
            </p>
          </Reveal>

          <Reveal delay={230}>
            <div className="mt-7 flex items-baseline gap-3">
              <span className="font-display text-4xl text-gold-300">{project.priceFrom}</span>
              <span className="text-sm tracking-wide text-cream-200/55 uppercase">Onwards*</span>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <EnquireButton size="lg" variant="primary" shimmer />
              <SiteVisitButton size="lg" variant="onDark" />
            </div>
          </Reveal>

          <Reveal delay={370}>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <BrochureButton
                variant="ghostOnDark"
                size="sm"
                label="Download Brochure"
                className="px-0"
              />
              <a
                href={contact.phoneTel}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-cream-200/70 transition-colors hover:text-gold-300"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full border border-cream-100/20 transition-colors group-hover:border-gold-400 group-hover:bg-gold-400/10">
                  <PhoneIcon className="h-3.5 w-3.5" />
                </span>
                {contact.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>

        {/* --------------------------------------------------------- image */}
        <Reveal delay={200} className="relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] w-full overflow-hidden arch-top border border-cream-100/12 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]">
              <Image
                src="/images/front.jpg"
                alt={`${project.name} elevation, ${project.localityShort}`}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="scale-105 object-cover object-[62%_center] transition-transform duration-[1.4s] ease-out hover:scale-110"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-forest-950/70 via-transparent to-transparent"
              />
            </div>

            {/* Floating configuration chip */}
            <div className="absolute -bottom-5 -left-2 animate-float-slow rounded-2xl border border-gold-400/25 bg-forest-900/90 px-5 py-3.5 backdrop-blur-md sm:-left-6">
              <p className="text-[9px] tracking-[0.2em] text-cream-200/50 uppercase">
                Configuration
              </p>
              <p className="mt-1 font-display text-xl text-cream-50">
                2 &amp; 3 <span className="text-gold-300">BHK</span>
              </p>
            </div>

            {/* RERA seal */}
            <div className="absolute -top-3 -right-1 hidden rotate-6 rounded-full border border-gold-400/35 bg-forest-950/85 px-4 py-4 text-center backdrop-blur-md sm:block">
              <p className="text-[8px] tracking-[0.18em] text-gold-300 uppercase">Registered</p>
              <p className="mt-0.5 font-display text-[11px] text-cream-50">MahaRERA</p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* --------------------------------------------------------- fact bar */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal delay={120}>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-4xl border border-cream-100/10 bg-cream-100/10 lg:grid-cols-4">
            {heroFacts.map((fact) => (
              <div
                key={fact.label}
                className="group bg-forest-950/90 px-5 py-6 transition-colors duration-300 hover:bg-forest-800 sm:px-7"
              >
                <dt className="text-[9px] font-semibold tracking-[0.2em] text-gold-400/80 uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-2 font-display text-lg leading-snug text-cream-50 transition-transform duration-300 group-hover:translate-x-0.5">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* ---------------------------------------------------------- ticker */}
      <div className="relative mt-10 overflow-hidden border-y border-cream-100/8 bg-forest-900/60 py-3.5">
        <div className="flex w-max animate-marquee items-center gap-10">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex shrink-0 items-center gap-10 text-[11px] font-semibold tracking-[0.18em] text-cream-200/45 uppercase"
            >
              {item}
              <span aria-hidden className="text-gold-500/60">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

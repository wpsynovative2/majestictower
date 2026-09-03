"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { contact, project, thankYou, navLinks } from "@/lib/content";
import { readLastLead, type LastLead } from "@/lib/leads";
import Reveal from "@/components/ui/Reveal";
import { CtaLink } from "@/components/ui/Button";
import {
  CheckIcon,
  PhoneIcon,
  WhatsAppIcon,
  DownloadIcon,
  SparkIcon,
} from "@/components/ui/Icons";

const subscribeNever = () => () => {};
const nullSnapshot = () => null;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export default function ThankYou() {
  // The lead is read once, on the client. useSyncExternalStore keeps the
  // server render (null) and the hydration render consistent.
  const cache = useRef<{ lead: LastLead | null } | null>(null);
  const lead = useSyncExternalStore(
    subscribeNever,
    () => {
      cache.current ??= { lead: readLastLead() };
      return cache.current.lead;
    },
    nullSnapshot,
  );

  const pushed = useRef(false);

  useEffect(() => {
    // Fire the conversion once, for GTM to hang a trigger on. The source comes
    // straight off the URL rather than through state — nothing renders it.
    if (pushed.current) return;
    pushed.current = true;
    const source =
      new URLSearchParams(window.location.search).get("source") ?? "direct";
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "generate_lead",
      lead_source: source,
      project: project.name,
    });
  }, []);

  const firstName = lead?.name?.trim().split(/\s+/)[0] ?? "";

  return (
    <main className="flex-1">
      <section className="relative isolate overflow-hidden bg-forest-950 pt-28 pb-20 lg:pt-36 lg:pb-28">
        <Image
          src="/images/podium.jpg"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(110%_80%_at_50%_0%,rgba(36,87,65,0.65),transparent_62%),linear-gradient(to_bottom,rgba(8,23,15,0.75),rgba(8,23,15,0.96))]"
        />

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-gold-400/35 bg-gold-400/12">
              <span className="grid h-14 w-14 animate-pop-in place-items-center rounded-full bg-gold-400 text-forest-950">
                <CheckIcon className="h-7 w-7" />
              </span>
            </span>
          </Reveal>

          <Reveal delay={80}>
            <span className="mt-7 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/8 px-4 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-gold-300 uppercase">
              <SparkIcon className="h-3.5 w-3.5" />
              {thankYou.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={140}>
            <h1 className="mt-5 font-display text-[2.5rem] leading-[1.05] font-light text-cream-50 text-balance-tight sm:text-5xl lg:text-6xl">
              {thankYou.title}
              {firstName ? (
                <>
                  ,{" "}
                  <span className="bg-linear-to-r from-gold-300 via-gold-400 to-gold-600 bg-clip-text font-normal text-transparent italic">
                    {firstName}
                  </span>
                </>
              ) : (
                <span className="text-gold-300">.</span>
              )}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream-200/75">
              {thankYou.body}
            </p>
          </Reveal>

          {lead?.phone ? (
            <Reveal delay={250}>
              <p className="mt-5 text-sm text-cream-200/60">
                We&rsquo;ll call you on{" "}
                <span className="font-semibold text-gold-300">
                  +91 {lead.phone}
                </span>
                {lead.configuration ? (
                  <> about a {lead.configuration} residence.</>
                ) : (
                  "."
                )}
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={310}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              {lead?.downloadUrl ? (
                <CtaLink
                  href={lead.downloadUrl}
                  download
                  variant="primary"
                  size="lg"
                  shimmer
                >
                  <DownloadIcon className="h-4 w-4" />
                  Download Brochure
                </CtaLink>
              ) : null}
              <CtaLink href={contact.whatsapp} external variant="gold" size="lg">
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </CtaLink>
              <CtaLink href={contact.phoneTel} variant="onDark" size="lg">
                <PhoneIcon className="h-4 w-4" />
                {contact.phoneDisplay}
              </CtaLink>
            </div>
          </Reveal>

          <Reveal delay={370}>
            <p className="mt-6 text-xs text-cream-200/45">{thankYou.urgent}</p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ what happens */}
      <section className="bg-cream-50 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center font-display text-2xl text-forest-900 sm:text-3xl">
              What happens <span className="text-gold-600 italic">next</span>
            </h2>
          </Reveal>

          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            {thankYou.steps.map((item, index) => (
              <Reveal key={item.step} delay={index * 110} as="li">
                <div className="group">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-gold-500/35 bg-cream-100 font-display text-sm text-gold-600 transition-all duration-400 group-hover:scale-110 group-hover:bg-gold-400 group-hover:text-forest-950">
                    {item.step}
                  </span>
                  <h3 className="mt-4 font-display text-lg text-forest-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-forest-900/65">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>

          {/* ----------------------------------------------- keep exploring */}
          <Reveal delay={140}>
            <div className="mt-14 rounded-4xl border border-forest-900/8 bg-cream-100 px-6 py-8 text-center sm:px-10">
              <p className="font-display text-xl text-forest-900">
                While you wait, keep exploring
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="rounded-full border border-forest-900/12 bg-cream-50 px-4 py-2 text-xs font-semibold text-forest-900/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/50 hover:text-forest-900"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-7">
                <CtaLink href="/" variant="outline" size="md">
                  Back to {project.name}
                </CtaLink>
              </div>
              <p className="mt-6 text-[10px] tracking-[0.18em] text-forest-900/35 uppercase">
                {project.reraAuthority} {project.rera}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

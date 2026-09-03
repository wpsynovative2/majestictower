"use client";

import { useState } from "react";
import Image from "next/image";
import { landmarkGroups, mapDirectionsUrl, project } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { LandmarkGlyph, PinIcon } from "@/components/ui/Icons";
import { CtaLink } from "@/components/ui/Button";
import { EnquireButton } from "@/components/lead/CtaTriggers";

export default function Connectivity() {
  const [activeId, setActiveId] = useState(landmarkGroups[0].id);
  const active = landmarkGroups.find((group) => group.id === activeId) ?? landmarkGroups[0];

  return (
    <section id="connectivity" className="relative scroll-mt-24 bg-cream-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Connectivity"
          lead="Prime"
          accent="Connectivity"
          body={`Schools, hospitals, temples and everyday shopping sit within easy reach of ${project.name} in ${project.localityShort}.`}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* --------------------------------------------------- landmarks */}
          <div>
            <Reveal>
              <div
                role="tablist"
                aria-label="Landmark categories"
                className="flex flex-wrap gap-2"
              >
                {landmarkGroups.map((group) => {
                  const isActive = group.id === activeId;
                  return (
                    <button
                      key={group.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveId(group.id)}
                      className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all duration-300 ${
                        isActive
                          ? "border-forest-900 bg-forest-900 text-cream-50 shadow-[0_12px_26px_-14px_rgba(8,23,15,0.7)]"
                          : "border-forest-900/12 bg-white/60 text-forest-900/70 hover:-translate-y-0.5 hover:border-gold-500/50 hover:text-forest-900"
                      }`}
                    >
                      <LandmarkGlyph
                        name={group.icon}
                        className={`h-4 w-4 transition-colors ${
                          isActive ? "text-gold-300" : "text-gold-600"
                        }`}
                      />
                      {group.short}
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                          isActive ? "bg-cream-50/15 text-gold-300" : "bg-forest-900/6"
                        }`}
                      >
                        {group.items.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-6 rounded-4xl border border-forest-900/8 bg-white/70 p-6 sm:p-8">
                <p className="text-[10px] font-semibold tracking-[0.2em] text-gold-600 uppercase">
                  {active.label}
                </p>
                <ul key={active.id} className="mt-5 grid gap-x-6 gap-y-1 sm:grid-cols-2">
                  {active.items.map((item, index) => (
                    <li
                      key={item}
                      style={{ animationDelay: `${index * 45}ms` }}
                      className="group flex animate-pop-in items-center gap-3 border-b border-forest-900/6 py-3 last:border-0"
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-400/15 text-[10px] font-bold text-gold-600 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-forest-950">
                        {index + 1}
                      </span>
                      <span className="text-sm text-forest-900/80 transition-colors duration-300 group-hover:text-forest-900">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* --------------------------------------------------------- map */}
          <Reveal delay={160}>
            <div className="overflow-hidden rounded-4xl border border-forest-900/8 bg-forest-900">
              <div className="relative aspect-4/3 w-full">
                <Image
                  src="/images/MAp.jpeg"
                  alt={`Location map for ${project.name}, ${project.localityShort}`}
                  fill
                  sizes="(max-width: 1024px) 92vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-4 p-6 text-cream-100 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
                  <div>
                    <p className="text-sm font-semibold">Opp. DMart, {project.localityShort}</p>
                    <p className="mt-0.5 text-xs text-cream-200/60">
                      Majestic Tower Sales Lounge
                    </p>
                  </div>
                </div>
                <CtaLink
                  href={mapDirectionsUrl}
                  external
                  variant="gold"
                  size="sm"
                  className="shrink-0"
                >
                  Get Directions
                </CtaLink>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-4xl border border-gold-500/25 bg-gold-400/8 px-6 py-6 text-center sm:flex-row sm:text-left">
            <p className="text-sm leading-relaxed text-forest-900/75">
              <span className="font-display text-lg text-forest-900">
                Want the full neighbourhood report?
              </span>
              <br />
              We will share travel times, upcoming infrastructure and rental trends.
            </p>
            <EnquireButton
              label="Request Locality Details"
              variant="primary"
              size="md"
              className="shrink-0"
              request={{
                title: "Locality & Connectivity",
                subtitle: `Get travel times, infrastructure updates and rental trends around ${project.localityShort}.`,
              }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

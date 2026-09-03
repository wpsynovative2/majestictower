"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { unitPlans, layoutPlans, project } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { CtaButton, ArrowRight } from "@/components/ui/Button";
import { useOpenEnquiry, BrochureButton } from "@/components/lead/CtaTriggers";
import Lightbox from "./Lightbox";

type Filter = "All" | "2BHK" | "3BHK";
const filters: Filter[] = ["All", "2BHK", "3BHK"];

export default function Residences() {
  const [filter, setFilter] = useState<Filter>("All");
  const [zoomed, setZoomed] = useState<{ src: string; alt: string } | null>(null);
  const openEnquiry = useOpenEnquiry();

  const visible = useMemo(
    () => (filter === "All" ? unitPlans : unitPlans.filter((p) => p.config === filter)),
    [filter],
  );

  function requestPlan(name: string, config: string) {
    openEnquiry({
      source: "Floor Plan Request",
      title: "Get This Floor Plan",
      subtitle: `Send me the detailed plan and pricing for the ${config} — ${name} at ${project.name}.`,
      configuration: config === "2BHK" ? "2 BHK" : "3 BHK",
      submitLabel: "Send Me the Plan",
    });
  }

  return (
    <section
      id="residences"
      className="relative scroll-mt-24 overflow-hidden bg-forest-900 py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_80%_0%,rgba(199,151,60,0.12),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Floor Plans"
            lead="Flat"
            accent="Overview"
            body="Explore our premium 2BHK, 3BHK residences — each crafted for comfort, elegance, and modern living."
            tone="dark"
          />

          <Reveal delay={140}>
            <div
              role="tablist"
              aria-label="Filter residences by configuration"
              className="inline-flex rounded-full border border-cream-100/15 bg-forest-950/50 p-1"
            >
              {filters.map((option) => {
                const active = filter === option;
                return (
                  <button
                    key={option}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(option)}
                    className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 ${
                      active
                        ? "bg-gold-400 text-forest-950 shadow-[0_8px_20px_-10px_rgba(221,178,95,0.9)]"
                        : "text-cream-200/60 hover:text-cream-50"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* ------------------------------------------------------ 3D plans */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 70}>
              <article className="group flex h-full flex-col overflow-hidden rounded-4xl border border-cream-100/10 bg-forest-950/45 transition-all duration-400 hover:-translate-y-1.5 hover:border-gold-400/40 hover:shadow-[0_36px_70px_-32px_rgba(0,0,0,0.9)]">
                <button
                  type="button"
                  onClick={() => setZoomed({ src: plan.image, alt: `${plan.config} ${plan.name} floor plan` })}
                  className="relative aspect-4/3 w-full overflow-hidden bg-cream-100"
                  aria-label={`Enlarge ${plan.config} ${plan.name} floor plan`}
                >
                  <Image
                    src={plan.image}
                    alt={`${plan.config} ${plan.name} floor plan`}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-forest-900/90 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-gold-300 uppercase backdrop-blur">
                    {plan.config}
                  </span>
                  <span className="absolute right-3 bottom-3 rounded-full bg-forest-950/85 px-3 py-1.5 text-[10px] font-semibold text-cream-100 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                    Click to enlarge
                  </span>
                </button>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[10px] tracking-[0.18em] text-gold-400/70 uppercase">
                    3D Floor Plan
                  </p>
                  <h3 className="mt-1.5 font-display text-xl leading-snug text-cream-50">
                    {plan.name}
                  </h3>
                  <CtaButton
                    onClick={() => requestPlan(plan.name, plan.config)}
                    variant="onDark"
                    size="sm"
                    className="mt-4 w-full"
                  >
                    Request Details
                    <ArrowRight />
                  </CtaButton>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* --------------------------------------------------- 2D drawings */}
        <div className="mt-16">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cream-100/10 pb-5">
              <h3 className="font-display text-2xl text-cream-50">
                Detailed <span className="text-gold-300 italic">Floor Plans</span>
              </h3>
              <p className="text-xs tracking-[0.18em] text-cream-200/45 uppercase">
                Measured drawings
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {layoutPlans.map((plan, index) => (
              <Reveal key={plan.id} delay={index * 80}>
                <button
                  type="button"
                  onClick={() => setZoomed({ src: plan.image, alt: `${plan.name} drawing` })}
                  className="group block w-full overflow-hidden rounded-4xl border border-cream-100/10 bg-cream-100 text-left transition-all duration-400 hover:-translate-y-1.5 hover:border-gold-400/50 hover:shadow-[0_36px_70px_-32px_rgba(0,0,0,0.9)]"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <Image
                      src={plan.image}
                      alt={`${plan.name} drawing`}
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3 bg-forest-950/45 px-5 py-4">
                    <div>
                      <p className="font-display text-base text-cream-50">{plan.name}</p>
                      <p className="mt-0.5 text-[10px] tracking-[0.16em] text-gold-400/75 uppercase">
                        {plan.config}
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cream-100/20 text-cream-100 transition-all duration-300 group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-forest-950"
                    >
                      +
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------------- CTA */}
        <Reveal delay={120}>
          <div className="mt-14 flex flex-col items-center gap-5 rounded-4xl border border-gold-400/20 bg-linear-to-r from-forest-950/80 to-forest-800/60 px-6 py-9 text-center sm:px-10">
            <p className="font-display text-2xl text-cream-50 sm:text-3xl">
              Not sure which layout suits you?
            </p>
            <p className="max-w-lg text-sm text-cream-200/65">
              Our team will walk you through carpet areas, floor levels, views and
              pricing for every available unit.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <CtaButton
                onClick={() =>
                  openEnquiry({
                    source: "Floor Plan Request",
                    title: "Compare the Layouts",
                    subtitle:
                      "Tell us your family size and budget — we will recommend the right residence and share its full plan.",
                    submitLabel: "Help Me Choose",
                  })
                }
                variant="primary"
                size="lg"
                shimmer
              >
                Talk to a Specialist
                <ArrowRight />
              </CtaButton>
              <BrochureButton variant="onDark" size="lg" />
            </div>
          </div>
        </Reveal>
      </div>

      <Lightbox item={zoomed} onClose={() => setZoomed(null)} />
    </section>
  );
}

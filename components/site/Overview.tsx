import Image from "next/image";
import { overview, specifications, project } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { SpecGlyph } from "@/components/ui/Icons";
import { EnquireButton } from "@/components/lead/CtaTriggers";

export default function Overview() {
  return (
    <section id="overview" className="relative scroll-mt-24 bg-cream-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* ------------------------------------------------------- images */}
          <Reveal className="relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="relative aspect-[3/4] overflow-hidden arch-top border border-forest-900/8 shadow-[0_40px_90px_-40px_rgba(8,23,15,0.45)]">
                <Image
                  src="/images/Gate.jpg"
                  alt={`Grand entrance at ${project.name}`}
                  fill
                  sizes="(max-width: 1024px) 85vw, 38vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out hover:scale-105"
                />
              </div>

              {/* Overlapping secondary frame */}
              <div className="absolute -right-4 -bottom-8 hidden h-40 w-32 overflow-hidden rounded-4xl border-4 border-cream-50 shadow-[0_24px_50px_-20px_rgba(8,23,15,0.5)] sm:block lg:-right-8 lg:h-48 lg:w-40">
                <Image
                  src="/images/podium.jpg"
                  alt="Podium deck at Majestic Tower"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>

              {/* Two decades badge */}
              <div className="absolute -top-5 -left-3 grid h-22 w-22 place-items-center rounded-full bg-forest-900 text-center text-cream-50 shadow-[0_20px_40px_-16px_rgba(8,23,15,0.6)] lg:-left-8">
                <div>
                  <p className="font-display text-2xl leading-none text-gold-300">20+</p>
                  <p className="mt-1 text-[8px] tracking-[0.16em] text-cream-200/60 uppercase">
                    Years
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* --------------------------------------------------------- copy */}
          <div>
            <SectionHeading
              eyebrow={overview.eyebrow}
              lead={overview.titleLead}
              accent={overview.titleAccent}
              trail={overview.titleTrail}
              body={overview.body}
            />

            <Reveal delay={200}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <EnquireButton
                  label="Know More"
                  size="md"
                  variant="outline"
                  request={{
                    title: "Know More",
                    subtitle: `Ask us anything about ${project.name} — pricing, floor availability, possession timelines or payment plans.`,
                  }}
                />
                <a
                  href="#residences"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-forest-900/70 transition-colors hover:text-clay-500"
                >
                  See the layouts
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ------------------------------------------------ specifications */}
        <div className="mt-20 lg:mt-28">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-forest-900/10 pb-5">
              <h3 className="font-display text-2xl text-forest-900">
                Built to a <span className="text-gold-600 italic">higher standard</span>
              </h3>
              <p className="text-xs tracking-[0.18em] text-forest-900/45 uppercase">
                Structure &amp; Specifications
              </p>
            </div>
          </Reveal>

          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {specifications.map((spec, index) => (
              <Reveal key={spec.title} delay={index * 55} as="li">
                <div className="group flex h-full items-start gap-3.5 rounded-3xl border border-forest-900/8 bg-white/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:bg-white hover:shadow-[0_22px_44px_-24px_rgba(8,23,15,0.35)]">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-forest-900/6 text-forest-700 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-forest-950">
                    <SpecGlyph name={spec.icon} className="h-5 w-5" />
                  </span>
                  <span className="pt-1.5 text-sm leading-snug font-medium text-forest-900">
                    {spec.title}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

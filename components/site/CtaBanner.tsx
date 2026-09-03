import Image from "next/image";
import { project, contact } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import { SiteVisitButton, BrochureButton } from "@/components/lead/CtaTriggers";
import { PhoneIcon } from "@/components/ui/Icons";

/** Full-bleed conversion break between the amenities and connectivity blocks. */
export default function CtaBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-forest-950 py-20 lg:py-24">
      <Image
        src="/images/copy.jpg"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-r from-forest-950 via-forest-950/85 to-forest-950/45"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.24em] text-gold-400 uppercase">
              <span aria-hidden className="h-px w-8 bg-gold-400/50" />
              Site Visits Open
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-3xl leading-[1.08] font-light text-cream-50 text-balance-tight sm:text-4xl lg:text-5xl">
              Walk the podium.
              <br />
              <span className="text-gold-300 italic">Then decide.</span>
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-cream-200/70">
              The sales lounge sits opposite DMart in {project.localityShort}. Come see
              the layouts, the elevation and the landscaped deck — then take your time.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <SiteVisitButton size="lg" variant="primary" />
              <BrochureButton size="lg" variant="onDark" />
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-cream-200/60">
              <a
                href={contact.phoneTel}
                className="group inline-flex items-center gap-2 font-semibold transition-colors hover:text-gold-300"
              >
                <PhoneIcon className="h-4 w-4" />
                {contact.phoneDisplay}
              </a>
              {contact.hours.map((slot) => (
                <span key={slot.days}>
                  <span className="text-cream-200/40">{slot.days}</span> {slot.time}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

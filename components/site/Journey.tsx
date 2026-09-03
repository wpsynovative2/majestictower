import { journey } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { EnquireButton } from "@/components/lead/CtaTriggers";

/** Four-step path from first enquiry to booking. */
export default function Journey() {
  return (
    <section className="relative overflow-hidden bg-forest-800 py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(199,151,60,0.14),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          lead="Your Path to a"
          accent="Majestic Address"
          body="Four straightforward steps, with a dedicated specialist alongside you at each one."
          tone="dark"
          align="center"
        />

        <ol className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connecting rule behind the step markers */}
          <span
            aria-hidden
            className="pointer-events-none absolute top-6 right-0 left-0 hidden h-px bg-linear-to-r from-transparent via-gold-500/30 to-transparent lg:block"
          />

          {journey.map((item, index) => (
            <Reveal key={item.step} delay={index * 110} as="li" className="relative">
              <div className="group">
                <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-gold-400/35 bg-forest-950 font-display text-base text-gold-300 transition-all duration-400 group-hover:scale-110 group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-forest-950">
                  {item.step}
                </span>
                <h3 className="mt-5 font-display text-xl text-cream-50">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-cream-200/65">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={200}>
          <div className="mt-12 text-center">
            <EnquireButton
              label="Start with Step One"
              size="lg"
              variant="gold"
              shimmer
              request={{
                title: "Let's Begin",
                subtitle:
                  "Leave your details and a specialist will call you back to walk you through pricing and availability.",
              }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

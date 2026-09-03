import Image from "next/image";
import { amenities } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { AmenityGlyph } from "@/components/ui/Icons";
import { SiteVisitButton } from "@/components/lead/CtaTriggers";

const featureImages = [
  {
    src: "/images/Pool copy.jpg",
    alt: "Swimming pool with loungers and parasols",
    label: "Swimming Pool",
  },
  {
    src: "/images/19.jpg",
    alt: "Gazebo deck with benches among flowering planting",
    label: "Gazebo",
  },
  {
    src: "/images/20.jpg",
    alt: "Children’s play circle and jogging track on the podium",
    label: "Play Area",
  },
  {
    src: "/images/16.jpg",
    alt: "Dense planting along the podium edge",
    label: "Dense Plantation",
  },
];

export default function Amenities() {
  return (
    <section id="amenities" className="relative scroll-mt-24 bg-cream-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* --------------------------------------------- sticky left rail */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Amenities"
              lead="Our Premium"
              accent="Amenities"
              body="Experience luxury living with world-class features and comforts — fifteen curated spaces across the podium and terrace levels."
            />

            <Reveal delay={200}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <SiteVisitButton size="lg" variant="primary" label="See Them in Person" />
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-10 grid grid-cols-2 gap-3">
                {featureImages.map((image) => (
                  <figure
                    key={image.src}
                    className="group relative aspect-4/3 overflow-hidden rounded-3xl border border-forest-900/8"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 1024px) 45vw, 20vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-t from-forest-950/80 via-forest-950/10 to-transparent"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 p-3 text-[11px] font-semibold tracking-wide text-cream-50">
                      {image.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ----------------------------------------------- amenity grid */}
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {amenities.map((amenity, index) => (
              <Reveal key={amenity.title} delay={index * 45} as="li">
                <div className="group relative flex h-full flex-col items-start gap-4 overflow-hidden rounded-4xl border border-forest-900/8 bg-cream-50 p-5 transition-all duration-400 hover:-translate-y-1.5 hover:border-gold-500/45 hover:bg-forest-900 hover:shadow-[0_30px_60px_-28px_rgba(8,23,15,0.5)] sm:p-6">
                  <span
                    aria-hidden
                    className="absolute -top-8 -right-8 h-20 w-20 rounded-full bg-gold-400/0 transition-all duration-500 group-hover:bg-gold-400/12"
                  />
                  <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-forest-900/6 text-forest-700 transition-all duration-400 group-hover:scale-110 group-hover:bg-gold-400 group-hover:text-forest-950">
                    <AmenityGlyph name={amenity.icon} className="h-6 w-6" />
                  </span>
                  <span className="relative text-sm leading-snug font-semibold text-forest-900 transition-colors duration-300 group-hover:text-cream-50">
                    {amenity.title}
                  </span>
                  <span className="relative mt-auto pt-2 text-[10px] font-semibold tracking-[0.16em] text-forest-900/25 uppercase transition-colors duration-300 group-hover:text-gold-400/70">
                    {String(index + 1).padStart(2, "0")}
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

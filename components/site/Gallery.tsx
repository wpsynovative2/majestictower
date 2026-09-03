"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { gallery, gallerySection } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Lightbox from "./Lightbox";
import { EnquireButton } from "@/components/lead/CtaTriggers";

const ratioClass: Record<string, string> = {
  landscape: "aspect-4/3",
  portrait: "aspect-3/4",
  square: "aspect-square",
};

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length)),
    [],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? null : (i + 1) % gallery.length)),
    [],
  );

  const current = index === null ? null : gallery[index];

  return (
    <section id="gallery" className="relative scroll-mt-24 bg-cream-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={gallerySection.eyebrow}
            lead={gallerySection.titleLead}
            accent={gallerySection.titleAccent}
            body={gallerySection.body}
          />
          <Reveal delay={140}>
            <EnquireButton
              label="Enquire About a View"
              variant="outline"
              size="md"
              className="shrink-0"
              request={{
                title: "Enquire Now",
                subtitle:
                  "Ask us which floors and orientations are still available, and what each one looks out on.",
              }}
            />
          </Reveal>
        </div>

        {/* Column flow rather than a grid, so mixed aspect ratios never leave
            holes in the layout. */}
        <div className="mt-12 columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3">
          {gallery.map((item, i) => (
            <Reveal
              key={item.src}
              delay={(i % 3) * 70}
              className="mb-3 break-inside-avoid sm:mb-4"
            >
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`View ${item.caption}`}
                className={`group relative block w-full overflow-hidden rounded-3xl border border-forest-900/8 bg-forest-900 ${
                  ratioClass[item.ratio] ?? ratioClass.landscape
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-forest-950/85 via-forest-950/10 to-transparent opacity-70 transition-opacity duration-400 group-hover:opacity-95"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                  <span className="translate-y-1 text-sm font-semibold text-cream-50 opacity-90 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.caption}
                  </span>
                  <span
                    aria-hidden
                    className="grid h-8 w-8 shrink-0 scale-75 place-items-center rounded-full bg-gold-400 text-forest-950 opacity-0 transition-all duration-400 group-hover:scale-100 group-hover:opacity-100"
                  >
                    +
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Lightbox
        item={
          current
            ? { src: current.src, alt: current.alt, caption: current.caption }
            : null
        }
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </section>
  );
}

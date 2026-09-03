"use client";

import { useEffect } from "react";
import Image from "next/image";
import { CloseIcon } from "@/components/ui/Icons";

export type LightboxItem = { src: string; alt: string; caption?: string };

type Props = {
  item: LightboxItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
};

/** Full-screen image viewer used by the floor plans and the gallery. */
export default function Lightbox({ item, onClose, onPrev, onNext }: Props) {
  useEffect(() => {
    if (!item) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev?.();
      if (event.key === "ArrowRight") onNext?.();
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [item, onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-forest-950/94 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        type="button"
        aria-label="Close image"
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out"
      />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className="absolute top-4 right-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-cream-50/10 text-cream-50 transition-all duration-200 hover:rotate-90 hover:bg-clay-500 sm:top-6 sm:right-6"
      >
        <CloseIcon className="h-5 w-5" />
      </button>

      {onPrev ? (
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous image"
          className="absolute left-2 z-10 grid h-11 w-11 place-items-center rounded-full bg-cream-50/10 text-xl text-cream-50 transition-colors hover:bg-gold-400 hover:text-forest-950 sm:left-6"
        >
          ‹
        </button>
      ) : null}

      {onNext ? (
        <button
          type="button"
          onClick={onNext}
          aria-label="Next image"
          className="absolute right-2 z-10 grid h-11 w-11 place-items-center rounded-full bg-cream-50/10 text-xl text-cream-50 transition-colors hover:bg-gold-400 hover:text-forest-950 sm:right-6"
        >
          ›
        </button>
      ) : null}

      <div className="pointer-events-none relative z-[1] h-full max-h-[82vh] w-full max-w-5xl animate-pop-in">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="100vw"
          className="rounded-3xl object-contain"
        />
      </div>

      <p className="relative z-[1] mt-4 text-center text-sm text-cream-200/70">
        {item.caption ?? item.alt}
      </p>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { brochureUrl, contact } from "@/lib/content";
import { useLead } from "@/components/lead/LeadContext";
import { useOpenEnquiry } from "@/components/lead/CtaTriggers";
import { PhoneIcon, WhatsAppIcon, DownloadIcon, CalendarIcon } from "@/components/ui/Icons";

/**
 * Two persistent CTAs:
 *  - a vertical rail on desktop (Call / Brochure / WhatsApp), like the original
 *  - a bottom action bar on mobile, where thumb reach matters most
 * Both appear once the visitor has scrolled past the hero.
 */
export default function FloatingCta() {
  const [shown, setShown] = useState(false);
  const { enquiry, privacyOpen } = useLead();
  const openEnquiry = useOpenEnquiry();

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hidden = enquiry || privacyOpen;

  return (
    <>
      {/* ------------------------------------------------- desktop rail */}
      <div
        className={`fixed right-4 bottom-6 z-80 hidden flex-col gap-2.5 transition-all duration-500 lg:flex ${
          shown && !hidden
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-6 opacity-0"
        }`}
      >
        <a
          href={contact.phoneTel}
          className="group flex items-center justify-end gap-0 rounded-full bg-forest-900 py-3.5 pr-4 pl-4 text-cream-50 shadow-[0_16px_36px_-16px_rgba(8,23,15,0.8)] transition-all duration-300 hover:gap-2.5 hover:bg-clay-500"
          aria-label={`Call ${contact.phoneDisplay}`}
        >
          <span className="max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-40 group-hover:opacity-100">
            Call Us
          </span>
          <PhoneIcon className="h-5 w-5 shrink-0" />
        </a>

        <button
          type="button"
          onClick={() =>
            openEnquiry({
              source: "Brochure Download",
              title: "Download the Brochure",
              subtitle:
                "Tell us where to send it. The full brochure — layouts, amenities and specifications — unlocks as soon as you submit.",
              submitLabel: "Get the Brochure",
              downloadUrl: brochureUrl,
            })
          }
          className="group flex items-center justify-end gap-0 rounded-full bg-gold-400 py-3.5 pr-4 pl-4 text-forest-950 shadow-[0_16px_36px_-16px_rgba(199,151,60,0.8)] transition-all duration-300 hover:gap-2.5 hover:bg-gold-300"
          aria-label="Download the brochure"
        >
          <span className="max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-40 group-hover:opacity-100">
            Brochure
          </span>
          <DownloadIcon className="h-5 w-5 shrink-0" />
        </button>

        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex animate-pulse-ring items-center justify-end gap-0 rounded-full bg-clay-500 py-3.5 pr-4 pl-4 text-cream-50 shadow-[0_16px_36px_-16px_rgba(190,90,46,0.9)] transition-all duration-300 hover:gap-2.5 hover:bg-clay-600"
          aria-label="Chat with us on WhatsApp"
        >
          <span className="max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-40 group-hover:opacity-100">
            WhatsApp
          </span>
          <WhatsAppIcon className="h-5 w-5 shrink-0" />
        </a>
      </div>

      {/* --------------------------------------------- mobile action bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-80 border-t border-cream-100/10 bg-forest-950/96 px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur-lg transition-transform duration-400 lg:hidden ${
          shown && !hidden ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-2">
          <a
            href={contact.phoneTel}
            className="flex flex-1 flex-col items-center gap-1 rounded-2xl py-1.5 text-cream-100 transition-colors active:bg-cream-100/10"
            aria-label={`Call ${contact.phoneDisplay}`}
          >
            <PhoneIcon className="h-5 w-5 text-gold-400" />
            <span className="text-[10px] font-semibold tracking-wide">Call</span>
          </a>

          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 flex-col items-center gap-1 rounded-2xl py-1.5 text-cream-100 transition-colors active:bg-cream-100/10"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon className="h-5 w-5 text-gold-400" />
            <span className="text-[10px] font-semibold tracking-wide">WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() =>
              openEnquiry({
                source: "Brochure Download",
                title: "Download the Brochure",
                subtitle:
                  "Tell us where to send it. The full brochure unlocks as soon as you submit.",
                submitLabel: "Get the Brochure",
              })
            }
            className="flex flex-1 flex-col items-center gap-1 rounded-2xl py-1.5 text-cream-100 transition-colors active:bg-cream-100/10"
          >
            <DownloadIcon className="h-5 w-5 text-gold-400" />
            <span className="text-[10px] font-semibold tracking-wide">Brochure</span>
          </button>

          <button
            type="button"
            onClick={() =>
              openEnquiry({
                source: "Site Visit Form",
                title: "Book a Site Visit",
                subtitle:
                  "Pick a time that suits you and our team will confirm your visit to the sales lounge.",
                submitLabel: "Request My Visit",
              })
            }
            className="flex flex-[1.4] items-center justify-center gap-2 rounded-2xl bg-clay-500 py-3 text-sm font-semibold text-cream-50 transition-colors active:bg-clay-600"
          >
            <CalendarIcon className="h-4 w-4" />
            Site Visit
          </button>
        </div>
      </div>
    </>
  );
}

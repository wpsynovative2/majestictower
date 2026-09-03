"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { privacyPolicy, project, contact } from "@/lib/content";
import Modal from "./Modal";
import LeadForm from "./LeadForm";
import { useLead } from "./LeadContext";
import { CtaButton } from "@/components/ui/Button";
import { CheckIcon, SparkIcon } from "@/components/ui/Icons";

/* ------------------------------------------------------------------ enquiry */

/**
 * The single enquiry dialog every CTA on the page opens. Its heading, source
 * tag and pre-selected configuration come from whatever triggered it.
 */
export function EnquiryModal() {
  const { enquiry, closeEnquiry } = useLead();

  return (
    <Modal open={Boolean(enquiry)} onClose={closeEnquiry} labelledBy="enquiry-title">
      {enquiry ? (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="relative overflow-hidden bg-forest-900 px-6 pt-8 pb-7 text-cream-100 sm:px-8">
            <div
              aria-hidden
              className="absolute -top-16 -right-10 h-44 w-44 rounded-full bg-gold-500/15 blur-2xl"
            />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/35 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-gold-300 uppercase">
                <SparkIcon className="h-3 w-3" />
                {project.name}
              </span>
              <h2 id="enquiry-title" className="mt-3 font-display text-3xl leading-tight">
                {enquiry.title}
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-cream-200/75">
                {enquiry.subtitle}
              </p>
            </div>
          </div>
          <div className="px-6 py-6 sm:px-8">
            <LeadForm
              source={enquiry.source}
              configuration={enquiry.configuration}
              downloadUrl={enquiry.downloadUrl}
              submitLabel={enquiry.submitLabel ?? "Submit Enquiry"}
            />
          </div>
        </div>
      ) : null}
    </Modal>
  );
}

/* -------------------------------------------------------------- exit intent */

const EXIT_KEY = "mt_exit_shown";

/**
 * "Unlock Exclusive Offers" — fires when the pointer leaves through the top of
 * the window (desktop) or after a dwell timeout (touch, where there is no
 * mouseleave). Once per session, and never once a lead has been captured.
 */
export function ExitIntentPopup() {
  const { converted, enquiry, privacyOpen } = useLead();
  const [open, setOpen] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(EXIT_KEY) === "1") return;
    } catch {
      // Storage blocked — still allow one show for this page view.
    }
    // Give the visitor a moment before we start watching for exit intent.
    const arm = window.setTimeout(() => setArmed(true), 6000);
    return () => window.clearTimeout(arm);
  }, []);

  useEffect(() => {
    if (!armed || converted) return;

    let fired = false;
    const trigger = () => {
      if (fired || document.body.style.overflow === "hidden") return;
      fired = true;
      setOpen(true);
      try {
        window.sessionStorage.setItem(EXIT_KEY, "1");
      } catch {
        // Non-fatal.
      }
    };

    const onMouseOut = (event: MouseEvent) => {
      if (event.relatedTarget === null && event.clientY <= 8) trigger();
    };

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    document.addEventListener("mouseout", onMouseOut);

    // Touch devices have no exit intent — fall back to a dwell timer.
    const dwell = coarse ? window.setTimeout(trigger, 34000) : undefined;

    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      if (dwell) window.clearTimeout(dwell);
    };
  }, [armed, converted]);

  // Never stack on top of another dialog.
  const visible = open && !enquiry && !privacyOpen;

  return (
    <Modal
      open={visible}
      onClose={() => setOpen(false)}
      labelledBy="exit-title"
      size="lg"
    >
      <div className="grid min-h-0 flex-1 overflow-y-auto md:grid-cols-[0.85fr_1fr]">
        <div className="relative hidden min-h-full overflow-hidden bg-forest-900 md:block">
          <Image
            src="/images/Pool copy.jpg"
            alt="Swimming pool at Majestic Tower"
            fill
            sizes="(max-width: 768px) 0px, 320px"
            className="object-cover opacity-55"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-forest-950 via-forest-950/50 to-transparent"
          />
          <div className="relative flex h-full flex-col justify-end gap-3 p-7 text-cream-100">
            <p className="font-display text-2xl leading-tight">
              Before you go —
              <br />
              <span className="text-gold-300">talk to us.</span>
            </p>
            <ul className="space-y-2 text-xs text-cream-200/80">
              {[
                "Current price list & payment plan",
                "Available floors and views",
                "Site visit at your convenience",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-400" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="px-6 py-8 sm:px-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-clay-500/12 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-clay-600 uppercase">
            Limited Release
          </span>
          <h2 id="exit-title" className="mt-3 font-display text-3xl leading-tight text-forest-900">
            Unlock Exclusive Offers
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-forest-900/65">
            Leave your number and our sales desk will share the current offer on{" "}
            {project.configurationShort} residences at {project.name}.
          </p>
          <div className="mt-5">
            <LeadForm
              source="Exit Intent Popup"
              submitLabel="Send Me the Offer"
              onSuccess={() => setOpen(false)}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

/* -------------------------------------------------------- privacy commitment */

const PRIVACY_KEY = "mt_privacy_ack";

/**
 * The Privacy Commitment notice from the original site. It surfaces itself once
 * per visitor, and any "Privacy Policy" link re-opens it on demand.
 */
export function PrivacyModal() {
  const { privacyOpen, openPrivacy, closePrivacy, enquiry } = useLead();
  const [acknowledged, setAcknowledged] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return window.localStorage.getItem(PRIVACY_KEY) === "1";
    } catch {
      // Storage blocked — don't nag.
      return true;
    }
  });

  useEffect(() => {
    if (acknowledged) return;
    const timer = window.setTimeout(() => {
      // Don't interrupt someone already filling in a form.
      if (document.body.style.overflow !== "hidden") openPrivacy();
    }, 14000);
    return () => window.clearTimeout(timer);
  }, [acknowledged, openPrivacy]);

  function accept() {
    try {
      window.localStorage.setItem(PRIVACY_KEY, "1");
    } catch {
      // Non-fatal.
    }
    setAcknowledged(true);
    closePrivacy();
  }

  return (
    <Modal
      open={privacyOpen && !enquiry}
      onClose={acknowledged ? closePrivacy : accept}
      labelledBy="privacy-title"
      size="lg"
    >
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 border-b border-forest-900/8 bg-cream-50/95 px-6 py-5 backdrop-blur sm:px-8">
          <h2 id="privacy-title" className="font-display text-2xl text-forest-900">
            {privacyPolicy.title}{" "}
            <span className="text-gold-600">{privacyPolicy.titleAccent}</span>
          </h2>
        </div>
        <div className="space-y-4 px-6 py-6 text-sm leading-relaxed text-forest-900/72 sm:px-8">
          {privacyPolicy.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          <p className="text-xs text-forest-900/50">
            Questions about your data? Write to{" "}
            <a href={contact.emailHref} className="text-gold-600 underline underline-offset-2">
              {contact.email}
            </a>
            .
          </p>
        </div>
        <div className="sticky bottom-0 border-t border-forest-900/8 bg-cream-50/95 px-6 py-4 backdrop-blur sm:px-8">
          <CtaButton onClick={accept} size="lg" variant="primary" className="w-full sm:w-auto">
            {privacyPolicy.accept}
          </CtaButton>
        </div>
      </div>
    </Modal>
  );
}

/* -------------------------------------------------------------------- toast */

/** Submission feedback, bottom-left so it never covers the floating CTAs. */
export function Toast() {
  const { toast, dismissToast } = useLead();
  if (!toast) return null;

  const success = toast.tone === "success";

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 z-100 w-[min(22rem,calc(100vw-2rem))] animate-slide-up"
    >
      <div
        className={`flex items-start gap-3 rounded-2xl border p-4 shadow-[0_20px_50px_-16px_rgba(8,23,15,0.55)] backdrop-blur ${
          success
            ? "border-gold-400/40 bg-forest-900/95 text-cream-100"
            : "border-clay-500/40 bg-cream-50/98 text-forest-900"
        }`}
      >
        <span
          className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${
            success ? "bg-gold-400 text-forest-950" : "bg-clay-500 text-cream-50"
          }`}
        >
          {success ? <CheckIcon className="h-3.5 w-3.5" /> : <span className="text-xs">!</span>}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">{toast.title}</p>
          {toast.body ? (
            <p className={`mt-0.5 text-xs ${success ? "text-cream-200/70" : "text-forest-900/60"}`}>
              {toast.body}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={dismissToast}
          aria-label="Dismiss notification"
          className="shrink-0 text-lg leading-none opacity-50 transition-opacity hover:opacity-100"
        >
          ×
        </button>
      </div>
    </div>
  );
}

/** Mounted once in the layout. */
export default function Popups() {
  return (
    <>
      <EnquiryModal />
      <ExitIntentPopup />
      <PrivacyModal />
      <Toast />
    </>
  );
}

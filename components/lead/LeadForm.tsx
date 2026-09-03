"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { configurationOptions, consentLabel } from "@/lib/content";
import { useRouter } from "next/navigation";
import {
  sendLead,
  rememberLead,
  thankYouUrl,
  type LeadSource,
} from "@/lib/leads";
import { recaptchaEnabled, loadRecaptcha } from "@/lib/recaptcha";
import {
  validateLead,
  hasErrors,
  normalizeIndianMobile,
  type LeadFormErrors,
  type LeadFormValues,
} from "@/lib/validation";
import { useLead } from "./LeadContext";
import { CtaButton, ArrowRight } from "@/components/ui/Button";

type LeadFormProps = {
  source: LeadSource;
  tone?: "light" | "dark";
  submitLabel?: string;
  configuration?: string;
  /** Brochure flow: offered on the confirmation page after redirect. */
  downloadUrl?: string;
  onSuccess?: () => void;
  compact?: boolean;
};

/** The hidden metadata never changes once the form is mounted. */
const subscribeNever = () => () => {};
const serverSnapshot = () => "";

const emptyValues: LeadFormValues = {
  name: "",
  phone: "",
  email: "",
  configuration: "",
  consent: false,
};

export default function LeadForm({
  source,
  tone = "light",
  submitLabel = "Submit Enquiry",
  configuration,
  downloadUrl,
  onSuccess,
  compact = false,
}: LeadFormProps) {
  const uid = useId();
  const router = useRouter();
  const { pushToast, markConverted, openPrivacy, closeEnquiry } = useLead();

  const [values, setValues] = useState<LeadFormValues>({
    ...emptyValues,
    configuration: configuration ?? "",
  });
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  // Kept true through the navigation so the button never flips back to idle.
  const [redirecting, setRedirecting] = useState(false);

  // Hidden fields. Read from the browser through useSyncExternalStore so the
  // server renders an empty string and the client fills it in on hydration,
  // with no mismatch warning and no setState inside an effect.
  const metaRef = useRef<{ url: string; stamp: string } | null>(null);
  const meta = () => {
    metaRef.current ??= {
      url: window.location.href,
      stamp: new Date().toISOString(),
    };
    return metaRef.current;
  };
  const pageUrl = useSyncExternalStore(
    subscribeNever,
    () => meta().url,
    serverSnapshot,
  );
  const loadStamp = useSyncExternalStore(
    subscribeNever,
    () => meta().stamp,
    serverSnapshot,
  );
  // Replaced at submit so the hidden field matches what is actually sent.
  const [submitStamp, setSubmitStamp] = useState<string | null>(null);
  // Honeypot: off-screen and hidden from assistive tech, so only bots fill it.
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    // Warm up the reCAPTCHA script so the first submit is not slowed by it.
    void loadRecaptcha().catch(() => {});
  }, []);

  const dark = tone === "dark";

  function update<K extends keyof LeadFormValues>(key: K, value: LeadFormValues[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) {
      setErrors(validateLead(next));
    }
  }

  function blur(key: keyof LeadFormValues) {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validateLead(values));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const nextErrors = validateLead(values);
    setErrors(nextErrors);
    setTouched({ name: true, phone: true, email: true, consent: true });

    if (hasErrors(nextErrors)) {
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`${uid}-${firstKey}`)?.focus();
      return;
    }

    setSubmitting(true);
    // Refresh the timestamp so it reflects the actual submit, not page load.
    setSubmitStamp(new Date().toISOString());

    const result = await sendLead(values, source, honeypot);

    if (result.ok) {
      markConverted();
      // Hand the confirmation page what it needs to greet the visitor and,
      // for the brochure flow, to offer the file.
      rememberLead({
        name: values.name.trim(),
        phone: normalizeIndianMobile(values.phone),
        source,
        configuration: values.configuration,
        downloadUrl,
      });
      setRedirecting(true);
      // Dismiss whatever container this form is in — the popups live in the
      // root layout, so they would otherwise survive the route change.
      onSuccess?.();
      closeEnquiry();
      router.push(thankYouUrl(source));
      return;
    }

    setSubmitting(false);
    pushToast({
      tone: "error",
      title: "We could not send that.",
      body: result.error,
    });
  }

  const labelClass = `mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] ${
    dark ? "text-cream-200/70" : "text-forest-800/60"
  }`;

  const fieldClass = (invalid: boolean) =>
    [
      "w-full rounded-2xl border px-4 py-3 text-sm transition-all duration-200 outline-none",
      dark
        ? "border-cream-100/15 bg-forest-950/40 text-cream-50 placeholder:text-cream-200/35"
        : "border-forest-900/12 bg-white text-forest-900 placeholder:text-forest-900/35",
      invalid
        ? "border-clay-500 ring-2 ring-clay-500/25"
        : dark
          ? "focus:border-gold-400 focus:ring-2 focus:ring-gold-400/25"
          : "focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20",
    ].join(" ");

  const errorClass = `mt-1.5 flex items-start gap-1 text-xs ${
    dark ? "text-clay-300" : "text-clay-600"
  }`;

  function fieldError(key: keyof LeadFormValues) {
    if (!touched[key] || !errors[key]) return null;
    return (
      <p id={`${uid}-${key}-error`} role="alert" className={errorClass}>
        <span aria-hidden>!</span>
        {errors[key]}
      </p>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-4">
      <div className={compact ? "grid gap-4 sm:grid-cols-2" : "space-y-4"}>
        <div>
          <label htmlFor={`${uid}-name`} className={labelClass}>
            Full Name <span className="text-clay-400">*</span>
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => blur("name")}
            aria-invalid={Boolean(touched.name && errors.name)}
            aria-describedby={touched.name && errors.name ? `${uid}-name-error` : undefined}
            className={fieldClass(Boolean(touched.name && errors.name))}
          />
          {fieldError("name")}
        </div>

        <div>
          <label htmlFor={`${uid}-phone`} className={labelClass}>
            Contact No <span className="text-clay-400">*</span>
          </label>
          <div className="relative">
            <span
              className={`pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-sm ${
                dark ? "text-cream-200/45" : "text-forest-900/40"
              }`}
            >
              +91
            </span>
            <input
              id={`${uid}-phone`}
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="98765 43210"
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              onBlur={() => blur("phone")}
              aria-invalid={Boolean(touched.phone && errors.phone)}
              aria-describedby={
                touched.phone && errors.phone ? `${uid}-phone-error` : undefined
              }
              className={`${fieldClass(Boolean(touched.phone && errors.phone))} pl-13`}
            />
          </div>
          {fieldError("phone")}
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-email`} className={labelClass}>
          Email <span className="text-clay-400">*</span>
        </label>
        <input
          id={`${uid}-email`}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          onBlur={() => blur("email")}
          aria-invalid={Boolean(touched.email && errors.email)}
          aria-describedby={touched.email && errors.email ? `${uid}-email-error` : undefined}
          className={fieldClass(Boolean(touched.email && errors.email))}
        />
        {fieldError("email")}
      </div>

      <div>
        <label htmlFor={`${uid}-configuration`} className={labelClass}>
          Configuration Type
        </label>
        <select
          id={`${uid}-configuration`}
          name="configuration"
          value={values.configuration}
          onChange={(e) => update("configuration", e.target.value)}
          className={`${fieldClass(false)} appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23A87B29'%3E%3Cpath d='M8 11 3.5 6h9z'/%3E%3C/svg%3E\")",
          }}
        >
          <option value="">Select a configuration</option>
          {configurationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Hidden fields — auto-populated, submitted with every lead. */}
      <input type="hidden" name="pageUrl" value={pageUrl} readOnly />
      <input
        type="hidden"
        name="submittedAt"
        value={submitStamp ?? loadStamp}
        readOnly
      />
      <input type="hidden" name="source" value={source} readOnly />

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-company`}>Company (leave blank)</label>
        <input
          id={`${uid}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor={`${uid}-consent`}
          className={`flex cursor-pointer items-start gap-3 text-xs leading-relaxed ${
            dark ? "text-cream-200/75" : "text-forest-900/70"
          }`}
        >
          <input
            id={`${uid}-consent`}
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
            onBlur={() => blur("consent")}
            aria-invalid={Boolean(touched.consent && errors.consent)}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-clay-500"
          />
          <span>
            {consentLabel.split("Privacy Policy")[0]}
            <button
              type="button"
              onClick={openPrivacy}
              className="font-semibold text-gold-600 underline underline-offset-2 transition-colors hover:text-clay-500"
            >
              Privacy Policy
            </button>
            {consentLabel.split("Privacy Policy")[1]}
          </span>
        </label>
        {fieldError("consent")}
      </div>

      <CtaButton
        type="submit"
        size="lg"
        variant="primary"
        shimmer
        disabled={submitting || redirecting}
        className="w-full"
      >
        {submitting || redirecting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream-50/40 border-t-cream-50" />
            {redirecting ? "Taking you to confirmation…" : "Sending…"}
          </>
        ) : (
          <>
            {submitLabel}
            <ArrowRight />
          </>
        )}
      </CtaButton>

      <p
        className={`text-center text-[10px] leading-relaxed ${
          dark ? "text-cream-200/45" : "text-forest-900/45"
        }`}
      >
        {recaptchaEnabled ? (
          <>
            Protected by reCAPTCHA — Google{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              Privacy
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              Terms
            </a>{" "}
            apply.
          </>
        ) : (
          "Your details stay with the Majestic Tower sales team."
        )}
      </p>
    </form>
  );
}

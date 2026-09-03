import { getRecaptchaToken } from "./recaptcha";
import type { LeadFormValues } from "./validation";
import { normalizeIndianMobile } from "./validation";

/** Deployed Google Apps Script web-app URL (…/exec). */
export const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "";

export type LeadSource =
  | "Hero Enquiry"
  | "Enquiry Popup"
  | "Exit Intent Popup"
  | "Brochure Download"
  | "Site Visit Form"
  | "Floor Plan Request"
  | "Contact Section";

export type LeadPayload = LeadFormValues & {
  /** Which form on the page produced the lead. */
  source: LeadSource;
  /** Hidden field: full URL the form was submitted from. */
  pageUrl: string;
  /** Hidden field: human-readable submission timestamp (IST). */
  submittedAt: string;
  /** Hidden field: machine-readable submission timestamp. */
  submittedAtIso: string;
  referrer: string;
  recaptchaToken: string;
  recaptchaAction: string;
  /** Honeypot — always empty for real people; bots fill it in. */
  company: string;
};

export type SubmitResult =
  | { ok: true; opaque: boolean }
  | { ok: false; error: string };

/** "02 Sep 2026, 03:41 PM IST" — what the sales team reads in the sheet. */
function formatIstTimestamp(date: Date): string {
  const formatted = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  return `${formatted} IST`;
}

/** reCAPTCHA actions must be alphanumeric / underscore / slash only. */
function toRecaptchaAction(source: LeadSource): string {
  return source.toLowerCase().replace(/[^a-z0-9]+/g, "_");
}

export function buildLeadPayload(
  values: LeadFormValues,
  source: LeadSource,
  recaptchaToken: string,
  company = "",
): LeadPayload {
  const now = new Date();
  return {
    name: values.name.trim(),
    phone: normalizeIndianMobile(values.phone),
    email: values.email.trim(),
    configuration: values.configuration,
    consent: values.consent,
    source,
    pageUrl: typeof window === "undefined" ? "" : window.location.href,
    submittedAt: formatIstTimestamp(now),
    submittedAtIso: now.toISOString(),
    referrer: typeof document === "undefined" ? "" : document.referrer,
    recaptchaToken,
    recaptchaAction: toRecaptchaAction(source),
    company,
  };
}

/**
 * Sends the lead to the Apps Script web app, which writes it to the Google
 * Sheet and emails the sales inbox.
 *
 * The body is sent as `text/plain` on purpose: that keeps it a CORS "simple
 * request", so the browser skips the preflight OPTIONS call that Apps Script
 * cannot answer. Apps Script reads the raw JSON from `e.postData.contents`.
 */
export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  if (!LEAD_ENDPOINT) {
    return {
      ok: false,
      error:
        "Lead endpoint is not configured. Set NEXT_PUBLIC_LEAD_ENDPOINT in .env.local.",
    };
  }

  const body = JSON.stringify(payload);

  try {
    const response = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
      redirect: "follow",
    });

    if (!response.ok) {
      return { ok: false, error: `Submission failed (${response.status}).` };
    }

    const text = await response.text();
    try {
      const data = JSON.parse(text) as { ok?: boolean; error?: string };
      if (data.ok === false) {
        return { ok: false, error: data.error ?? "Submission was rejected." };
      }
    } catch {
      // Apps Script occasionally returns an HTML wrapper after its internal
      // redirect. A 2xx is good enough in that case.
    }
    return { ok: true, opaque: false };
  } catch {
    // Network or CORS failure. Retry opaquely so the lead still reaches the
    // sheet even though we cannot read the response back.
    try {
      await fetch(LEAD_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body,
      });
      return { ok: true, opaque: true };
    } catch {
      return {
        ok: false,
        error:
          "We could not reach the server. Please check your connection or call us on +91 9702090090.",
      };
    }
  }
}

/** Convenience wrapper: mint a token, build the payload, post it. */
export async function sendLead(
  values: LeadFormValues,
  source: LeadSource,
  company = "",
): Promise<SubmitResult> {
  let token = "";
  try {
    token = await getRecaptchaToken(toRecaptchaAction(source));
  } catch {
    // reCAPTCHA failed to load (blocked, offline). The Apps Script decides
    // whether to accept a token-less submission via its REQUIRE_RECAPTCHA flag.
  }
  return submitLead(buildLeadPayload(values, source, token, company));
}

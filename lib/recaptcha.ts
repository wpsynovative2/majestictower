/**
 * Google reCAPTCHA v3 (invisible, score based).
 *
 * The site key is public by design and is injected at build time from
 * NEXT_PUBLIC_RECAPTCHA_SITE_KEY. The *secret* key never touches this bundle —
 * the token produced here is verified server-side inside the Apps Script
 * receiver (see google-apps-script/Code.gs).
 */

export const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

export const recaptchaEnabled = RECAPTCHA_SITE_KEY.length > 0;

type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

let scriptPromise: Promise<void> | null = null;

/** Injects the reCAPTCHA v3 script once, on first use. */
export function loadRecaptcha(): Promise<void> {
  if (!recaptchaEnabled) return Promise.resolve();
  if (typeof window === "undefined") return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      "script[data-recaptcha-v3]",
    );
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.dataset.recaptchaV3 = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA."));
    document.head.appendChild(script);
  });

  return scriptPromise;
}

/**
 * Returns a fresh reCAPTCHA token for the given action, or an empty string when
 * reCAPTCHA is not configured. Tokens are single-use and expire in ~2 minutes,
 * so this is always called at submit time rather than on mount.
 */
export async function getRecaptchaToken(action: string): Promise<string> {
  if (!recaptchaEnabled) return "";
  await loadRecaptcha();
  const grecaptcha = window.grecaptcha;
  if (!grecaptcha) return "";
  await new Promise<void>((resolve) => grecaptcha.ready(resolve));
  return grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
}

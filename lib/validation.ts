/** Shared, framework-free validation for every lead form on the site. */

export type LeadFormValues = {
  name: string;
  phone: string;
  email: string;
  configuration: string;
  consent: boolean;
};

export type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;

/**
 * Strips spaces, dashes, brackets and a leading +91 / 91 / 0 so that
 * "+91 98765 43210", "091-9876543210" and "9876543210" all normalise to the
 * same ten digits.
 */
export function normalizeIndianMobile(raw: string): string {
  const digitsOnly = raw.replace(/[^\d]/g, "");
  if (digitsOnly.length === 12 && digitsOnly.startsWith("91")) {
    return digitsOnly.slice(2);
  }
  if (digitsOnly.length === 11 && digitsOnly.startsWith("0")) {
    return digitsOnly.slice(1);
  }
  if (digitsOnly.length === 13 && digitsOnly.startsWith("091")) {
    return digitsOnly.slice(3);
  }
  return digitsOnly;
}

/** A valid Indian mobile is 10 digits beginning with 6, 7, 8 or 9. */
export function isValidIndianMobile(raw: string): boolean {
  return /^[6-9]\d{9}$/.test(normalizeIndianMobile(raw));
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export function isValidEmail(raw: string): boolean {
  return EMAIL_RE.test(raw.trim());
}

export function validateLead(
  values: LeadFormValues,
  options: { requireConsent?: boolean } = {},
): LeadFormErrors {
  const { requireConsent = true } = options;
  const errors: LeadFormErrors = {};

  const name = values.name.trim();
  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length < 2) {
    errors.name = "Please enter your full name.";
  } else if (!/[a-zA-Zऀ-ॿ]/.test(name)) {
    errors.name = "Please enter a valid name.";
  }

  const phone = values.phone.trim();
  if (!phone) {
    errors.phone = "Please enter your mobile number.";
  } else if (!isValidIndianMobile(phone)) {
    errors.phone =
      "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.";
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address, e.g. name@example.com";
  }

  if (requireConsent && !values.consent) {
    errors.consent = "Please accept the Privacy Policy to continue.";
  }

  return errors;
}

export function hasErrors(errors: LeadFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { LeadSource } from "@/lib/leads";

export type EnquiryRequest = {
  source: LeadSource;
  title: string;
  subtitle: string;
  /** Pre-selects the configuration dropdown, e.g. from a floor-plan card. */
  configuration?: string;
  /** Shown on the success screen; used by the brochure flow. */
  downloadUrl?: string;
  submitLabel?: string;
};

export type ToastMessage = {
  id: number;
  tone: "success" | "error";
  title: string;
  body?: string;
};

type LeadContextValue = {
  enquiry: EnquiryRequest | null;
  openEnquiry: (request: EnquiryRequest) => void;
  closeEnquiry: () => void;
  privacyOpen: boolean;
  openPrivacy: () => void;
  closePrivacy: () => void;
  toast: ToastMessage | null;
  pushToast: (toast: Omit<ToastMessage, "id">) => void;
  dismissToast: () => void;
  /** True once any popup has captured this visitor, so we stop nagging. */
  converted: boolean;
  markConverted: () => void;
};

const LeadContext = createContext<LeadContextValue | null>(null);

const CONVERTED_KEY = "mt_lead_captured";

export function LeadProvider({ children }: { children: ReactNode }) {
  const [enquiry, setEnquiry] = useState<EnquiryRequest | null>(null);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [converted, setConverted] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.sessionStorage.getItem(CONVERTED_KEY) === "1";
    } catch {
      // Private browsing — treat as a fresh visitor.
      return false;
    }
  });

  const openEnquiry = useCallback((request: EnquiryRequest) => {
    setEnquiry(request);
  }, []);

  const closeEnquiry = useCallback(() => setEnquiry(null), []);
  const openPrivacy = useCallback(() => setPrivacyOpen(true), []);
  const closePrivacy = useCallback(() => setPrivacyOpen(false), []);

  const pushToast = useCallback((next: Omit<ToastMessage, "id">) => {
    setToast({ ...next, id: Date.now() });
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  const markConverted = useCallback(() => {
    setConverted(true);
    try {
      window.sessionStorage.setItem(CONVERTED_KEY, "1");
    } catch {
      // Non-fatal.
    }
  }, []);

  // Auto-dismiss toasts.
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 6000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  // Lock body scroll while any modal is open.
  useEffect(() => {
    const locked = Boolean(enquiry) || privacyOpen;
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [enquiry, privacyOpen]);

  const value = useMemo<LeadContextValue>(
    () => ({
      enquiry,
      openEnquiry,
      closeEnquiry,
      privacyOpen,
      openPrivacy,
      closePrivacy,
      toast,
      pushToast,
      dismissToast,
      converted,
      markConverted,
    }),
    [
      enquiry,
      openEnquiry,
      closeEnquiry,
      privacyOpen,
      openPrivacy,
      closePrivacy,
      toast,
      pushToast,
      dismissToast,
      converted,
      markConverted,
    ],
  );

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
}

export function useLead() {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error("useLead must be used inside <LeadProvider>.");
  return ctx;
}

/** The default enquiry popup, used by most CTAs. */
export const defaultEnquiry: EnquiryRequest = {
  source: "Enquiry Popup",
  title: "Enquire Now",
  subtitle:
    "Share your details and a Majestic Tower specialist will call you back with pricing, availability and payment plans.",
};

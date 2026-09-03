"use client";

import { useLead } from "@/components/lead/LeadContext";

/** Re-opens the Privacy Commitment dialog from anywhere on the page. */
export default function PrivacyLink({ className = "" }: { className?: string }) {
  const { openPrivacy } = useLead();
  return (
    <button type="button" onClick={openPrivacy} className={className}>
      Privacy Policy
    </button>
  );
}

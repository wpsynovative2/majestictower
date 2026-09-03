"use client";

import { brochureUrl, project } from "@/lib/content";
import { CtaButton, ArrowRight } from "@/components/ui/Button";
import { DownloadIcon, CalendarIcon } from "@/components/ui/Icons";
import { useLead, defaultEnquiry, type EnquiryRequest } from "./LeadContext";
import type { ComponentProps } from "react";

type ButtonProps = Omit<ComponentProps<typeof CtaButton>, "children" | "onClick">;

/** Opens the enquiry dialog with a caller-supplied heading and source tag. */
export function useOpenEnquiry() {
  const { openEnquiry } = useLead();
  return (request?: Partial<EnquiryRequest>) =>
    openEnquiry({ ...defaultEnquiry, ...request });
}

export function EnquireButton({
  label = "Enquire Now",
  request,
  withArrow = true,
  ...props
}: ButtonProps & {
  label?: string;
  request?: Partial<EnquiryRequest>;
  withArrow?: boolean;
}) {
  const open = useOpenEnquiry();
  return (
    <CtaButton {...props} onClick={() => open(request)}>
      {label}
      {withArrow ? <ArrowRight /> : null}
    </CtaButton>
  );
}

export function SiteVisitButton({
  label = "Book a Site Visit",
  ...props
}: ButtonProps & { label?: string }) {
  const open = useOpenEnquiry();
  return (
    <CtaButton
      {...props}
      onClick={() =>
        open({
          source: "Site Visit Form",
          title: "Book a Site Visit",
          subtitle: `Pick a time that suits you. Our team will confirm your visit to the ${project.name} sales lounge, opposite DMart in Nalasopara West.`,
          submitLabel: "Request My Visit",
        })
      }
    >
      <CalendarIcon className="h-4 w-4" />
      {label}
    </CtaButton>
  );
}

/**
 * Brochure downloads are gated behind the form — the file link is revealed on
 * the success screen once the lead is captured.
 */
export function BrochureButton({
  label = "Download Brochure",
  ...props
}: ButtonProps & { label?: string }) {
  const open = useOpenEnquiry();
  return (
    <CtaButton
      {...props}
      onClick={() =>
        open({
          source: "Brochure Download",
          title: "Download the Brochure",
          subtitle:
            "Tell us where to send it. The full brochure — layouts, amenities and specifications — unlocks as soon as you submit.",
          submitLabel: "Get the Brochure",
          downloadUrl: brochureUrl,
        })
      }
    >
      <DownloadIcon className="h-4 w-4" />
      {label}
    </CtaButton>
  );
}

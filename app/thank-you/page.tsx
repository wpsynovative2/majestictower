import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import ThankYou from "@/components/site/ThankYou";
import FloatingCta from "@/components/site/FloatingCta";
import { project } from "@/lib/content";

export const metadata: Metadata = {
  title: `Thank You | ${project.name}`,
  description: `Your enquiry for ${project.name} has been received. Our sales team will call you shortly.`,
  // A confirmation page has no standalone search value, and indexing it would
  // let people land here without ever submitting the form.
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <ThankYou />
      <Footer />
      <FloatingCta />
      {/* Clears the mobile action bar so the footer is never covered. */}
      <div aria-hidden className="h-16 lg:hidden" />
    </>
  );
}

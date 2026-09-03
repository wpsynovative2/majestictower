import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Overview from "@/components/site/Overview";
import Residences from "@/components/site/Residences";
import Amenities from "@/components/site/Amenities";
import CtaBanner from "@/components/site/CtaBanner";
import Connectivity from "@/components/site/Connectivity";
import Gallery from "@/components/site/Gallery";
import Journey from "@/components/site/Journey";
import Faq from "@/components/site/Faq";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import FloatingCta from "@/components/site/FloatingCta";

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Overview />
        <Residences />
        <Amenities />
        <CtaBanner />
        <Connectivity />
        <Gallery />
        <Journey />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
      {/* Clears the mobile action bar so the footer is never covered. */}
      <div aria-hidden className="h-16 lg:hidden" />
    </>
  );
}

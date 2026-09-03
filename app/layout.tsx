import type { Metadata, Viewport } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import { LeadProvider } from "@/components/lead/LeadContext";
import Popups from "@/components/lead/Popups";
import { project, contact, amenities, faqs } from "@/lib/content";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

/** Google Tag Manager container. Override per environment if needed. */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-54X3PCH8";

/** Set NEXT_PUBLIC_SITE_URL to the production origin before deploying. */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://majestictower.patilbuilders.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: project.seoTitle,
  description: project.seoDescription,
  keywords: [
    "Majestic Tower",
    "Patil Builders",
    "2 BHK Nalasopara West",
    "3 BHK Nalasopara West",
    "flats in Nalasopara West",
    "Mumbai real estate",
    "MahaRERA P99000079138",
  ],
  authors: [{ name: project.developer }],
  openGraph: {
    title: project.seoTitle,
    description: project.seoDescription,
    type: "website",
    locale: "en_IN",
    siteName: project.name,
    images: [{ url: "/images/front.jpg", width: 1200, height: 675, alt: project.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: project.seoTitle,
    description: project.seoDescription,
    images: ["/images/front.jpg"],
  },
  icons: { icon: "/images/logo fev icon.png" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0D2318",
  width: "device-width",
  initialScale: 1,
};

/** Structured data mirroring the schema published on the original site. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: project.developer,
      url: siteUrl,
      logo: `${siteUrl}/images/Logo.png`,
      email: contact.email,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: contact.phoneRaw,
          contactType: "sales",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi", "Marathi"],
        },
      ],
      sameAs: [contact.instagram, contact.whatsapp],
    },
    {
      "@type": "Apartment",
      name: project.name,
      description: project.seoDescription,
      url: siteUrl,
      image: `${siteUrl}/images/front.jpg`,
      numberOfRooms: "2-3",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Majestic Tower Sales Lounge, Opp. DMart",
        addressLocality: "Nalasopara West",
        addressRegion: "Maharashtra",
        postalCode: "401203",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: contact.geo.lat,
        longitude: contact.geo.lng,
      },
      telephone: contact.phoneRaw,
      amenityFeature: amenities.map((amenity) => ({
        "@type": "LocationFeatureSpecification",
        name: amenity.title,
        value: true,
      })),
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "08:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Sunday"],
          opens: "11:00",
          closes: "21:00",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${fraunces.variable} ${dmSans.variable} h-full antialiased`}
    >
      {/* Google Tag Manager — rendered in an explicit <head> so the container
          loads as early as GTM expects. Next emits `beforeInteractive` scripts
          at the top of <body>, which is why this is a raw <script>. */}
      <head>
        {GTM_ID ? (
          /* eslint-disable-next-line @next/next/next-script-for-ga --
             @next/third-parties' GoogleTagManager loads afterInteractive and
             injects into <body>; GTM wants the loader in <head>. */
          <script
            id="gtm-base"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        ) : null}
      </head>
      <body className="flex min-h-full flex-col bg-cream-50">
        {/* Google Tag Manager (noscript) */}
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LeadProvider>
          {children}
          <Popups />
        </LeadProvider>
      </body>
    </html>
  );
}

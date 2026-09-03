import { contact, contactSection, mapEmbedUrl, mapDirectionsUrl, project } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import LeadForm from "@/components/lead/LeadForm";
import { CtaLink } from "@/components/ui/Button";
import {
  PinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  WhatsAppIcon,
  InstagramIcon,
} from "@/components/ui/Icons";

const details = [
  {
    icon: PinIcon,
    label: "Location",
    value: contact.addressLine,
    href: mapDirectionsUrl,
    external: true,
  },
  { icon: PhoneIcon, label: "Contact", value: contact.phoneDisplay, href: contact.phoneTel },
  { icon: MailIcon, label: "E-mail", value: contact.email, href: contact.emailHref },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-forest-900 py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_10%_0%,rgba(36,87,65,0.5),transparent_60%),radial-gradient(70%_60%_at_100%_100%,rgba(199,151,60,0.12),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
          {/* ------------------------------------------------------ details */}
          <div>
            <SectionHeading
              eyebrow={contactSection.eyebrow}
              lead={contactSection.titleLead}
              accent={contactSection.titleAccent}
              body={contactSection.body}
              tone="dark"
            />

            <div className="mt-10 space-y-3">
              {details.map((detail, index) => {
                const Icon = detail.icon;
                return (
                  <Reveal key={detail.label} delay={index * 80}>
                    <a
                      href={detail.href}
                      {...(detail.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex items-start gap-4 rounded-3xl border border-cream-100/10 bg-forest-950/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/40 hover:bg-forest-950/70"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cream-100/8 text-gold-400 transition-all duration-300 group-hover:bg-gold-400 group-hover:text-forest-950">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[10px] font-semibold tracking-[0.2em] text-cream-200/45 uppercase">
                          {detail.label}
                        </span>
                        <span className="mt-1 block text-sm leading-snug text-cream-50">
                          {detail.value}
                        </span>
                      </span>
                    </a>
                  </Reveal>
                );
              })}

              <Reveal delay={240}>
                <div className="flex items-start gap-4 rounded-3xl border border-cream-100/10 bg-forest-950/40 p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cream-100/8 text-gold-400">
                    <ClockIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="block text-[10px] font-semibold tracking-[0.2em] text-cream-200/45 uppercase">
                      Office Hours
                    </span>
                    <div className="mt-1 space-y-0.5">
                      {contact.hours.map((slot) => (
                        <p key={slot.days} className="text-sm text-cream-50">
                          <span className="text-cream-200/55">{slot.days} :</span>{" "}
                          {slot.time}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={300}>
              <div className="mt-6 flex flex-wrap gap-3">
                <CtaLink href={contact.whatsapp} external variant="gold" size="md">
                  <WhatsAppIcon className="h-4 w-4" />
                  Chat on WhatsApp
                </CtaLink>
                <CtaLink href={contact.instagram} external variant="onDark" size="md">
                  <InstagramIcon className="h-4 w-4" />
                  Instagram
                </CtaLink>
              </div>
            </Reveal>
          </div>

          {/* --------------------------------------------------------- form */}
          <Reveal delay={140}>
            <div className="overflow-hidden rounded-4xl border border-gold-400/20 bg-forest-950/60 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] backdrop-blur-sm">
              <div className="border-b border-cream-100/10 px-6 py-6 sm:px-8">
                <h3 className="font-display text-2xl text-cream-50">
                  Book a <span className="text-gold-300 italic">Site Visit</span>
                </h3>
                <p className="mt-1.5 text-sm text-cream-200/60">
                  Fill this in and our sales desk will confirm your slot.
                </p>
              </div>
              <div className="px-6 py-6 sm:px-8">
                <LeadForm
                  source="Site Visit Form"
                  tone="dark"
                  submitLabel="Submit"
                  compact
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------------------------------------------------------- map */}
        <div className="mt-16 lg:mt-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h3 className="font-display text-2xl text-cream-50 sm:text-3xl">
                {contactSection.mapTitleLead}{" "}
                <span className="text-gold-300 italic">
                  {contactSection.mapTitleAccent}
                </span>
              </h3>
              <p className="max-w-md text-sm text-cream-200/60">
                {contactSection.mapBody}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-6 overflow-hidden rounded-4xl border border-cream-100/10">
              <iframe
                src={mapEmbedUrl}
                title={`Google Map showing ${project.name}, ${project.localityShort}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-[340px] w-full grayscale-[0.25] transition-all duration-500 hover:grayscale-0 sm:h-[420px]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

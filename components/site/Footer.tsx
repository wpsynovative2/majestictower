import Image from "next/image";
import { project, contact, footer, navLinks } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import PrivacyLink from "./PrivacyLink";
import { EnquireButton } from "@/components/lead/CtaTriggers";
import { WhatsAppIcon, InstagramIcon, PhoneIcon, MailIcon } from "@/components/ui/Icons";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-950 text-cream-100">
      {/* ------------------------------------------------------- RERA strip */}
      <div className="border-b border-cream-100/8 bg-forest-900/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-8 sm:px-6 md:flex-row md:justify-between lg:px-8">
          <Reveal className="flex items-center gap-5">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-cream-50 p-1.5">
              <Image
                src="/images/Maha Rera Bar Code.png"
                alt={`MahaRERA QR code for registration ${project.rera}`}
                fill
                sizes="80px"
                className="object-contain p-1"
              />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-gold-400 uppercase">
                {project.reraAuthority} Regn. No.
              </p>
              <p className="mt-1 font-display text-2xl text-cream-50">{project.rera}</p>
              <a
                href={project.reraUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-xs text-cream-200/50 underline underline-offset-2 transition-colors hover:text-gold-300"
              >
                maharera.maharashtra.gov.in
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <EnquireButton size="lg" variant="primary" shimmer label="Enquire Now" />
          </Reveal>
        </div>
      </div>

      {/* ------------------------------------------------------------ main */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-20 place-items-center rounded-xl bg-cream-50/95">
                <Image
                  src="/images/Logo.png"
                  alt={`${project.name} logo`}
                  width={140}
                  height={72}
                  className="h-auto w-15 object-contain"
                />
              </span>
              <div>
                <p className="font-display text-xl text-cream-50">{project.name}</p>
                <p className="text-[10px] tracking-[0.2em] text-gold-400 uppercase">
                  by {project.developer}
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-cream-200/55">
              {footer.blurb}
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full border border-cream-100/15 text-cream-200/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-400 hover:text-forest-950"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Patil Builders on Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-cream-100/15 text-cream-200/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-400 hover:text-forest-950"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={contact.emailHref}
                aria-label={`Email ${contact.email}`}
                className="grid h-10 w-10 place-items-center rounded-full border border-cream-100/15 text-cream-200/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-400 hover:text-forest-950"
              >
                <MailIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-gold-400 uppercase">
              Explore
            </p>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-cream-200/60 transition-colors hover:text-cream-50"
                  >
                    <span
                      aria-hidden
                      className="h-px w-0 bg-gold-400 transition-all duration-300 group-hover:w-4"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <PrivacyLink className="text-sm text-cream-200/60 transition-colors hover:text-cream-50" />
              </li>
            </ul>
          </nav>

          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-gold-400 uppercase">
              Sales Lounge
            </p>
            <address className="mt-5 space-y-4 text-sm text-cream-200/60 not-italic">
              <p className="leading-relaxed">{contact.addressFull}</p>
              <a
                href={contact.phoneTel}
                className="flex items-center gap-2 font-semibold text-cream-50 transition-colors hover:text-gold-300"
              >
                <PhoneIcon className="h-4 w-4 text-gold-400" />
                {contact.phoneDisplay}
              </a>
              <a
                href={contact.emailHref}
                className="flex items-center gap-2 transition-colors hover:text-gold-300"
              >
                <MailIcon className="h-4 w-4 text-gold-400" />
                {contact.email}
              </a>
              <div className="space-y-0.5 pt-1">
                {contact.hours.map((slot) => (
                  <p key={slot.days}>
                    <span className="text-cream-200/40">{slot.days} :</span> {slot.time}
                  </p>
                ))}
              </div>
            </address>
          </div>
        </div>

        {/* ------------------------------------------------------ disclaimer */}
        <details className="group mt-12 rounded-3xl border border-cream-100/8 bg-forest-900/40">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-xs font-semibold tracking-[0.16em] text-cream-200/55 uppercase transition-colors hover:text-cream-50">
            Disclaimer
            <span
              aria-hidden
              className="grid h-6 w-6 place-items-center rounded-full border border-cream-100/15 transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="px-5 pb-5 text-[11px] leading-relaxed text-cream-200/40">
            {footer.disclaimer}
          </p>
        </details>
      </div>

      {/* ---------------------------------------------------------- bottom */}
      <div className="border-t border-cream-100/8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-5 text-center text-[11px] text-cream-200/40 sm:flex-row sm:justify-between sm:px-6 sm:text-left lg:px-8">
          <p>{footer.copyright}</p>
          <a
            href={footer.credit.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gold-300"
          >
            {footer.credit.label}
          </a>
        </div>
      </div>
    </footer>
  );
}

import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  lead: string;
  accent: string;
  trail?: string;
  body?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};

/** The shared section header: rule + eyebrow, two-tone serif title, lede. */
export default function SectionHeading({
  eyebrow,
  lead,
  accent,
  trail,
  body,
  tone = "light",
  align = "left",
  className = "",
}: Props) {
  const dark = tone === "dark";
  const centered = align === "center";

  return (
    <div
      className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      <Reveal>
        <span
          className={`inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.24em] uppercase ${
            dark ? "text-gold-400" : "text-gold-600"
          }`}
        >
          <span
            aria-hidden
            className={`h-px w-8 ${dark ? "bg-gold-400/50" : "bg-gold-600/40"}`}
          />
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={80}>
        <h2
          className={`mt-4 font-display text-3xl leading-[1.08] font-light text-balance-tight sm:text-4xl lg:text-[2.9rem] ${
            dark ? "text-cream-50" : "text-forest-900"
          }`}
        >
          {lead}{" "}
          <span
            className={`italic ${dark ? "text-gold-300" : "text-gold-600"}`}
          >
            {accent}
          </span>
          {trail ? ` ${trail}` : null}
        </h2>
      </Reveal>

      {body ? (
        <Reveal delay={150}>
          <p
            className={`mt-5 text-[15px] leading-relaxed ${
              dark ? "text-cream-200/70" : "text-forest-900/65"
            }`}
          >
            {body}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

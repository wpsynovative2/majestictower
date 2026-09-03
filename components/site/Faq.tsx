"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { EnquireButton } from "@/components/lead/CtaTriggers";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-cream-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="FAQ"
              lead="Questions,"
              accent="Answered"
              body="The things buyers ask us most about Majestic Tower. Anything else — just call."
            />
            <Reveal delay={200}>
              <div className="mt-8">
                <EnquireButton
                  label="Ask Your Question"
                  variant="outline"
                  size="md"
                  request={{
                    title: "Ask Us Anything",
                    subtitle:
                      "Send your question along with your contact details and our team will get back to you the same day.",
                  }}
                />
              </div>
            </Reveal>
          </div>

          <dl className="divide-y divide-forest-900/10 border-y border-forest-900/10">
            {faqs.map((faq, index) => {
              const isOpen = open === index;
              return (
                <Reveal key={faq.q} delay={index * 50}>
                  <div>
                    <dt>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${index}`}
                        className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                      >
                        <span
                          className={`font-display text-lg leading-snug transition-colors duration-300 ${
                            isOpen
                              ? "text-gold-600"
                              : "text-forest-900 group-hover:text-clay-500"
                          }`}
                        >
                          {faq.q}
                        </span>
                        <span
                          aria-hidden
                          className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border text-sm transition-all duration-300 ${
                            isOpen
                              ? "rotate-45 border-gold-500 bg-gold-400 text-forest-950"
                              : "border-forest-900/15 text-forest-900/60 group-hover:border-clay-500 group-hover:text-clay-500"
                          }`}
                        >
                          +
                        </span>
                      </button>
                    </dt>
                    <dd
                      id={`faq-panel-${index}`}
                      className={`grid overflow-hidden transition-all duration-400 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] pb-6 opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-xl pr-10 text-sm leading-relaxed text-forest-900/65">
                          {faq.a}
                        </p>
                      </div>
                    </dd>
                  </div>
                </Reveal>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}

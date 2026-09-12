"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What are data brokers?",
    a: "Data brokers are companies that collect your personal information from public records, social media, purchase history, and other sources — then sell it to anyone who pays. There are hundreds of these sites, and most people have no idea they exist.",
  },
  {
    q: "Is the scan really free?",
    a: "Yes. The scan is completely free with no credit card required. You'll see every data broker site where your information appears and what types of data they have. You only pay if you want us to handle the removal process for you.",
  },
  {
    q: "How does the removal process work?",
    a: "When you upgrade to Pro, we send opt-out and data deletion requests to every broker that has your information. Each broker has a different process — some take days, some take weeks. We handle all of it and keep sending requests until your data is removed.",
  },
  {
    q: "Will my data stay removed?",
    a: "Data brokers frequently re-collect and re-list personal information. That's why Pro includes continuous monitoring — we re-scan monthly and re-submit removal requests whenever a broker re-lists you.",
  },
  {
    q: "What information do I need to provide?",
    a: "For the free scan, just your name. For removal, we'll need your name, current address, and email so we can accurately match your records across broker sites and submit opt-out requests on your behalf.",
  },
  {
    q: "How is this different from doing it myself?",
    a: "You can absolutely remove yourself manually — but there are 197+ broker sites, each with a different opt-out process. Most people give up after 3 or 4. We automate the entire process across every broker and keep monitoring so you don't have to.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-4 text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
          Questions
        </h2>
        <p className="mx-auto mb-12 max-w-md text-center text-white/40">
          Everything you need to know about protecting your personal data.
        </p>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/5 bg-ground-50"
            >
              <button
                className="flex w-full items-center justify-between px-6 py-4 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="pr-4 text-sm font-semibold">{faq.q}</span>
                <svg
                  className={`h-4 w-4 shrink-0 text-white/40 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm leading-relaxed text-white/40">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

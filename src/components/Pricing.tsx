"use client";

import { useState } from "react";

export default function Pricing() {
  const [annual, setAnnual] = useState(true);
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: annual ? "annual" : "monthly" }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.detail || data.error || "Something went wrong. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "",
      desc: "See how exposed you are",
      cta: "Start free scan",
      ctaStyle:
        "border border-white/10 bg-transparent text-white hover:bg-white/5",
      href: "#scan",
      features: [
        "Full broker scan (197+ sites)",
        "See which brokers have your data",
        "See what data types are exposed",
        "Exportable report",
      ],
      missing: [
        "Automated removal requests",
        "Continuous monitoring",
        "Re-removal when re-listed",
        "Priority support",
      ],
    },
    {
      name: "Pro",
      price: annual ? "$5.79" : "$6.99",
      period: "/mo",
      desc: "Remove your data and keep it gone",
      cta: loading ? "Loading..." : "Remove my data",
      ctaStyle: "bg-accent text-ground hover:bg-accent-dim",
      popular: true,
      isCheckout: true,
      features: [
        "Everything in Free",
        "Automated opt-out requests",
        "Continuous monitoring (monthly re-scans)",
        "Re-removal when brokers re-list you",
        "Progress dashboard",
        "Priority support",
        "Family plan add-on available",
      ],
      missing: [],
    },
  ];

  return (
    <section id="pricing" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
          Simple, transparent pricing
        </h2>
        <p className="mx-auto mb-10 max-w-md text-center text-white/40">
          Scan free. Only pay if you want us to handle removal.
        </p>

        {/* Toggle */}
        <div className="mb-12 flex items-center justify-center gap-3">
          <span
            className={`text-sm ${!annual ? "text-white" : "text-white/40"}`}
          >
            Monthly
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative h-7 w-12 rounded-full transition-colors ${annual ? "bg-accent" : "bg-white/20"}`}
            aria-label="Toggle billing period"
          >
            <span
              className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition-transform ${annual ? "left-[calc(100%-1.625rem)]" : "left-0.5"}`}
            />
          </button>
          <span
            className={`text-sm ${annual ? "text-white" : "text-white/40"}`}
          >
            Annual
          </span>
          {annual && (
            <span className="rounded-full bg-safe/10 px-2.5 py-0.5 text-xs font-medium text-safe">
              Save 30%
            </span>
          )}
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 ${
                plan.popular
                  ? "border-accent/30 bg-accent/[0.03]"
                  : "border-white/5 bg-ground-50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-ground">
                    Most popular
                  </span>
                </div>
              )}

              <h3 className="mb-1 text-lg font-bold">{plan.name}</h3>
              <p className="mb-4 text-sm text-white/40">{plan.desc}</p>

              <div className="mb-6">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                {plan.period && (
                  <span className="text-white/40">{plan.period}</span>
                )}
                {annual && plan.name === "Pro" && (
                  <p className="mt-1 text-xs text-white/30">
                    $69.42 billed annually
                  </p>
                )}
              </div>

              {plan.isCheckout ? (
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className={`mb-8 block w-full rounded-lg px-6 py-3 text-center text-sm font-semibold transition-colors disabled:opacity-50 ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </button>
              ) : (
                <a
                  href={plan.href || "#scan"}
                  className={`mb-8 block rounded-lg px-6 py-3 text-center text-sm font-semibold transition-colors ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </a>
              )}

              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-safe"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-white/60">{f}</span>
                  </li>
                ))}
                {plan.missing.map((m) => (
                  <li key={m} className="flex items-start gap-2.5 text-sm">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-white/15"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-white/25">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

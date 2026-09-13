"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface SessionInfo {
  status: string;
  customerEmail: string | null;
  customerName: string | null;
}

function SuccessInner() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [step, setStep] = useState<"loading" | "form" | "submitting" | "done">("loading");
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [additionalEmails, setAdditionalEmails] = useState("");

  const verifySession = useCallback(async () => {
    if (!sessionId) {
      setError("No session found. Please try your purchase again.");
      setStep("form");
      return;
    }

    try {
      const res = await fetch(`/api/onboarding?session_id=${sessionId}`);
      const data = await res.json();

      if (data.status === "paid") {
        setSessionInfo(data);
        // Pre-fill name if Stripe collected it
        if (data.customerName) {
          const parts = data.customerName.split(" ");
          setFirstName(parts[0] || "");
          setLastName(parts.slice(1).join(" ") || "");
        }
        setStep("form");
      } else {
        setError("Payment not confirmed yet. Please wait a moment and refresh.");
        setStep("form");
      }
    } catch {
      setError("Could not verify payment. Please contact support.");
      setStep("form");
    }
  }, [sessionId]);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!firstName || !lastName || !address || !city || !state || !zip) {
      setError("Please fill in all required fields.");
      return;
    }

    setStep("submitting");
    setError(null);

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          profile: {
            firstName,
            lastName,
            address,
            city,
            state,
            zip,
            phone,
            dateOfBirth,
            additionalEmails,
          },
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStep("done");
      } else {
        setError(data.detail || data.error || "Failed to save. Please try again.");
        setStep("form");
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setStep("form");
    }
  }

  if (step === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ground">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <p className="text-sm text-white/40">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ground px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-safe/10">
            <svg className="h-8 w-8 text-safe" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="mb-3 text-3xl font-extrabold">We&apos;re on it.</h1>
          <p className="mb-8 text-white/40">
            Your removal profile has been submitted. We&apos;re starting the opt-out
            process across every data broker that has your information.
          </p>

          {sessionInfo?.customerEmail && (
            <p className="mb-6 text-sm text-white/50">
              Confirmation sent to <span className="text-accent">{sessionInfo.customerEmail}</span>
            </p>
          )}

          <div className="rounded-xl border border-white/5 bg-ground-50 p-5 text-left">
            <p className="mb-3 text-xs font-semibold text-white/60">What happens now</p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">1</div>
                <div>
                  <p className="text-sm font-medium">Opt-out requests sent</p>
                  <p className="text-xs text-white/35">We submit removal requests to every broker that has your data. Most brokers process within 1-4 weeks.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">2</div>
                <div>
                  <p className="text-sm font-medium">Removals verified</p>
                  <p className="text-xs text-white/35">We re-check each broker to confirm your data has actually been removed.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">3</div>
                <div>
                  <p className="text-sm font-medium">Continuous monitoring</p>
                  <p className="text-xs text-white/35">Monthly re-scans catch re-listings. If a broker puts your data back, we remove it again automatically.</p>
                </div>
              </div>
            </div>
          </div>

          <a
            href="/"
            className="mt-6 inline-block rounded-lg border border-white/10 px-6 py-3 text-sm text-white/50 transition-colors hover:text-white"
          >
            Back to home
          </a>
        </div>
      </div>
    );
  }

  // Form step
  return (
    <div className="min-h-screen bg-ground px-6 py-12">
      <div className="mx-auto max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-safe/10">
            <svg className="h-6 w-6 text-safe" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mb-2 text-2xl font-extrabold">Payment confirmed!</h1>
          <p className="text-sm text-white/40">
            One last step — we need the information below to find and remove your
            data from broker sites. This is what we&apos;ll use to match your
            records and submit opt-out requests.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-white/50">
                Full name <span className="text-danger">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="rounded-lg border border-white/10 bg-ground-100 px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-accent/50"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="rounded-lg border border-white/10 bg-ground-100 px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-accent/50"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-white/50">
                Current address <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                placeholder="Street address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="mb-3 w-full rounded-lg border border-white/10 bg-ground-100 px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-accent/50"
              />
              <div className="grid grid-cols-6 gap-3">
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="col-span-3 rounded-lg border border-white/10 bg-ground-100 px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-accent/50"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  maxLength={2}
                  className="col-span-1 rounded-lg border border-white/10 bg-ground-100 px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-accent/50"
                />
                <input
                  type="text"
                  placeholder="ZIP"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  required
                  maxLength={10}
                  className="col-span-2 rounded-lg border border-white/10 bg-ground-100 px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-accent/50"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-white/50">
                Phone number
              </label>
              <input
                type="tel"
                placeholder="(555) 555-5555"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-ground-100 px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-accent/50"
              />
              <p className="mt-1 text-xs text-white/25">
                Helps us match your records on broker sites more accurately
              </p>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-white/50">
                Date of birth
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-ground-100 px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-accent/50"
              />
              <p className="mt-1 text-xs text-white/25">
                Some brokers require this to verify your identity for removal
              </p>
            </div>

            {/* Additional emails */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-white/50">
                Additional email addresses
              </label>
              <input
                type="text"
                placeholder="other@email.com, work@email.com"
                value={additionalEmails}
                onChange={(e) => setAdditionalEmails(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-ground-100 px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-accent/50"
              />
              <p className="mt-1 text-xs text-white/25">
                We&apos;ll check for these emails on broker sites too
              </p>
            </div>

            {/* Privacy note */}
            <div className="rounded-lg border border-white/5 bg-ground-50 p-4">
              <div className="flex gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-xs text-white/35">
                  Your information is encrypted and used only for data removal.
                  We never sell, share, or use your data for any other purpose.
                  Ironic if we did, right?
                </p>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={step === "submitting"}
              className="w-full rounded-lg bg-accent py-3.5 text-sm font-semibold text-ground transition-colors hover:bg-accent-dim disabled:opacity-50"
            >
              {step === "submitting" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving...
                </span>
              ) : (
                "Start removing my data"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-ground">
          <p className="text-white/40">Loading...</p>
        </div>
      }
    >
      <SuccessInner />
    </Suspense>
  );
}

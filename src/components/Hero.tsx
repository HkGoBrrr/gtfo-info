"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [state, setState] = useState("");
  const [scanning, setScanning] = useState(false);
  const router = useRouter();

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;
    setScanning(true);
    const params = new URLSearchParams({
      fn: firstName.trim(),
      ln: lastName.trim(),
    });
    if (state.trim()) params.set("st", state.trim());
    router.push(`/scan?${params.toString()}`);
  };

  return (
    <section
      id="scan"
      className="grid-bg relative flex min-h-screen flex-col items-center justify-center px-6 pt-20"
    >
      {/* Radial glow behind hero */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-block rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
          <span className="font-mono text-xs font-medium text-accent">
            197 data brokers are selling your info right now
          </span>
        </div>

        <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          See what the internet
          <br />
          <span className="gradient-text">knows about you</span>
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-lg text-white/50">
          Your name, address, phone number, and family members are for sale on
          hundreds of data broker sites. Scan free. Remove everything.
        </p>

        {/* Scan form */}
        <div className="mx-auto max-w-lg" role="search">
          <div className="scan-input-glow rounded-xl bg-ground-50 p-1.5">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="flex-1 rounded-lg bg-ground-100 px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none"
                  disabled={scanning}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="flex-1 rounded-lg bg-ground-100 px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none"
                  disabled={scanning}
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="State (optional, e.g. TX)"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="flex-1 rounded-lg bg-ground-100 px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none"
                  disabled={scanning}
                  maxLength={2}
                />
              <button
                onClick={handleScan}
                disabled={scanning || !firstName.trim() || !lastName.trim()}
                className="rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-ground transition-all hover:bg-accent-dim disabled:opacity-50"
              >
                {scanning ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Scanning...
                  </span>
                ) : (
                  "Scan free"
                )}
              </button>
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-white/30">
            No email required. Results in seconds.
          </p>
        </div>

        {/* Trust bar */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-white/30">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-safe" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            No credit card needed
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-safe" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            197+ brokers checked
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-safe" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Results in 30 seconds
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-white/10 p-1">
          <div className="h-2 w-1 animate-bounce rounded-full bg-white/30" />
        </div>
      </div>
    </section>
  );
}

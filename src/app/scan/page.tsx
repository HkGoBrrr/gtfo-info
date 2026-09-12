"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { ScanResponse, BrokerResult } from "@/lib/types";

function ScanResultsInner() {
  const searchParams = useSearchParams();
  const firstName = searchParams.get("fn") || "";
  const lastName = searchParams.get("ln") || "";
  const state = searchParams.get("st") || "";

  const [scanData, setScanData] = useState<ScanResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scanPhase, setScanPhase] = useState(0);
  const [filter, setFilter] = useState<"all" | "found" | "coming_soon">("all");

  const phases = [
    "Initializing scan engine...",
    "Checking people search sites...",
    "Scanning background check databases...",
    "Checking public records aggregators...",
    "Compiling exposure report...",
  ];

  const runScan = useCallback(async () => {
    if (!firstName || !lastName) {
      setError("Missing name. Please go back and try again.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Animate through phases
    for (let i = 0; i < phases.length - 1; i++) {
      setScanPhase(i);
      await new Promise((r) => setTimeout(r, 800 + Math.random() * 400));
    }
    setScanPhase(phases.length - 1);

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, state: state || undefined }),
      });

      if (!res.ok) throw new Error("Scan failed");

      const data: ScanResponse = await res.json();
      setScanData(data);
    } catch {
      setError("Scan failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [firstName, lastName, state]);

  useEffect(() => {
    runScan();
  }, [runScan]);

  if (loading) {
    return <LoadingState phase={phases[scanPhase]} progress={(scanPhase + 1) / phases.length} />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <p className="mb-4 text-lg text-danger">{error}</p>
          <a href="/" className="text-accent hover:underline">Go back</a>
        </div>
      </div>
    );
  }

  if (!scanData) return null;

  const foundResults = scanData.results.filter((r) => r.status === "found");
  const comingSoonResults = scanData.results.filter((r) => r.status === "coming_soon");

  const filtered =
    filter === "found"
      ? foundResults
      : filter === "coming_soon"
        ? comingSoonResults
        : scanData.results;

  const riskColor =
    scanData.summary.riskLevel === "critical" || scanData.summary.riskLevel === "high"
      ? "text-danger"
      : scanData.summary.riskLevel === "medium"
        ? "text-warn"
        : "text-safe";

  return (
    <div className="min-h-screen bg-ground px-6 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight">
              <span className="gradient-text">GTFO</span>
              <span className="text-white/40">.info</span>
            </span>
          </a>
          <a
            href="/"
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            New scan
          </a>
        </div>

        {/* Summary cards */}
        <div className="mb-6 rounded-2xl border border-white/5 bg-ground-50 p-6">
          <div className="mb-4">
            <p className="text-sm text-white/40">Scan results for</p>
            <h1 className="text-2xl font-extrabold">
              {firstName} {lastName}
              {state && <span className="ml-2 text-sm font-normal text-white/30">{state}</span>}
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl bg-ground-100 p-4">
              <p className="text-xs text-white/40">Brokers checked</p>
              <p className="text-2xl font-bold">{scanData.summary.totalChecked}</p>
            </div>
            <div className="rounded-xl bg-ground-100 p-4">
              <p className="text-xs text-white/40">Found your data</p>
              <p className="text-2xl font-bold text-danger">{scanData.summary.totalFound}</p>
            </div>
            <div className="rounded-xl bg-ground-100 p-4">
              <p className="text-xs text-white/40">Data points exposed</p>
              <p className="text-2xl font-bold text-warn">{scanData.summary.dataPointsExposed}</p>
            </div>
            <div className="rounded-xl bg-ground-100 p-4">
              <p className="text-xs text-white/40">Risk level</p>
              <p className={`text-2xl font-bold capitalize ${riskColor}`}>
                {scanData.summary.riskLevel}
              </p>
            </div>
          </div>
        </div>

        {/* Coming soon banner */}
        <div className="mb-6 rounded-xl border border-accent/20 bg-accent/5 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-accent">
                +{scanData.summary.totalComingSoon} more brokers coming soon
              </p>
              <p className="text-xs text-white/40">
                We&apos;re building automated checkers for {scanData.summary.totalComingSoon} additional data broker
                sites. These brokers are known to sell personal data and will be included in future scans.
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
              Roadmap
            </span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="mb-4 flex gap-2">
          {[
            { key: "all", label: `All (${scanData.results.length})` },
            { key: "found", label: `Found (${foundResults.length})` },
            { key: "coming_soon", label: `Coming soon (${comingSoonResults.length})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as typeof filter)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === tab.key
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results list */}
        <div className="space-y-3">
          {filtered.map((result) => (
            <BrokerCard key={result.brokerId} result={result} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 rounded-2xl border border-accent/20 bg-accent/[0.03] p-8 text-center">
          <h2 className="mb-2 text-xl font-extrabold">
            Want this data removed?
          </h2>
          <p className="mb-6 text-sm text-white/40">
            Upgrade to Pro and we&apos;ll send opt-out requests to every broker that has your
            information, then monitor and re-remove when they re-list you.
          </p>
          <a
            href="/#pricing"
            className="inline-block rounded-lg bg-accent px-8 py-3 text-sm font-semibold text-ground transition-colors hover:bg-accent-dim"
          >
            Remove my data — $6.99/mo
          </a>
        </div>
      </div>
    </div>
  );
}

function BrokerCard({ result }: { result: BrokerResult }) {
  const [expanded, setExpanded] = useState(false);
  const isFound = result.status === "found";
  const isComingSoon = result.status === "coming_soon";

  return (
    <div
      className={`rounded-xl border p-4 transition-colors ${
        isComingSoon
          ? "border-white/5 bg-ground-50/50 opacity-60"
          : "border-white/5 bg-ground-50"
      }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`h-2.5 w-2.5 shrink-0 rounded-full ${
              isFound ? "bg-danger" : isComingSoon ? "bg-white/20" : "bg-safe"
            }`}
          />
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold">{result.brokerName}</p>
              {isComingSoon && (
                <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/40">
                  coming soon
                </span>
              )}
            </div>
            <p className="text-xs text-white/30">{result.brokerType}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex flex-wrap gap-1">
            {result.dataTypes.slice(0, 4).map((dt) => (
              <span
                key={dt}
                className={`rounded px-2 py-0.5 font-mono text-[10px] ${
                  isFound
                    ? "bg-danger/10 text-danger"
                    : "bg-white/5 text-white/30"
                }`}
              >
                {dt}
              </span>
            ))}
            {result.dataTypes.length > 4 && (
              <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/30">
                +{result.dataTypes.length - 4}
              </span>
            )}
          </div>
          {isFound && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="ml-2 rounded-lg border border-white/10 px-3 py-1 text-xs text-white/50 transition-colors hover:text-white"
            >
              {expanded ? "Less" : "Details"}
            </button>
          )}
        </div>
      </div>

      {expanded && isFound && (
        <div className="mt-4 border-t border-white/5 pt-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {result.profileUrl && (
              <a
                href={result.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-ground-100 px-4 py-3 text-sm text-white/60 transition-colors hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View your profile on {result.brokerName}
              </a>
            )}
            {result.optOutUrl && (
              <a
                href={result.optOutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-accent/10 px-4 py-3 text-sm text-accent transition-colors hover:bg-accent/20"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Opt out manually
              </a>
            )}
          </div>
          <p className="mt-3 text-xs text-white/25">
            Data types found: {result.dataTypes.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}

function LoadingState({ phase, progress }: { phase: string; progress: number }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        {/* Animated radar/scan circle */}
        <div className="relative mx-auto mb-8 h-32 w-32">
          <div className="absolute inset-0 rounded-full border border-accent/20" />
          <div className="absolute inset-3 rounded-full border border-accent/15" />
          <div className="absolute inset-6 rounded-full border border-accent/10" />
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent"
            style={{ animation: "spin 1.5s linear infinite" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-xl font-bold text-accent">
              {Math.round(progress * 100)}%
            </span>
          </div>
        </div>

        <p className="mb-4 font-mono text-sm text-accent animate-scan-pulse">{phase}</p>

        {/* Progress bar */}
        <div className="mx-auto h-1 w-64 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-accent transition-all duration-700"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <p className="mt-4 text-xs text-white/30">
          Checking data broker sites for your personal information...
        </p>

        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}

export default function ScanPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-white/40">Loading...</p>
        </div>
      }
    >
      <ScanResultsInner />
    </Suspense>
  );
}

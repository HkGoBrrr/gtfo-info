"use client";

import { useState } from "react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-ground/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight">
            <span className="gradient-text">GTFO</span>
            <span className="text-white/40">.info</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#how-it-works"
            className="text-sm text-white/50 transition-colors hover:text-white"
          >
            How it works
          </a>
          <a
            href="#exposure"
            className="text-sm text-white/50 transition-colors hover:text-white"
          >
            Your exposure
          </a>
          <a
            href="#pricing"
            className="text-sm text-white/50 transition-colors hover:text-white"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="text-sm text-white/50 transition-colors hover:text-white"
          >
            FAQ
          </a>
          <a
            href="#scan"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-ground transition-colors hover:bg-accent-dim"
          >
            Free scan
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white/60 transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white/60 transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white/60 transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/5 bg-ground-50 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <a
              href="#how-it-works"
              className="text-sm text-white/60"
              onClick={() => setMenuOpen(false)}
            >
              How it works
            </a>
            <a
              href="#exposure"
              className="text-sm text-white/60"
              onClick={() => setMenuOpen(false)}
            >
              Your exposure
            </a>
            <a
              href="#pricing"
              className="text-sm text-white/60"
              onClick={() => setMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="text-sm text-white/60"
              onClick={() => setMenuOpen(false)}
            >
              FAQ
            </a>
            <a
              href="#scan"
              className="rounded-lg bg-accent px-4 py-2 text-center text-sm font-semibold text-ground"
              onClick={() => setMenuOpen(false)}
            >
              Free scan
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <span className="text-lg font-extrabold tracking-tight">
              <span className="gradient-text">GTFO</span>
              <span className="text-white/40">.info</span>
            </span>
            <p className="mt-1 text-xs text-white/30">
              Take back your personal data.
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-white/30 transition-colors hover:text-white/60"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-white/30 transition-colors hover:text-white/60"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-xs text-white/30 transition-colors hover:text-white/60"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-6 text-center">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} GTFO.info. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ground px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-safe/10">
          <svg
            className="h-8 w-8 text-safe"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="mb-3 text-3xl font-extrabold">You&apos;re in.</h1>
        <p className="mb-8 text-white/40">
          Your GTFO Pro subscription is active. We&apos;re already starting the
          removal process across every data broker that has your information.
          You&apos;ll receive an email with your account details and a link to your
          progress dashboard.
        </p>

        <div className="space-y-3">
          <a
            href="/"
            className="block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-ground transition-colors hover:bg-accent-dim"
          >
            Back to home
          </a>
        </div>

        <div className="mt-8 rounded-xl border border-white/5 bg-ground-50 p-4 text-left">
          <p className="mb-2 text-xs font-semibold text-white/60">
            What happens next
          </p>
          <ul className="space-y-2 text-xs text-white/40">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-accent">1.</span>
              We send opt-out requests to every broker with your data
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-accent">2.</span>
              Removals typically take 1-4 weeks depending on the broker
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-accent">3.</span>
              We re-scan monthly and re-remove if any broker re-lists you
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

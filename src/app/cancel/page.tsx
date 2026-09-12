export default function CancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ground px-6">
      <div className="max-w-md text-center">
        <h1 className="mb-3 text-2xl font-extrabold">No worries.</h1>
        <p className="mb-8 text-white/40">
          Your free scan results are still available. You can come back and
          upgrade to Pro anytime to start the removal process.
        </p>

        <div className="space-y-3">
          <a
            href="/#pricing"
            className="block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-ground transition-colors hover:bg-accent-dim"
          >
            View pricing again
          </a>
          <a
            href="/"
            className="block rounded-lg border border-white/10 px-6 py-3 text-sm text-white/50 transition-colors hover:text-white"
          >
            Back to home
          </a>
        </div>
      </div>
    </div>
  );
}

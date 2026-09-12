export default function FinalCTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl rounded-2xl border border-accent/20 bg-accent/[0.03] p-12 text-center">
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Your data is out there right now
        </h2>
        <p className="mx-auto mb-8 max-w-md text-white/40">
          Every day you wait is another day your personal information is
          available to anyone with a search engine. Scan takes 30 seconds.
        </p>
        <a
          href="#scan"
          className="inline-block rounded-lg bg-accent px-8 py-4 text-sm font-semibold text-ground transition-colors hover:bg-accent-dim"
        >
          Scan my data free
        </a>
      </div>
    </section>
  );
}

export default function ScanPreview() {
  const exposedData = [
    {
      broker: "Spokeo",
      type: "People search",
      found: ["Full name", "Address", "Phone", "Email", "Relatives"],
      risk: "high",
    },
    {
      broker: "BeenVerified",
      type: "Background check",
      found: ["Full name", "Address history", "Phone", "Associates"],
      risk: "high",
    },
    {
      broker: "Whitepages",
      type: "People search",
      found: ["Full name", "Current address", "Phone"],
      risk: "medium",
    },
    {
      broker: "Radaris",
      type: "People search",
      found: ["Full name", "Address", "Phone", "Property records"],
      risk: "high",
    },
    {
      broker: "TruePeopleSearch",
      type: "People search",
      found: ["Full name", "Address", "Phone", "Relatives"],
      risk: "medium",
    },
    {
      broker: "FastPeopleSearch",
      type: "People search",
      found: ["Full name", "Address", "Phone"],
      risk: "medium",
    },
  ];

  return (
    <section id="scan-results" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 text-center">
          <span className="font-mono text-xs font-medium text-warn">
            Example scan result
          </span>
        </div>
        <h2 className="mb-4 text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
          This is what a scan looks like
        </h2>
        <p className="mx-auto mb-12 max-w-lg text-center text-white/40">
          A real scan checks 197+ data broker sites and shows you everywhere
          your personal information is exposed and for sale.
        </p>

        {/* Mock results card */}
        <div className="rounded-2xl border border-white/5 bg-ground-50 p-6 sm:p-8">
          {/* Summary bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-ground-100 p-4">
            <div>
              <p className="text-sm text-white/40">Records found on</p>
              <p className="text-2xl font-bold text-danger">
                47 broker sites
              </p>
            </div>
            <div>
              <p className="text-sm text-white/40">Data points exposed</p>
              <p className="text-2xl font-bold text-warn">156</p>
            </div>
            <div>
              <p className="text-sm text-white/40">Risk level</p>
              <p className="text-2xl font-bold text-danger">High</p>
            </div>
          </div>

          {/* Broker list */}
          <div className="space-y-3">
            {exposedData.map((item) => (
              <div
                key={item.broker}
                className="flex flex-col justify-between gap-3 rounded-lg border border-white/5 bg-ground-100 p-4 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      item.risk === "high" ? "bg-danger" : "bg-warn"
                    }`}
                  />
                  <div>
                    <p className="font-semibold text-white">{item.broker}</p>
                    <p className="text-xs text-white/30">{item.type}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.found.map((d) => (
                    <span
                      key={d}
                      className="rounded bg-danger/10 px-2 py-0.5 font-mono text-xs text-danger"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Blurred remaining */}
          <div className="relative mt-3">
            <div className="space-y-3 blur-sm select-none">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-ground-100 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-warn" />
                    <div>
                      <div className="h-4 w-28 rounded bg-white/10" />
                      <div className="mt-1 h-3 w-20 rounded bg-white/5" />
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="h-5 w-16 rounded bg-white/5" />
                    <div className="h-5 w-12 rounded bg-white/5" />
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="rounded-lg bg-ground-50 px-4 py-2 text-sm font-medium text-white/60 ring-1 ring-white/10">
                +41 more brokers found
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <a
              href="#pricing"
              className="inline-block rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-ground transition-colors hover:bg-accent-dim"
            >
              Remove my data
            </a>
            <p className="mt-2 text-xs text-white/30">
              Free scan shows all results. Paid plan handles removal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

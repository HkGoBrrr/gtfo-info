export default function Exposure() {
  const categories = [
    {
      label: "Home addresses",
      detail: "Current and past addresses, sometimes with photos of your home",
      icon: "🏠",
    },
    {
      label: "Phone numbers",
      detail: "Cell, landline, and sometimes work numbers",
      icon: "📱",
    },
    {
      label: "Email addresses",
      detail: "Personal and work emails linked to your name",
      icon: "📧",
    },
    {
      label: "Family & relatives",
      detail: "Names and relationships of your family members",
      icon: "👥",
    },
    {
      label: "Financial records",
      detail: "Property ownership, estimated net worth, bankruptcies",
      icon: "💰",
    },
    {
      label: "Court records",
      detail: "Civil cases, criminal records, traffic violations",
      icon: "⚖️",
    },
    {
      label: "Social profiles",
      detail: "Linked social media accounts and usernames",
      icon: "🔗",
    },
    {
      label: "Employment history",
      detail: "Current and past employers, job titles",
      icon: "💼",
    },
  ];

  return (
    <section id="exposure" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
          What data brokers sell about you
        </h2>
        <p className="mx-auto mb-16 max-w-lg text-center text-white/40">
          Data brokers collect, package, and sell your personal information to
          anyone willing to pay. Here&apos;s what they typically have on file.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="card-hover rounded-xl border border-white/5 bg-ground-50 p-5"
            >
              <div className="mb-3 text-2xl">{cat.icon}</div>
              <h3 className="mb-1 text-sm font-semibold">{cat.label}</h3>
              <p className="text-xs leading-relaxed text-white/35">
                {cat.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#scan"
            className="inline-block rounded-lg border border-accent/30 bg-accent/5 px-6 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
          >
            Check my exposure free
          </a>
        </div>
      </div>
    </section>
  );
}

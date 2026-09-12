# GTFO.info

**See what the internet knows about you.** Free personal data scan across 24+ data broker sites (and growing). Find out who's selling your information, then remove yourself.

![License](https://img.shields.io/badge/license-MIT-blue)

## What is this?

Data brokers collect and sell your personal information — your name, address, phone number, family members, and more — to anyone who pays. Most people have no idea this is happening.

**GTFO.info** scans data broker sites, shows you exactly where your data is exposed, and (on the Pro tier) handles removal requests on your behalf.

### Free tier
- Scan 24+ data broker sites instantly
- See which brokers have your data
- Direct links to view your profiles
- Direct links to opt-out pages

### Pro tier ($6.99/mo)
- Automated opt-out requests sent on your behalf
- Continuous monthly re-scanning
- Re-removal when brokers re-list you
- Progress dashboard
- Priority support

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel

## Getting Started

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/gtfo-info.git
cd gtfo-info

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Project Structure

```
src/
├── app/
│   ├── api/scan/       # Scan API endpoint
│   ├── scan/           # Scan results page
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Landing page
├── components/
│   ├── Nav.tsx          # Navigation bar
│   ├── Hero.tsx         # Hero section with scan form
│   ├── ScanPreview.tsx  # Example scan results
│   ├── HowItWorks.tsx   # 3-step explainer
│   ├── Exposure.tsx     # Data types grid
│   ├── Pricing.tsx      # Free/Pro pricing cards
│   ├── FAQ.tsx          # FAQ accordion
│   ├── FinalCTA.tsx     # Bottom CTA section
│   └── Footer.tsx       # Site footer
└── lib/
    ├── brokers.ts       # Broker database (24+ sites)
    └── types.ts         # Shared TypeScript types
```

## Broker Coverage

Currently checking **10 live brokers** with direct profile links and opt-out URLs:
Spokeo, Whitepages, TruePeopleSearch, FastPeopleSearch, BeenVerified, Radaris, Intelius, Instant Checkmate, USSearch, PeopleFinder

**14 more brokers** on the roadmap with checkers in development.

## Roadmap

- [ ] Real-time HTTP verification of broker profiles
- [ ] Email-based scan reports
- [ ] Automated opt-out submission engine
- [ ] User accounts and progress dashboard
- [ ] Stripe payment integration
- [ ] Continuous monitoring (monthly re-scans)
- [ ] Family plan support
- [ ] Browser extension

## License

MIT — see [LICENSE](LICENSE) for details.

## Built for

Backlog Hackathon — the idea you've had sitting in your backlog forever, built in 48 hours.

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GTFO Info — See What the Internet Knows About You",
  description:
    "Your name, address, phone number, and family members are for sale on 197+ data broker sites right now. Scan free in 30 seconds — no email or credit card required. See exactly who has your data, then remove it.",
  metadataBase: new URL("https://gtfoinfo.com"),
  openGraph: {
    title: "GTFO Info — Your Personal Data Is For Sale",
    description:
      "197+ data brokers are selling your name, address, phone number, and family info to anyone who pays. Free scan shows you everything. Remove it all with one click.",
    url: "https://gtfoinfo.com",
    siteName: "GTFO Info",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GTFO Info — Your Personal Data Is For Sale",
    description:
      "197+ data brokers are selling your personal information right now. Free scan shows you everything. Remove it all with one click.",
  },
  keywords: [
    "data removal",
    "personal data",
    "data broker",
    "privacy",
    "opt out",
    "remove my information",
    "people search removal",
    "Spokeo removal",
    "Whitepages removal",
    "data broker opt out",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

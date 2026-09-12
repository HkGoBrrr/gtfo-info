import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GTFO.info — See What the Internet Knows About You",
  description:
    "Free personal data scan. See every data broker selling your information, then remove yourself with one click.",
  openGraph: {
    title: "GTFO.info — See What the Internet Knows About You",
    description:
      "Free personal data scan. See every data broker selling your information, then remove yourself with one click.",
    url: "https://gtfoinfo.com",
    siteName: "GTFO Info",
    type: "website",
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

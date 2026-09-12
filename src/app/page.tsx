import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ScanPreview from "@/components/ScanPreview";
import HowItWorks from "@/components/HowItWorks";
import Exposure from "@/components/Exposure";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <ScanPreview />
      <HowItWorks />
      <Exposure />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}

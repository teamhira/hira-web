"use client";

import { Navbar } from "./_components/navbar";
import { Hero } from "./_components/hero";
import { About } from "./_components/about";
import { Features } from "./_components/features";
import { FeatureGrid } from "./_components/feature-grid";
import { Videos } from "./_components/videos";
import { HowItWorks } from "./_components/how-it-works";
import { WaitingList } from "./_components/waiting-list";
import { FeatureShowcase } from "./_components/feature-showcase";
import { Footer } from "./_components/footer";

export default function LandingPage() {
  return (
    <main className="relative bg-black">
      <Navbar />
      
      <Hero />
      
      <About />
      
      <Features />

      <FeatureShowcase />

      <FeatureGrid />
      
      <Videos />
      
      <HowItWorks />
      
      <WaitingList />
      
      <Footer />
    </main>
  );
}

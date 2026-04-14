"use client";

import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";
import { WaitingList } from "../_components/waiting-list";
import { AboutHero } from "./_components/hero";
import { AboutStory } from "./_components/story";
import { AboutVisionMission } from "./_components/vision-mission";
import { AboutFeatures } from "./_components/features";
import { AboutPhilosophy } from "./_components/philosophy";
import { AboutFuture } from "./_components/future";

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen text-white antialiased">
      <Navbar />
      
      <AboutHero />
      <AboutStory />
      <AboutVisionMission />
      <AboutFeatures />
      <AboutPhilosophy />
      <AboutFuture />

      <WaitingList />
      <Footer />
    </main>
  );
}

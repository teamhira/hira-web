"use client";

import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";
import { PrivacyHero } from "./_components/hero";
import { PrivacyContent } from "./_components/content";

export default function PrivacyPage() {
  return (
    <main className="bg-black min-h-screen text-white antialiased">
      <Navbar />
      
      <PrivacyHero />
      <PrivacyContent />

      <Footer />
    </main>
  );
}

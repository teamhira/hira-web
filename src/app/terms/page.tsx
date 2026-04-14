"use client";

import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";
import { TermsHero } from "./_components/hero";
import { TermsContent } from "./_components/content";

export default function TermsPage() {
  return (
    <main className="bg-black min-h-screen text-white antialiased">
      <Navbar />
      
      <TermsHero />
      <TermsContent />

      <Footer />
    </main>
  );
}

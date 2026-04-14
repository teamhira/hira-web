"use client";

import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";
import { ContactHero } from "./_components/hero";
import { ContactInfo } from "./_components/info";
import { ContactForm } from "./_components/form";

export default function ContactPage() {
  return (
    <main className="bg-black min-h-screen text-white antialiased">
      <Navbar />
      
      <ContactHero />
      <ContactForm />
      <ContactInfo />

      <Footer />
    </main>
  );
}

"use client";

import { Navbar } from "./_components/navbar";
import { Hero } from "./_components/hero";
import { About } from "./_components/about";
import { Features } from "./_components/features";
import { FeatureGrid } from "./_components/feature-grid";
import { Videos } from "./_components/videos";
import { HowItWorks } from "./_components/how-it-works";
import { WaitingList } from "./_components/waiting-list";
import { Footer } from "./_components/footer";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { motion } from "motion/react";

import Image from "next/image";

const stickyContent = [
  {
    title: "Premium Quran Experience",
    description: "Read and reflect with a clean, modern interface. Access multiple translations, tajweed guides, and audio recitations from the world's most renowned qaris.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white overflow-hidden">
        <Image 
          src="/assets/features/quran-surah-list.png" 
          alt="Quran Interface" 
          fill 
          sizes="(max-width: 1024px) 100vw, 400px"
          className="object-cover" 
        />
      </div>
    ),
  },
  {
    title: "Digital Tasbih & Dhikr",
    description: "Keep track of your daily remembrances with our intuitive digital counter. Set goals, receive gentle reminders, and cultivate a consistent habit of dhikr.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white overflow-hidden">
        <Image 
          src="/assets/features/tasbih.png" 
          alt="Tasbih Feature" 
          fill 
          sizes="(max-width: 1024px) 100vw, 400px"
          className="object-cover" 
        />
      </div>
    ),
  },
  {
    title: "Impactful Charity Tracking",
    description: "Manage your zakat and sadaqah in one place. Discover verified causes, set recurring donations, and visualize the impact of your contributions.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white overflow-hidden">
        <Image 
          src="/assets/features/charity.png" 
          alt="Charity Management" 
          fill 
          sizes="(max-width: 1024px) 100vw, 400px"
          className="object-cover" 
        />
      </div>
    ),
  },
  {
    title: "Personalized Hijrah Dashboard",
    description: "Your spiritual journey, mapped. Track your daily habits, visualize your growth patterns, and stay motivated on your path to becoming your best self.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white overflow-hidden">
        <Image 
          src="/assets/features/hijrah-dashboard.png" 
          alt="Hijrah Dashboard" 
          fill 
          sizes="(max-width: 1024px) 100vw, 400px"
          className="object-cover" 
        />
      </div>
    ),
  },
];

export default function LandingPage() {
  return (
    <main className="relative bg-black">
      <Navbar />
      
      <Hero />
      
      <About />
      
      <Features />

      {/* Product Showcase with Sticky Scroll */}
      <section className="bg-black">
        <StickyScroll content={stickyContent} />
      </section>

      <FeatureGrid />
      
      <Videos />
      
      <HowItWorks />
      
      <WaitingList />
      
      <Footer />
    </main>
  );
}

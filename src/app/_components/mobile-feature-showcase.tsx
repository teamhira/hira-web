"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FeatureItem {
  title: string;
  description: string;
  image: string;
  gradient: string;
}

const features: FeatureItem[] = [
  {
    title: "Premium Quran Experience",
    description: "Read and reflect with a clean, modern interface. Access multiple translations, tajweed guides, and audio recitations.",
    image: "/assets/features/quran-surah-list.png",
    gradient: "from-emerald-500/10 to-teal-500/10"
  },
  {
    title: "Digital Tasbih & Dhikr",
    description: "Keep track of your daily remembrances with our intuitive digital counter. Set goals and receive reminders.",
    image: "/assets/features/tasbih.png",
    gradient: "from-blue-500/10 to-emerald-500/10"
  },
  {
    title: "Impactful Charity Tracking",
    description: "Manage your zakat and sadaqah in one place. Discover verified causes and visualize your impact.",
    image: "/assets/features/charity.png",
    gradient: "from-teal-500/10 to-teal-600/10"
  },
  {
    title: "Personalized Hijrah Dashboard",
    description: "Your spiritual journey, mapped. Track your daily habits and visualize your growth patterns.",
    image: "/assets/features/hijrah-dashboard.png",
    gradient: "from-emerald-600/10 to-emerald-400/10"
  }
];

function FeatureCard({ feature, index }: { feature: FeatureItem, index: number }) {
  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 sticky top-0 bg-black overflow-hidden"
      style={{ zIndex: index + 1 }}
    >
      {/* Dynamic Background Glow - Optimized */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-b opacity-50 pointer-events-none",
        feature.gradient
      )} />
      
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-teal-500/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.7, 
          ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for smoother feel
        }}
        viewport={{ once: true, margin: "-50px" }}
        className="relative z-10 w-full max-w-sm flex flex-col items-center will-change-transform"
      >
        {/* Text Content */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-medium uppercase tracking-widest mb-4"
          >
            Module 0{index + 1}
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight leading-tight">
            {feature.title}
          </h2>
          <p className="text-zinc-400 leading-relaxed text-sm max-w-[300px] mx-auto">
            {feature.description}
          </p>
        </div>

        {/* Phone Frame - High Performance */}
        <div className="relative w-[200px] aspect-[9/18.5]">
          <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full" />
          
          <div className="relative h-full w-full bg-[#050505] rounded-[2.5rem] border-[6px] border-[#1a1a1a] shadow-2xl overflow-hidden ring-1 ring-white/10">
            {/* Minimalist Notch */}
            <div className="absolute top-0 inset-x-0 h-6 flex items-center justify-center z-20">
              <div className="w-12 h-3.5 bg-black rounded-b-xl" />
            </div>

            <div className="relative h-full w-full">
              <Image 
                src={feature.image} 
                alt={feature.title}
                fill
                sizes="200px"
                className="object-cover object-top"
                priority={index === 0}
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
          
          {/* Side Accents */}
          <div className="absolute -left-1.5 top-24 w-1 h-8 bg-zinc-800/80 rounded-l-md" />
          <div className="absolute -right-1.5 top-32 w-1 h-16 bg-zinc-800/80 rounded-r-md" />
        </div>
      </motion.div>
      
      {/* Scroll indicator for the stack */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1 z-20">
        {features.map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "w-1 h-1 rounded-full transition-all duration-500",
              i === index ? "w-4 bg-emerald-500" : "bg-white/20"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function MobileFeatureShowcase() {
  return (
    <div className="relative bg-black">
      {features.map((feature, i) => (
        <FeatureCard key={feature.title} feature={feature} index={i} />
      ))}
    </div>
  );
}



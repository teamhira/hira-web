"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
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
    gradient: "from-cyan-500/20 to-emerald-500/20"
  },
  {
    title: "Digital Tasbih & Dhikr",
    description: "Keep track of your daily remembrances with our intuitive digital counter. Set goals and receive reminders.",
    image: "/assets/features/tasbih.png",
    gradient: "from-emerald-500/20 to-teal-500/20"
  },
  {
    title: "Impactful Charity Tracking",
    description: "Manage your zakat and sadaqah in one place. Discover verified causes and visualize your impact.",
    image: "/assets/features/charity.png",
    gradient: "from-teal-500/20 to-emerald-600/20"
  },
  {
    title: "Personalized Hijrah Dashboard",
    description: "Your spiritual journey, mapped. Track your daily habits and visualize your growth patterns.",
    image: "/assets/features/hijrah-dashboard.png",
    gradient: "from-emerald-600/20 to-emerald-400/20"
  }
];

function FeatureCard({ feature, index }: { feature: FeatureItem, index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [45, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center px-6 py-20 sticky top-0 bg-black rounded-t-[3rem] border-t border-white/10 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
      <motion.div
        style={{ 
          scale, 
          opacity: 1, // Keep solid opacity
          rotateX,
          perspective: "1000px",
          y
        }}
        className="w-full max-w-sm flex flex-col items-center"
      >
        {/* Glow Effect */}
        <div className={cn(
          "absolute -inset-10 bg-gradient-to-b blur-[80px] rounded-full -z-10 transition-colors duration-1000",
          feature.gradient
        )} />

        {/* Text Content */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-white mb-4 tracking-tight"
          >
            {feature.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/60 leading-relaxed text-sm"
          >
            {feature.description}
          </motion.p>
        </div>

        {/* Phone Frame */}
        <div className="relative w-[12rem] aspect-[9/19.5] group">
          <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-[2.5rem] group-hover:bg-emerald-500/40 transition-all duration-700" />
          <div className="relative h-full w-full bg-black rounded-[2rem] border-[5px] border-zinc-900 shadow-2xl overflow-hidden ring-1 ring-white/10">
            <div className="relative h-full w-full">
              <Image 
                src={feature.image} 
                alt={feature.title}
                fill
                sizes="300px"
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function MobileFeatureShowcase() {
  return (
    <div className="relative bg-black pb-20 overflow-visible">
      {features.map((feature, i) => (
        <FeatureCard key={feature.title} feature={feature} index={i} />
      ))}
    </div>
  );
}

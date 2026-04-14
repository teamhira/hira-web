"use client";

import { motion } from "motion/react";
import { Spotlight } from "@/components/ui/spotlight";

export function PrivacyHero() {
  return (
    <section className="relative min-h-[40vh] flex items-center pt-32 overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#10b981" />
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          Privacy <span className="text-emerald-500">Policy.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-white/50 uppercase tracking-widest font-medium"
        >
          Effective Date: April 14, 2024
        </motion.p>
      </div>
    </section>
  );
}

"use client";

import { motion } from "motion/react";
import { Spotlight } from "@/components/ui/spotlight";

export function ContactHero() {
  return (
    <section className="relative min-h-[50vh] flex items-center pt-32 overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#10b981" />
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-bold tracking-tight mb-8"
        >
          Contact <span className="text-emerald-500">Hira.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto leading-relaxed"
        >
          We&apos;d love to hear from you. Whether you have questions, feedback, or partnership inquiries, feel free to reach out.
        </motion.p>
      </div>
    </section>
  );
}

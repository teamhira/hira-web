"use client";

import { motion } from "motion/react";

export function DemoHero() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-emerald-500/10 blur-[60px] md:blur-[120px] rounded-full" />
        <div className="absolute top-20 right-1/4 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-teal-500/10 blur-[50px] md:blur-[100px] rounded-full" />
      </div>

      <div className="container px-6 mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
            Video Showcase
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent leading-[1.1]">
            Watch Hira <br className="hidden sm:block" /> in Action
          </h1>
          <p className="text-zinc-400 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Explore our comprehensive library of video demos covering everything from 
            technical architecture to daily feature walkthroughs.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

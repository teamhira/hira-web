"use client";

import { WavyBackground } from "@/components/ui/wavy-background";
import { motion } from "motion/react";
import { useScrollAnimation } from "../_hooks/use-scroll-animation";

export function About() {
  const { fadeInUp } = useScrollAnimation();

  return (
    <section id="about" className="relative h-screen overflow-hidden">
      <WavyBackground 
        className="max-w-4xl mx-auto pb-40" 
        backgroundFill="#000000" 
        speed="fast"
        colors={["#064e3b", "#065f46", "#047857", "#059669", "#10b981"]}
        waveOpacity={0.4}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp as any}
          className="text-center px-6"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            A Modern Approach to <br />
            <span className="text-emerald-500">Spiritual Consistency</span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Hira is designed for the modern Muslim who seeks a deeper connection with their faith 
            without the overwhelming complexity. We combine beautiful design with thoughtful features 
            to help you stay consistent in your daily spiritual journey.
          </p>
        </motion.div>
      </WavyBackground>
    </section>
  );
}

"use client";

import { motion } from "motion/react";
import { StoryImages } from "./story-images";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export function AboutStory() {
  return (
    <section className="py-24 border-t border-white/5 bg-white/[0.01]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp as any}
          >
            <h2 className="text-sm uppercase tracking-[0.3em] text-emerald-500 font-bold mb-6">Why Hira Exists</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Designed for natural, accessible, and consistent growth.
            </h3>
            <div className="space-y-6 text-lg text-white/50 leading-relaxed">
              <p>
                Hira was created with a simple belief — that building a meaningful spiritual life should feel natural, accessible, and consistent.
              </p>
              <p>
                In today’s fast-paced world, staying connected to what truly matters can be challenging. Many tools exist, but they are often fragmented, complex, or not designed for everyday use.
              </p>
              <p>
                Hira brings everything into one place — thoughtfully designed to support your journey with clarity and intention.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/10 blur-[120px] rounded-full -z-10" />
            <StoryImages />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

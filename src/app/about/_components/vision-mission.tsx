"use client";

import { motion } from "motion/react";
import { IconTarget, IconRocket } from "@tabler/icons-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export function AboutVisionMission() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="p-10 rounded-[3rem] bg-emerald-500/5 border border-emerald-500/10"
          >
            <IconTarget className="w-12 h-12 text-emerald-500 mb-8" />
            <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
            <p className="text-xl text-white/60 leading-relaxed">
              To become a global platform that helps millions of people build a more consistent, mindful, and meaningful life through simple and well-designed digital experiences.
            </p>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="p-10 rounded-[3rem] bg-white/5 border border-white/10"
          >
            <IconRocket className="w-12 h-12 text-white mb-8" />
            <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
            <ul className="space-y-4 text-xl text-white/60">
              <li className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Easy to use
              </li>
              <li className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Beautifully designed
              </li>
              <li className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Built for consistency
              </li>
              <li className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Focused on real impact
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

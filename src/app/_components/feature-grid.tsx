"use client";

import { motion } from "motion/react";
import { useScrollAnimation } from "../_hooks/use-scroll-animation";
import { 
  IconLayout2, 
  IconBolt, 
  IconRotateClockwise, 
  IconShieldLock, 
  IconMaximize, 
  IconBrush 
} from "@tabler/icons-react";

const items = [
  {
    title: "Minimal Interface",
    description: "Designed to remove distractions and focus on what truly matters—your connection with Allah.",
    icon: IconLayout2
  },
  {
    title: "Fast Performance",
    description: "Optimized for speed. Access your Quran and tools instantly without any lag.",
    icon: IconBolt
  },
  {
    title: "Built for Consistency",
    description: "Intelligent reminders and tracking to help you maintain your daily spiritual habits.",
    icon: IconRotateClockwise
  },
  {
    title: "Privacy-focused",
    description: "Your spiritual data is your own. We never sell or share your personal information.",
    icon: IconShieldLock
  },
  {
    title: "Scalable System",
    description: "A robust foundation built to grow with you as your spiritual needs evolve.",
    icon: IconMaximize
  },
  {
    title: "Thoughtful Design",
    description: "Every pixel is crafted with care to create a calm and premium user experience.",
    icon: IconBrush
  }
];

export function FeatureGrid() {
  const { fadeInUp, staggerContainer } = useScrollAnimation();

  return (
    <section className="py-24 bg-black/50 border-t border-b border-white/5">
      <div className="container px-6 mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {items.map((item, index) => (
            <motion.div key={item.title} variants={fadeInUp} className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              </div>
              <p className="text-white/50 leading-relaxed pl-12 border-l border-white/10 ml-4.5">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

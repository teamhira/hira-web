"use client";

import { motion } from "motion/react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export function AboutFuture() {
  return (
    <section className="py-32 border-y border-white/5">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Looking Ahead</h2>
          <p className="text-xl text-white/50 leading-relaxed">
            Hira is just getting started. We are continuously improving and expanding — with the goal of building a platform that grows with you, supports your journey, and adapts to your needs over time.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="space-y-4"
        >
          <h2 className="text-2xl text-emerald-500 font-bold">More Than Just An App</h2>
          <h3 className="text-4xl md:text-6xl font-bold">Hira is a companion.</h3>
          <div className="pt-8 space-y-2 text-xl text-white/40 font-medium">
            <p>A companion that helps you stay consistent.</p>
            <p>A companion that grows with you.</p>
            <p>A companion for a better, more mindful life.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

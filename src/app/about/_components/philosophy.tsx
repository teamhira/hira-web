"use client";

import { motion } from "motion/react";
import { IconShieldCheck } from "@tabler/icons-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export function AboutPhilosophy() {
  return (
    <>
      <section className="py-32 border-t border-white/5">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-sm uppercase tracking-[0.3em] text-emerald-500 font-bold mb-8">Our Philosophy</h2>
            <blockquote className="text-4xl md:text-6xl font-bold mb-12 leading-[1.1]">
              "Consistency is more important than intensity."
            </blockquote>
            <p className="text-2xl text-white/50 leading-relaxed font-light">
              Small steps, taken every day, lead to meaningful change over time. Hira is designed to support those small steps — making it easier to stay consistent without feeling overwhelmed.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 border-t border-white/5 bg-emerald-500/5">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl font-bold mb-8">Built with Intention</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: "Minimal", desc: "Distraction-free experience." },
                  { title: "Clarity", desc: "Built for usability." },
                  { title: "Calm", desc: "Designed for focus." },
                  { title: "Scale", desc: "Built to evolve with you." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <IconShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-white/40">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="p-10 rounded-[3rem] border border-white/10 bg-black/40 backdrop-blur-xl"
            >
              <p className="text-2xl text-white/70 leading-normal italic">
                "We don’t just build features — we design experiences."
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

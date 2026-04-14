"use client";

import { motion } from "motion/react";
import { 
  IconBook, 
  IconUserCheck, 
  IconPray, 
  IconMapPin, 
  IconHeartHandshake 
} from "@tabler/icons-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export function AboutFeatures() {
  return (
    <section className="py-24 border-t border-white/5 bg-white/[0.01]">
      <div className="container mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">What is Hira?</h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Everything is designed to work together — not as separate tools, but as one connected journey.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            { icon: IconBook, title: "Quran", desc: "Read and listen with deep reflection." },
            { icon: IconUserCheck, title: "Hijrah", desc: "Personal growth and habit building." },
            { icon: IconPray, title: "Tasbih", desc: "Simple daily remembrance." },
            { icon: IconMapPin, title: "Navigator", desc: "Mosque and Halal finder for your needs." },
            { icon: IconHeartHandshake, title: "Contribution", desc: "Charity and Zakat for meaningful giving." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp}
              className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-bold mb-3">{item.title}</h4>
              <p className="text-white/40 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

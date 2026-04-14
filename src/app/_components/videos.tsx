"use client";

import { motion } from "motion/react";
import { useScrollAnimation } from "../_hooks/use-scroll-animation";

export function Videos() {
  const { fadeInUp } = useScrollAnimation();

  return (
    <section id="preview" className="py-24 bg-black">
      <div className="container px-6 mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">See Hira in Action</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Take a deep dive into our product vision and see the features that sets us apart.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/5">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/ZGG0vgl56nQ?si=BsVL_jIw0lFNYFwb" 
                title="Blueprint Overview"
                className="absolute inset-0 border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
            <h3 className="mt-6 text-xl font-bold text-white px-2">Blueprint Overview</h3>
            <p className="mt-2 text-white/50 px-2 text-sm leading-relaxed">
              Explore the architectural vision behind Hira and how we're building a sustainable future for Muslim tech.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/5">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/NSaCm1MW-yk?si=gx__Sim5Blc5AlPG" 
                title="Feature Walkthrough"
                className="absolute inset-0 border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
            <h3 className="mt-6 text-xl font-bold text-white px-2">Feature Walkthrough</h3>
            <p className="mt-2 text-white/50 px-2 text-sm leading-relaxed">
              A guided tour of the application interface, showing how Hira simplifies your daily spiritual tasks.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

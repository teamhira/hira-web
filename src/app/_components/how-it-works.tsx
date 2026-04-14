"use client";

import { motion } from "motion/react";
import { useScrollAnimation } from "../_hooks/use-scroll-animation";
import { IconMail, IconKey, IconRocket } from "@tabler/icons-react";
import { Vortex } from "@/components/ui/vortex";

const steps = [
  {
    title: "Join waiting list",
    description: "Submit your email to secure your spot and be the first to know about our progress.",
    icon: IconMail,
    color: "from-teal-500/20 to-emerald-500/20",
    iconColor: "text-teal-500"
  },
  {
    title: "Get early access",
    description: "Receive a specialized invite to test our beta features and provide valuable feedback.",
    icon: IconKey,
    color: "from-emerald-500/20 to-cyan-500/20",
    iconColor: "text-emerald-500"
  },
  {
    title: "Start using Hira",
    description: "Experience the complete suite of features designed to enhance your spiritual journey.",
    icon: IconRocket,
    color: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-500"
  }
];

export function HowItWorks() {
  const { fadeInUp, staggerContainer } = useScrollAnimation();

  return (
    <section id="how-it-works" className="relative w-full py-24 overflow-hidden bg-black">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={300}
        baseHue={160}
        className="flex items-center flex-col justify-center px-2 md:px-10 py-12 w-full h-full"
      >
        <div className="container px-6 mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight"
            >
              How It <span className="text-primary">Works</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto"
            >
              Your journey to a more consistent spiritual lifestyle is just a few steps away.
            </motion.p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
          >
            {/* Connection line for desktop */}
            <div className="absolute top-1/2 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden md:block -translate-y-1/2 z-0" />

            {steps.map((step, index) => (
              <motion.div 
                key={step.title} 
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="group relative z-10"
              >
                <div className="h-full p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-primary/50 transition-all duration-500 flex flex-col items-center text-center shadow-2xl overflow-hidden">
                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
                  
                  <div className="relative mb-8">
                    <div className={`w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors duration-500`}>
                      <step.icon className={`w-10 h-10 ${step.iconColor}`} />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-lg">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Vortex>
    </section>
  );
}

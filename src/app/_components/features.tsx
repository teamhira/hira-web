"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  IconBook, 
  IconCompass, 
  IconPray, 
  IconMapPin, 
  IconMeat, 
  IconHeartHandshake 
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { useScrollAnimation } from "../_hooks/use-scroll-animation";

const features = [
  {
    title: "Quran",
    description: "Read and listen to the Holy Quran with a clean, distraction-free interface and multiple translations.",
    icon: IconBook,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  {
    title: "Hijrah",
    description: "Track your personal growth and spiritual progress with actionable steps and habit tracking.",
    icon: IconCompass,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    title: "Tasbih",
    description: "Digital counter for your daily dhikr with haptic feedback and beautiful themes.",
    icon: IconPray,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    title: "Mosque Finder",
    description: "Locate nearby mosques and prayer spaces wherever you are in the world.",
    icon: IconMapPin,
    color: "text-red-500",
    bg: "bg-red-500/10"
  },
  {
    title: "Halal Finder",
    description: "Discover verified halal-certified restaurants and businesses in your area.",
    icon: IconMeat,
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  {
    title: "Charity & Zakat",
    description: "Easily calculate and distribute your Zakat and find verified charitable causes.",
    icon: IconHeartHandshake,
    color: "text-pink-500",
    bg: "bg-pink-500/10"
  }
];

export function Features() {
  const { fadeInUp, staggerContainer } = useScrollAnimation();

  return (
    <section id="features" className="py-24 bg-black">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Powerful Features</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Everything you need for a consistent spiritual lifestyle, all in one premium application.
          </p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={fadeInUp}>
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-default group h-full">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl text-white mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-white/50 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

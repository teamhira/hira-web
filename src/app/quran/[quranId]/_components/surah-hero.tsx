"use client";

import { motion } from "motion/react";
import { Chapter } from "@/lib/quran";

import { IconMapPin, IconHash, IconMessageDots, IconListNumbers, IconStack } from "@tabler/icons-react";

interface SurahHeroProps {
  chapter: Chapter;
  juzNumber?: number;
}

export function SurahHero({ chapter, juzNumber }: SurahHeroProps) {
  const metadata = [
    { label: "Revelation", value: chapter.revelation_place, icon: IconMapPin },
    { label: "Ayahs", value: chapter.verses_count, icon: IconHash },
    { label: "Juz", value: juzNumber ? `Juz ${juzNumber}` : "-", icon: IconStack },
    { label: "Order", value: `#${chapter.revelation_order}`, icon: IconMessageDots },
  ];

  return (
    <div className="pt-48 pb-24 text-center border-b border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full translate-y-1/2" />
      
      <div className="relative z-10 container mx-auto px-6">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-arabic text-white mb-6"
        >
          {chapter.name_arabic}
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tighter"
        >
          {chapter.name_simple}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/40 uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-16"
        >
          {chapter.translated_name.name}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {metadata.map((item, idx) => (
            <div key={idx} className="p-5 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:border-primary/20 transition-all group backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 mb-2">
                <item.icon className="w-4 h-4 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{item.label}</span>
              </div>
              <p className="text-sm md:text-base font-bold text-white uppercase tracking-tight">{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

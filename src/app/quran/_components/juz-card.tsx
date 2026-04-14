"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { IconChevronDown } from "@tabler/icons-react";
import { Juz, Chapter } from "@/lib/quran";
import Link from "next/link";

interface JuzCardProps {
  juz: Juz;
  chapters: Chapter[];
}

export function JuzCard({ juz, chapters }: JuzCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Map verse_mapping to readable chapter names
  const surahsInJuz = Object.keys(juz.verse_mapping).map(chapterId => {
    const chapter = chapters.find(c => c.id.toString() === chapterId);
    return {
      id: chapterId,
      name: chapter?.name_simple || `Surah ${chapterId}`,
      verses: juz.verse_mapping[chapterId]
    };
  });

  return (
    <div className="group relative">
      <Card className="bg-white/5 border-white/10 hover:border-primary/50 hover:bg-white/[0.08] transition-all duration-300 rounded-3xl overflow-hidden h-full">
        <CardHeader className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xl font-bold group-hover:scale-110 transition-transform duration-300">
              {juz.juz_number}
            </div>
            <div className="text-right">
              <p className="text-xs text-primary font-bold uppercase tracking-[0.2em]">Juz</p>
              <p className="text-2xl font-bold text-white tracking-tight">{juz.juz_number}</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(!isOpen)}
              className="w-full h-12 rounded-2xl border-white/10 bg-white/5 hover:bg-primary/10 hover:border-primary/30 text-xs font-bold uppercase tracking-widest gap-2 group/btn"
            >
              {isOpen ? "Hide Surahs" : `View ${surahsInJuz.length} Surahs`}
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                <IconChevronDown className="w-4 h-4 text-primary" />
              </motion.div>
            </Button>

            <AnimatePresence>
              {isOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 pt-2">
                    {surahsInJuz.map((surah) => (
                      <Link key={surah.id} href={`/quran/${surah.id}`} className="block group/surah">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-primary/5 hover:border-primary/20 transition-all">
                          <span className="text-sm font-medium text-white group-hover/surah:text-primary transition-colors">
                            {surah.name}
                          </span>
                          <span className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">
                            Ayah {surah.verses}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardHeader>
        
        <CardContent className="px-8 pb-8 pt-0 mt-auto">
          <div className="flex items-center gap-4 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
            <span>{juz.verses_count} Total Ayahs</span>
          </div>
        </CardContent>
      </Card>
      
      {/* Subtle glow effect */}
      <div className="absolute -inset-px bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
    </div>
  );
}

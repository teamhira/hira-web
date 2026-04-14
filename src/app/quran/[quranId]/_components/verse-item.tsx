"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { 
  IconPlayerPlay, 
  IconDotsVertical, 
  IconBook, 
  IconShare, 
  IconQuote 
} from "@tabler/icons-react";
import { Verse } from "@/lib/quran";
import { cn } from "@/lib/utils";

interface VerseItemProps {
  verse: Verse;
  isActive?: boolean;
  onSelect?: () => void;
}

export function VerseItem({ verse, isActive, onSelect }: VerseItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toArabicDigits = (num: number | string) => {
    const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return String(num).replace(/[0-9]/g, (w) => arabicDigits[+w]);
  };

  const transliteration = verse.words
    ?.filter(word => word.char_type_name !== "end")
    .map(word => word.transliteration?.text)
    .join(" ");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      onClick={onSelect}
      className={cn(
        "group relative p-6 md:p-8 rounded-[2.5rem] border transition-all duration-700 cursor-pointer overflow-hidden",
        isActive 
          ? "bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.15)] scale-[1.02] ring-1 ring-emerald-500/20" 
          : "bg-white/[0.02] border-white/5 hover:border-white/10"
      )}
    >
      {isActive && (
        <motion.div 
          layoutId="activeGlow"
          className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent pointer-events-none" 
        />
      )}
      {isActive && (
        <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500 shadow-[2px_0_15px_rgba(16,185,129,0.5)]" />
      )}
      <div className="flex flex-col gap-6 md:gap-8">
        {/* Ayah Header & Arabic */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                {toArabicDigits(verse.verse_number)}
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(true);
              }}
              className="text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-full w-8 h-8 transition-all"
            >
              <IconDotsVertical className="w-4 h-4" />
            </Button>
          </div>

          <div className="text-right">
            <p className="text-2xl md:text-4xl font-arabic leading-[2.2] md:leading-[2.2] text-white group-hover:text-primary transition-colors duration-500">
              {verse.text_uthmani}
            </p>
          </div>
        </div>

        {/* Transliteration & Translation */}
        <div className="space-y-4 md:pl-4 border-l border-white/5">
          {transliteration && (
            <p className="text-xs md:text-sm text-emerald-400 italic font-medium leading-relaxed">
              {transliteration}
            </p>
          )}
          
          {verse.translations?.[0] && (
            <p className="text-sm md:text-base text-white/70 leading-relaxed font-light font-sans selection:bg-primary/20">
              {verse.translations[0].text.replace(/<(?:.|\n)*?>/gm, '')}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 h-px bg-gradient-to-r from-white/5 via-white/5 to-transparent" />

      {/* Action Sheet */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[70] bg-[#0a0a0a] border-t border-white/10 rounded-t-[2rem] pt-10 pb-6 px-4 shadow-2xl max-h-[70vh] overflow-y-auto"
            >
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/10 rounded-full" />
              
              <div className="flex flex-col gap-1">
                <div className="mb-3 px-3">
                  <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-0.5">
                    Ayah {toArabicDigits(verse.verse_number)}
                  </h3>
                  <p className="text-lg font-bold text-white">Actions</p>
                </div>

                <div className="grid grid-cols-1 gap-1">
                  <Button variant="ghost" className="flex items-center gap-3 w-full h-auto p-2.5 rounded-xl hover:bg-white/5 text-white transition-colors text-left justify-start group">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <IconBook className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm">Read Tafsir</span>
                  </Button>

                  <Button variant="ghost" className="flex items-center gap-3 w-full h-auto p-2.5 rounded-xl hover:bg-white/5 text-white transition-colors text-left justify-start group">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      <IconShare className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm">Share Ayah</span>
                  </Button>

                  <Button variant="ghost" className="flex items-center gap-3 w-full h-auto p-2.5 rounded-xl hover:bg-white/5 text-white transition-colors text-left justify-start group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <IconPlayerPlay className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm">Play Ayah</span>
                  </Button>
                </div>

                <Button 
                  variant="ghost" 
                  className="mt-3 w-full h-11 rounded-xl text-white/40 hover:text-white hover:bg-white/5 text-xs font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

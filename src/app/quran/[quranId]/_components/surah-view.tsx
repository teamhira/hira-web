"use client";

import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { motion } from "motion/react";
import * as React from "react";
import { useSurahView } from "../../_hooks/use-surah-view";
import { cn } from "@/lib/utils";
import { Chapter, Verse, TranslationResource, Recitation } from "@/lib/quran";
import { SurahHeader } from "./surah-header";
import { SurahHero } from "./surah-hero";
import { VerseItem } from "./verse-item";
import { SettingsDrawer } from "./settings-drawer";

import { useSurahAudio } from "../../_hooks/use-surah-audio";

interface SurahViewProps {
  chapter: Chapter;
  chapterInfo: { text: string; source: string };
  initialVerses: Verse[];
  initialPagination: any;
  translations: TranslationResource[];
  recitations: Recitation[];
}

export function SurahView({
  chapter,
  chapterInfo,
  initialVerses,
  initialPagination,
  translations,
  recitations,
}: SurahViewProps) {
  const {
    viewMode,
    setViewMode,
    isSettingsOpen,
    verses,
    isLoading,
    selectedReciter,
    setSelectedReciter,
    selectedTranslation,
    setSelectedTranslation,
    handleApplySettings,
    handleOpenSettings,
    handleCloseSettings,
  } = useSurahView({ chapter, initialVerses, translations, recitations });

  const listRef = React.useRef<HTMLDivElement>(null);
  const [activeVerseId, setActiveVerseId] = React.useState<number | null>(initialVerses[0]?.id || null);

  const rowVirtualizer = useWindowVirtualizer({
    count: verses.length,
    estimateSize: () => 450,
    overscan: 10,
    scrollMargin: typeof window !== "undefined" ? listRef.current?.offsetTop ?? 0 : 0,
  });

  const { isPlaying, togglePlay } = useSurahAudio({
    chapterId: chapter.id,
    recitationId: selectedReciter,
    onVerseChange: React.useCallback((verseNumber: number) => {
      const activeVerse = verses.find(v => v.verse_number === verseNumber);
      if (activeVerse) {
        setActiveVerseId(activeVerse.id);
        rowVirtualizer.scrollToIndex(verseNumber - 1, { align: 'center', behavior: 'smooth' });
      }
    }, [verses, rowVirtualizer])
  });

  // Prompt the user if timings are missing
  React.useEffect(() => {
    // We already have logs in useSurahAudio, but we can add a visual hint here if needed
  }, []);

  const virtualItems = rowVirtualizer.getVirtualItems();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30">
      <SurahHeader 
        chapter={chapter} 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        onOpenSettings={handleOpenSettings}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
      />

      <SurahHero chapter={chapter} juzNumber={initialVerses[0]?.juz_number} />

      <main className="py-16 container mx-auto px-6 max-w-4xl min-h-screen">
        {/* Bismillah */}
        {chapter.id !== 1 && chapter.id !== 9 && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-24 px-4 overflow-hidden">
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="hidden md:block h-px w-32 bg-gradient-to-r from-transparent via-primary/50 to-primary/20"
            />
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="md:hidden w-px h-16 bg-gradient-to-b from-transparent via-primary/50 to-primary/20"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center relative px-8"
            >
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-primary/20 rounded-tl-xl" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-primary/20 rounded-br-xl" />
              
              <p className="text-2xl sm:text-3xl md:text-5xl font-arabic text-primary/90 leading-loose drop-shadow-[0_0_15px_rgba(16,185,129,0.2)] whitespace-nowrap break-keep">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
              </p>
            </motion.div>

            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="hidden md:block h-px w-32 bg-gradient-to-l from-transparent via-primary/50 to-primary/20"
            />
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="md:hidden w-px h-16 bg-gradient-to-t from-transparent via-primary/50 to-primary/20"
            />
          </div>
        )}

        <div 
          ref={listRef}
          className={cn(
            "relative w-full transition-opacity duration-300",
            isLoading ? "opacity-30 pointer-events-none" : "opacity-100"
          )}
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {virtualItems.map((virtualItem) => {
            const verse = verses[virtualItem.index];
            if (!verse) return null;

            return (
              <div
                key={virtualItem.key}
                data-index={virtualItem.index}
                ref={rowVirtualizer.measureElement}
                className="absolute top-0 left-0 w-full"
                style={{
                  transform: `translateY(${virtualItem.start - rowVirtualizer.options.scrollMargin}px)`,
                }}
              >
                <div className="pb-16 px-4">
                  <VerseItem 
                    verse={verse} 
                    isActive={activeVerseId === verse.id}
                    onSelect={() => setActiveVerseId(verse.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <SettingsDrawer 
        isOpen={isSettingsOpen}
        onClose={handleCloseSettings}
        viewMode={viewMode}
        setViewMode={setViewMode}
        translations={translations}
        recitations={recitations}
        selectedTranslation={selectedTranslation}
        setSelectedTranslation={setSelectedTranslation}
        selectedReciter={selectedReciter}
        setSelectedReciter={setSelectedReciter}
        onApply={handleApplySettings}
      />
    </div>
  );
}

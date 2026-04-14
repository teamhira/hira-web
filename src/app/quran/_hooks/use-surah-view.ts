"use client";

import { useState, useEffect } from "react";
import { Chapter, Verse, getVersesByChapter, TranslationResource, Recitation } from "@/lib/quran";

interface UseSurahViewProps {
  chapter: Chapter;
  initialVerses: Verse[];
  translations: TranslationResource[];
  recitations: Recitation[];
}

export function useSurahView({
  chapter,
  initialVerses,
  translations,
  recitations,
}: UseSurahViewProps) {
  const [viewMode, setViewMode] = useState<'list' | 'mushaf'>('list');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [verses, setVerses] = useState(initialVerses);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Settings states initialized from props
  const [selectedReciter, setSelectedReciter] = useState<number | undefined>(recitations[0]?.id);
  const [selectedTranslation, setSelectedTranslation] = useState<string>(translations[0]?.id?.toString() || "");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const refreshVerses = async () => {
    setIsLoading(true);
    try {
      const data = await getVersesByChapter(chapter.id.toString(), {
        translations: selectedTranslation,
        audio: selectedReciter,
        words: true,
        per_page: 300,
      });
      setVerses(data.verses);
    } catch (error) {
      console.error("Error refreshing verses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplySettings = () => {
    setIsSettingsOpen(false);
    refreshVerses();
  };

  const handleOpenSettings = () => setIsSettingsOpen(true);
  const handleCloseSettings = () => setIsSettingsOpen(false);

  return {
    viewMode,
    setViewMode,
    isSettingsOpen,
    verses,
    isLoading,
    isMounted,
    selectedReciter,
    setSelectedReciter,
    selectedTranslation,
    setSelectedTranslation,
    handleApplySettings,
    handleOpenSettings,
    handleCloseSettings,
  };
}

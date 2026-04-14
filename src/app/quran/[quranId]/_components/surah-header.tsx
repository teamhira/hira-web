"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconChevronLeft, IconSettings, IconPlayerPlay, IconPlayerPause } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Chapter } from "@/lib/quran";

interface SurahHeaderProps {
  chapter: Chapter;
  viewMode: 'list' | 'mushaf';
  setViewMode: (mode: 'list' | 'mushaf') => void;
  onOpenSettings: () => void;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
}

export function SurahHeader({ 
  chapter, 
  viewMode, 
  setViewMode, 
  onOpenSettings,
  isPlaying,
  onTogglePlay
}: SurahHeaderProps) {
  return (
    <div className="fixed top-[88px] left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl px-4 pointer-events-none">
      <header className="pointer-events-auto bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full px-6 h-14 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4">
          <Link href="/quran">
            <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-white/5 rounded-full">
              <IconChevronLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex flex-col">
            <h1 className="text-[10px] sm:text-xs font-bold tracking-tight text-white leading-none mb-0.5">
              {chapter.name_simple}
            </h1>
            <p className="text-[8px] sm:text-[9px] text-primary font-bold uppercase tracking-[0.2em] leading-none">
              {chapter.verses_count} Ayahs
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex bg-white/5 rounded-full p-1 border border-white/5">
            <Button 
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('list')}
                className={cn(
                  "px-4 h-8 rounded-full text-[10px] font-bold transition-all",
                  viewMode === 'list' 
                    ? "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                List
            </Button>
            <Button 
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('mushaf')}
                className={cn(
                  "px-4 h-8 rounded-full text-[10px] font-bold transition-all",
                  viewMode === 'mushaf' 
                    ? "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                Mushaf
            </Button>
          </div>
          <div className="hidden sm:block w-px h-6 bg-white/10 mx-1" />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onTogglePlay}
            className={cn(
              "w-9 h-9 rounded-full transition-all",
              isPlaying ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(16,185,129,0.4)]" : "hover:bg-white/5 text-white/60 hover:text-white"
            )}
          >
            {isPlaying ? <IconPlayerPause className="w-4 h-4" /> : <IconPlayerPlay className="w-4 h-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onOpenSettings}
            className="w-9 h-9 rounded-full hover:bg-primary/10 hover:text-primary transition-all group"
          >
            <IconSettings className="w-4 h-4 transition-transform group-hover:rotate-90" />
          </Button>
        </div>
      </header>
    </div>
  );
}

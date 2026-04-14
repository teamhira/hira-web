"use client";

import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { 
  IconX, 
  IconPalette, 
  IconLanguage, 
  IconMusic
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { TranslationResource, Recitation } from "@/lib/quran";
import { useSettingsDrawer } from "../../_hooks/use-settings-drawer";
import { AppearanceTab } from "./settings/appearance-tab";
import { ContentTab } from "./settings/content-tab";
import { AudioTab } from "./settings/audio-tab";

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  viewMode: 'list' | 'mushaf';
  setViewMode: (mode: 'list' | 'mushaf') => void;
  translations: TranslationResource[];
  recitations: Recitation[];
  selectedTranslation: string;
  setSelectedTranslation: (id: string) => void;
  selectedReciter: number | undefined;
  setSelectedReciter: (id: number) => void;
  onApply: () => void;
}

export function SettingsDrawer({
  isOpen,
  onClose,
  viewMode,
  setViewMode,
  translations,
  recitations,
  selectedTranslation,
  setSelectedTranslation,
  selectedReciter,
  setSelectedReciter,
  onApply
}: SettingsDrawerProps) {
  const { activeTab, setActiveTab } = useSettingsDrawer();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-3xl flex flex-col"
          >
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">Reading Settings</h2>
                <p className="text-xs text-white/40 mt-1">Customize your Quran experience</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white/5">
                <IconX className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex px-4 bg-zinc-900/50">
              {[
                { id: 'appearance', icon: IconPalette, label: 'Appearance' },
                { id: 'content', icon: IconLanguage, label: 'Content' },
                { id: 'audio', icon: IconMusic, label: 'Audio' }
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex-1 flex flex-col items-center gap-2 py-8 h-auto rounded-none text-[10px] font-bold uppercase tracking-widest transition-all relative",
                    activeTab === tab.id ? "text-primary hover:bg-transparent" : "text-white/30 hover:text-white hover:bg-white/5"
                  )}
                >
                  <tab.icon className={cn("w-5 h-5 mb-1", activeTab === tab.id ? "scale-110" : "")} />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="settingTab" className="absolute bottom-0 left-4 right-4 h-1 bg-primary rounded-t-full" />
                  )}
                </Button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              {activeTab === 'appearance' && (
                <AppearanceTab viewMode={viewMode} setViewMode={setViewMode} />
              )}

              {activeTab === 'content' && (
                <ContentTab 
                  translations={translations} 
                  selectedTranslation={selectedTranslation} 
                  setSelectedTranslation={setSelectedTranslation} 
                />
              )}

              {activeTab === 'audio' && (
                <AudioTab 
                  recitations={recitations} 
                  selectedReciter={selectedReciter} 
                  setSelectedReciter={setSelectedReciter} 
                />
              )}
            </div>

            <div className="p-8 border-t border-white/5 bg-zinc-900/50">
              <Button 
                className="w-full h-14 rounded-2xl text-sm font-bold uppercase tracking-widest shadow-xl" 
                onClick={onApply}
              >
                Save & Apply
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion } from "motion/react";
import { TranslationResource } from "@/lib/quran";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface ContentTabProps {
  translations: TranslationResource[];
  selectedTranslation: string;
  setSelectedTranslation: (id: string) => void;
}

export function ContentTab({ translations, selectedTranslation, setSelectedTranslation }: ContentTabProps) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
      <div className="space-y-4">
        <Label htmlFor="translation-select" className="text-xs text-primary font-bold uppercase tracking-[0.2em]">Primary Translation</Label>
        <Select 
          value={selectedTranslation} 
          onValueChange={setSelectedTranslation}
        >
          <SelectTrigger id="translation-select" className="w-full bg-white/5 border-white/10 h-14 rounded-2xl px-5 focus:ring-primary/20 transition-all">
            <SelectValue placeholder="Choose a translation" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-white/10">
            {translations.map((t) => (
              <SelectItem key={t.id} value={t.id.toString()} className="text-white focus:bg-primary/20 focus:text-white">
                {t.name} ({t.language_name})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
}

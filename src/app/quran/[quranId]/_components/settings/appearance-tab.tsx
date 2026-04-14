"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { IconLayoutList, IconBook } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface AppearanceTabProps {
  viewMode: 'list' | 'mushaf';
  setViewMode: (mode: 'list' | 'mushaf') => void;
}

export function AppearanceTab({ viewMode, setViewMode }: AppearanceTabProps) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
       <div className="space-y-4">
          <Label className="text-xs text-primary font-bold uppercase tracking-[0.2em]">Reading Mode</Label>
          <div className="grid grid-cols-2 gap-3">
             <Button 
               variant="ghost"
               onClick={() => setViewMode('list')}
               className={cn(
                 "flex flex-col items-center gap-3 p-6 h-auto rounded-2xl border transition-all",
                 viewMode === 'list' 
                   ? "bg-primary/10 border-primary text-primary shadow-lg hover:bg-primary/20" 
                   : "border-white/5 bg-white/5 text-white/40 hover:border-white/20 hover:bg-white/10"
               )}
             >
                <IconLayoutList className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-widest">List View</span>
             </Button>
             <Button 
               variant="ghost"
               onClick={() => setViewMode('mushaf')}
               className={cn(
                 "flex flex-col items-center gap-3 p-6 h-auto rounded-2xl border transition-all",
                 viewMode === 'mushaf' 
                   ? "bg-primary/10 border-primary text-primary shadow-lg hover:bg-primary/20" 
                   : "border-white/5 bg-white/5 text-white/40 hover:border-white/20 hover:bg-white/10"
               )}
             >
                <IconBook className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-widest">Mushaf</span>
             </Button>
          </div>
       </div>
    </motion.div>
  );
}

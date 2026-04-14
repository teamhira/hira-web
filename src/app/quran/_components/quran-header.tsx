"use client";

import { IconSearch } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { useQuranNavigation } from "../_hooks/use-quran-navigation";
import { WavyBackground } from "@/components/ui/wavy-background";
import { motion } from "motion/react";

interface QuranHeaderProps {
  searchQuery: string;
}

export function QuranHeader({ searchQuery }: QuranHeaderProps) {
  const { updateFilters } = useQuranNavigation();

  return (
    <header className="relative mb-10 md:mb-20 h-[40vh] md:h-[70vh] min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden w-full">
      <WavyBackground 
        className="max-w-4xl mx-auto" 
        backgroundFill="#000000" 
        containerClassName="h-full w-full"
        speed="slow"
        colors={["#004d40", "#00695c", "#00796b", "#00897b", "#009688"]}
        waveOpacity={0.3}
      >
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-white mb-6 tracking-tight"
          >
            Al-Quran <span className="text-primary font-medium tracking-normal">Al-Kareem</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-base md:text-xl max-w-sm md:max-w-2xl mx-auto leading-relaxed mb-12 px-4"
          >
            Read, study, and listen to the Holy Quran with a premium, distraction-free experience.
          </motion.p>

          {/* Search Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center px-4 w-full"
          >
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                updateFilters({ search: formData.get("search") as string });
              }}
              className="relative w-full max-w-2xl group"
            >
              <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20">
                <IconSearch className="w-5 h-5 md:w-6 md:h-6 text-white/40 group-focus-within:text-primary transition-colors" />
              </div>
              <Input 
                name="search"
                defaultValue={searchQuery}
                placeholder="Search..."
                className="pl-14 md:pl-16 h-14 md:h-18 bg-white/10 backdrop-blur-xl border-white/20 rounded-full text-white text-base md:text-lg placeholder:text-white/30 focus:bg-white/20 focus:border-primary transition-all shadow-2xl border-2"
              />
            </form>
          </motion.div>
        </div>
      </WavyBackground>
    </header>
  );
}

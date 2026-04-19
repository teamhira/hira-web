import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconChevronLeft, IconChevronRight, IconLayersIntersect } from "@tabler/icons-react";

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    description: string;
    duration?: string;
    parts?: string[];
  };
  index: number;
  isShort?: boolean;
}

export function VideoCard({ video, index, isShort }: VideoCardProps) {
  const [activePartIndex, setActivePartIndex] = useState(0);
  const currentVideoId = video.parts ? video.parts[activePartIndex] : video.id;
  const hasMultipleParts = video.parts && video.parts.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group flex flex-col h-full"
    >
      <div 
        className={`relative ${isShort ? 'aspect-[9/16]' : 'aspect-video'} rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-black flex-shrink-0 mb-4 group-hover:border-emerald-500/50 transition-all duration-500 shadow-2xl`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVideoId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=0&rel=0&modestbranding=1&controls=1&showinfo=0`}
              title={`${video.title} - Part ${activePartIndex + 1}`}
              className={`absolute inset-0 border-0 ${isShort ? 'scale-[1.02]' : ''}`} // Slight scale to hide potential pillarboxes on vertical embeds
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Overlay for Multi-part (Indicator) */}
        {hasMultipleParts && (
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20 pointer-events-none">
            <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2">
              <IconLayersIntersect className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">
                Part {activePartIndex + 1} / {video.parts?.length}
              </span>
            </div>
          </div>
        )}

        {/* Navigation for Multi-part (Interactive Layer) */}
        {hasMultipleParts && (
          <>
            <div className="absolute left-0 inset-y-0 flex items-center px-2 z-30 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setActivePartIndex(prev => Math.max(0, prev - 1));
                }}
                disabled={activePartIndex === 0}
                className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-emerald-600 active:bg-emerald-700 disabled:opacity-0 disabled:pointer-events-none transition-all"
              >
                <IconChevronLeft className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="absolute right-0 inset-y-0 flex items-center px-2 z-30 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setActivePartIndex(prev => Math.min((video.parts?.length || 1) - 1, prev + 1));
                }}
                disabled={activePartIndex === (video.parts?.length || 1) - 1}
                className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-emerald-600 active:bg-emerald-700 disabled:opacity-0 disabled:pointer-events-none transition-all"
              >
                <IconChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </>
        )}

        {/* Duration Badge (Only for 16:9 Overview) */}
        {!isShort && video.duration && (
          <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 px-2 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white tracking-wider pointer-events-none z-20">
            {video.duration}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow px-1">
        <h3 className={`font-bold mb-1.5 group-hover:text-emerald-400 transition-colors leading-tight ${isShort ? 'text-base md:text-lg' : 'text-lg md:text-xl'}`}>
          {video.title}
        </h3>
        <p className="text-zinc-500 text-xs md:text-sm leading-relaxed line-clamp-2 italic">
          {video.description}
        </p>
      </div>
    </motion.div>
  );
}

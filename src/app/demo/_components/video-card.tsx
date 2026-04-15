"use client";

import { motion } from "motion/react";

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    description: string;
    duration: string;
  };
  index: number;
  showSequence?: boolean;
}

export function VideoCard({ video, index, showSequence }: VideoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group flex flex-col h-full"
    >
      <div className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 flex-shrink-0 mb-5 group-hover:border-emerald-500/50 transition-colors duration-500">
        {/* YouTube Embed */}
        <iframe 
          width="100%" 
          height="100%" 
          src={`https://www.youtube.com/embed/${video.id}?si=${Math.random().toString(36).substring(7)}`}
          title={video.title}
          className="absolute inset-0 border-0 opacity-90 group-hover:opacity-100 transition-opacity"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        />
        
        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 px-2 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white tracking-wider pointer-events-none">
          {video.duration}
        </div>
      </div>

      <div className="flex flex-col flex-grow px-1 md:px-2">
        <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors leading-tight">
          {showSequence && <span className="text-emerald-500 mr-1.5 font-black uppercase tracking-tighter text-sm md:text-base">Part {index + 1} —</span>}
          {video.title}
        </h3>
        <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
          {video.description}
        </p>
      </div>
    </motion.div>
  );
}

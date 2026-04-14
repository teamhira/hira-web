"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { cn } from "@/lib/utils";

const images = [
  { id: 1, src: "/assets/features/home.png", alt: "Home" },
  { id: 2, src: "/assets/features/quran-surah-detail.png", alt: "Quran Detail" },
  { id: 3, src: "/assets/features/charity.png", alt: "Charity" },
  { id: 4, src: "/assets/features/hijrah-dashboard.png", alt: "Hijrah Dashboard" },
  { id: 5, src: "/assets/features/quran-surah-list.png", alt: "Quran List" },
  { id: 6, src: "/assets/features/quran-surah-detail-audio-expand.png", alt: "Quran Audio" },
  { id: 7, src: "/assets/features/tasbih.png", alt: "Tasbih" },
];

export function StoryImages() {
  const [activeIdx, setActiveIdx] = useState(0);

  const nextImage = () => {
    setActiveIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      nextImage();
    } else if (info.offset.x > threshold) {
      prevImage();
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-[500px] relative mt-10 lg:mt-0 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-emerald-500/[0.05] blur-[100px] rounded-full pointer-events-none" />

      <CardContainer className="inter-var">
        <div className="relative w-[14rem] sm:w-[16rem] md:w-[18rem] aspect-[9/19.5]">
          <AnimatePresence mode="popLayout" initial={false}>
            {images.map((img, i) => {
              const offset = i - activeIdx;
              const isActive = i === activeIdx;
              
              // We only want to show a few images to prevent massive overflow on mobile
              // But we keep them all in the DOM for smooth layout transitions
              // We just fade out those far away
              const distance = Math.abs(offset);
              const isVisible = distance <= 2;

              return (
                <motion.div
                  key={img.id}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  initial={false}
                  animate={{
                    x: offset * 40, // Reduced from 80 to prevent overflow
                    y: distance * 15,
                    scale: 1 - distance * 0.1,
                    rotate: offset * 5,
                    zIndex: images.length - distance,
                    opacity: isVisible ? (1 - distance * 0.2) : 0,
                    pointerEvents: isActive || isVisible ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25
                  }}
                  onClick={() => setActiveIdx(i)}
                  className={cn(
                    "absolute top-0 left-0 w-full h-full cursor-grab active:cursor-grabbing touch-none",
                    isActive ? "z-50" : ""
                  )}
                >
                  <CardBody className={cn(
                    "relative w-full h-full rounded-[2.5rem] bg-black border border-white/10 shadow-2xl overflow-hidden transition-all duration-300",
                    isActive ? "ring-2 ring-emerald-500/50" : "blur-[0.5px]"
                  )}>
                    <CardItem translateZ={isActive ? 50 : 0} className="w-full h-full">
                      <div className="relative w-full h-full">
                        <Image 
                          src={img.src} 
                          alt={img.alt}
                          fill
                          sizes="(max-width: 768px) 300px, 400px"
                          className="object-cover object-top"
                          priority={isActive}
                          draggable={false}
                        />
                        {/* Overlay for non-active */}
                        {!isActive && (
                          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity duration-300" />
                        )}
                      </div>
                    </CardItem>
                  </CardBody>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </CardContainer>

      {/* Mobile Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden text-white/20 text-xs font-medium uppercase tracking-[0.2em] animate-pulse pointer-events-none">
        Swipe to navigate
      </div>
    </div>
  );
}

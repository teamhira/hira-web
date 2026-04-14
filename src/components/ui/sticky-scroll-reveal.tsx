"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => (index / cardLength) * 0.8);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "#000000", // black
    "#064e3b", // emerald-950
    "#022c22", // emerald-950 deep
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)", // cyan-500 to emerald-500
    "linear-gradient(to bottom right, #10b981, #059669)", // emerald-500 to emerald-600
    "linear-gradient(to bottom right, #34d399, #10b981)", // emerald-400 to emerald-500
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0],
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative flex flex-col lg:flex-row min-h-screen justify-center lg:space-x-10 rtl:space-x-reverse p-4 md:p-10 pt-[5vh] lg:pt-[20vh] pb-[20vh]"
      ref={ref}
    >
      {/* Mobile-only Sticky Image Container (Fixed at top/center during scroll) */}
      <div className="lg:hidden sticky top-[12vh] z-30 w-full flex justify-center pointer-events-none mb-4 h-[40vh]">
         <div className="w-[11rem] aspect-[9/19.5] transition-all duration-500">
            <div className="relative h-full w-full bg-black rounded-[2.2rem] border-[5px] border-zinc-900 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden ring-1 ring-white/10 pointer-events-auto">
               <div 
                  className="h-full w-full transition-all duration-500"
                  style={{ background: backgroundGradient }}
               >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCard}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full w-full"
                    >
                      {content[activeCard].content}
                    </motion.div>
                  </AnimatePresence>
               </div>
            </div>
         </div>
      </div>

      <div className="div relative flex items-start w-full lg:w-auto px-4 z-10">
        <div className="max-w-2xl w-full">
          {content.map((item, index) => (
            <div key={item.title + index} className="mb-[40vh] lg:mb-[40vh] last:mb-0">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                  scale: activeCard === index ? 1 : 0.95,
                }}
                className="text-3xl md:text-4xl font-bold text-white tracking-tight text-center lg:text-left"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-lg md:text-xl mt-6 lg:mt-10 max-w-sm mx-auto lg:mx-0 text-white/60 leading-relaxed text-center lg:text-left"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-[20vh] lg:h-[50vh]" />
        </div>
      </div>
      
      {/* Desktop Sticky Image Container */}
      <div
        className={cn(
          "sticky top-[20vh] hidden lg:block h-[65vh] aspect-[9/19.5] z-20",
          contentClassName,
        )}
      >
        <div 
          className="relative h-full w-full bg-black rounded-[2.5rem] border-[6px] border-zinc-900 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/10"
        >
          <div 
            className="h-full w-full transition-all duration-500"
            style={{ background: backgroundGradient }}
          >
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeCard}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-full w-full"
                >
                  {content[activeCard].content}
                </motion.div>
              </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

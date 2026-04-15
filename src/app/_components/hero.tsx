"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { IconArrowRight } from "@tabler/icons-react";
import { Spotlight } from "@/components/ui/spotlight";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";

export function Hero() {
  const words = ["Quran", "Growth", "Discipline", "Journey", "Faith"];

  return (
    <section className="relative w-full min-h-screen flex items-center pt-32 lg:pt-20 overflow-hidden bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#10b981"
      />
      
      <div className="container px-6 mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-medium mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Version 1.0 coming soon
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              Build Your <span className="text-emerald-500">Faith</span>,<br />
              One Step at a Time
            </h1>

            <div className="text-base md:text-lg text-white/50 mb-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-3">
              <span className="whitespace-nowrap">Connect with your</span>
              <ContainerTextFlip 
                words={words} 
                className="bg-emerald-500/10 dark:bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/10 px-2"
                textClassName="text-base md:text-lg text-emerald-400"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button 
                type="button"
                size="lg" 
                className="relative bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-8 text-sm md:text-base group transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Join Waiting List
                  <IconArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              <Button 
                type="button"
                size="lg" 
                variant="ghost" 
                className="text-white hover:bg-white/10 rounded-full px-8 text-sm md:text-base"
              >
                View Features
              </Button>
            </div>
          </motion.div>

          {/* Right Content: 3-Image Stack with 3D Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex justify-center lg:justify-center relative"
          >
            <CardContainer className="inter-var">
              <div className="relative">
                <div className="absolute top-10 -left-20 w-[10rem] md:w-[12rem] aspect-[9/19.5] rounded-[2rem] overflow-hidden border border-white/5 opacity-40 blur-[2px] -rotate-12 transition-all hover:blur-0 hover:opacity-60 duration-500">
                  <Image 
                    src="/assets/features/hijrah-dashboard.png" 
                    fill 
                    sizes="(max-width: 768px) 160px, 192px"
                    className="object-cover" 
                    alt="Hijrah Dashboard" 
                    priority
                  />
                </div>

                {/* Background Image 2 (Right) */}
                <div className="absolute top-10 -right-20 w-[10rem] md:w-[12rem] aspect-[9/19.5] rounded-[2rem] overflow-hidden border border-white/5 opacity-40 blur-[2px] rotate-12 transition-all hover:blur-0 hover:opacity-60 duration-500">
                  <Image 
                    src="/assets/features/quran-surah-list.png" 
                    fill 
                    sizes="(max-width: 768px) 160px, 192px"
                    className="object-cover" 
                    alt="Quran Surah List" 
                    priority
                  />
                </div>

                {/* Main Image (Middle) */}
                <CardBody className="relative z-20 group/card dark:bg-black dark:border-white/[0.1] border-black/[0.1] w-[12rem] sm:w-[13rem] md:w-[14rem] h-auto rounded-[2rem] p-0 border shadow-2xl overflow-hidden">
                  <CardItem translateZ="80" className="w-full">
                    <div className="relative aspect-[9/19.5] w-full overflow-hidden">
                      <Image
                        src="/assets/features/home.png"
                        fill
                        sizes="(max-width: 768px) 192px, 224px"
                        className="object-top object-cover"
                        alt="Home App Preview"
                        priority
                      />
                    </div>
                  </CardItem>
                </CardBody>
              </div>
            </CardContainer>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

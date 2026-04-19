"use client";

import { motion } from "motion/react";
import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DemoHero } from "./_components/hero";
import { VideoCard } from "./_components/video-card";
import { DemoCTA } from "./_components/cta";
import { useDemo } from "./_hooks/use-demo";

export default function DemoPage() {
  const { activeTab, setActiveTab, currentGroup, videoGroups } = useDemo();

  return (
    <main className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      <Navbar />
      
      <DemoHero />

      {/* Video Content Section */}
      <section className="pb-24 md:pb-32 lg:pb-40">
        <div className="container px-6 mx-auto">
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            {/* Tab Navigation */}
            <div className="flex flex-col items-center mb-12 md:mb-20">
              <TabsList className="bg-zinc-900/50 border border-white/10 p-1 h-auto rounded-2xl md:rounded-3xl backdrop-blur-md">
                {videoGroups.map((group) => (
                  <TabsTrigger
                    key={group.id}
                    value={group.id}
                    className="flex items-center gap-2 px-6 py-3 md:px-10 md:py-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all"
                  >
                    <group.icon className="w-4 h-4" />
                    <span>{group.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <motion.p 
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 md:mt-8 text-zinc-500 text-sm md:text-base max-w-lg text-center leading-relaxed"
              >
                {currentGroup?.description}
              </motion.p>
            </div>

            {/* Tab Panes */}
            {videoGroups.map((group) => (
              <TabsContent key={group.id} value={group.id} className="mt-0 outline-none">
                <div className={`grid gap-6 md:gap-8 ${
                  group.id === "features" 
                    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" 
                    : "grid-cols-1 md:grid-cols-2"
                }`}>
                  {group.videos.map((video, idx) => (
                    <VideoCard 
                      key={video.id} 
                      video={video} 
                      index={idx} 
                      isShort={group.id === "features"}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <DemoCTA />

      <Footer />
    </main>
  );
}
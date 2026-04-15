"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DemoCTA() {
  return (
    <section className="py-24 md:py-32 border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none" />
      
      <div className="container px-6 mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12 tracking-tight">Ready to start your journey?</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/#waiting-list" className="w-full sm:w-auto">
            <Button size="lg" className="w-full h-14 px-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105 active:scale-95">
              Join the Waiting List
            </Button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full h-14 px-10 rounded-full border-white/10 hover:bg-white/5 text-white font-bold text-lg transition-all active:scale-95">
              Contact our Team
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

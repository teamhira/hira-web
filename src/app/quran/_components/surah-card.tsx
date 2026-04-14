"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Chapter } from "@/lib/quran";

interface SurahCardProps {
  chapter: Chapter;
}

export function SurahCard({ chapter }: SurahCardProps) {
  return (
    <Link href={`/quran/${chapter.id}`}>
      <Card className="bg-white/5 border-white/10 hover:border-primary/50 hover:bg-white/[0.08] transition-all duration-300 group relative overflow-hidden h-full">
        <CardHeader className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold group-hover:scale-110 transition-transform duration-300">
              {chapter.id}
            </div>
            <div className="text-right">
              <p className="text-4xl font-arabic text-emerald-400 group-hover:text-primary transition-colors leading-[1.2]">
                {chapter.name_arabic}
              </p>
            </div>
          </div>
          
          <div className="space-y-1">
            <CardTitle className="text-xl text-white group-hover:text-primary transition-colors">
              {chapter.name_simple}
            </CardTitle>
            <CardDescription className="text-white/50 group-hover:text-white/70 transition-colors">
              {chapter.translated_name.name}
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="px-6 pb-6">
          <div className="flex items-center gap-4 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
            <span>{chapter.verses_count} Verses</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            <span>{chapter.revelation_place}</span>
          </div>
        </CardContent>

        {/* Subtle bottom glow on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
    </Link>
  );
}

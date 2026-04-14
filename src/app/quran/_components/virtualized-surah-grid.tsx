"use client";

import * as React from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { Chapter } from "@/lib/quran";
import { SurahCard } from "./surah-card";

interface VirtualizedSurahGridProps {
  chapters: Chapter[];
}

export function VirtualizedSurahGrid({ chapters }: VirtualizedSurahGridProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Grid layout logic
  // On mobile: 1 column
  // On md: 2 columns
  // On lg: 3 columns
  // On xl: 4 columns
  const [columns, setColumns] = React.useState(1);

  React.useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1280) setColumns(4);
      else if (window.innerWidth >= 1024) setColumns(3);
      else if (window.innerWidth >= 768) setColumns(2);
      else setColumns(1);
    };
    
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const rowCount = Math.ceil(chapters.length / columns);

  const rowVirtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => 200, // Height of a SurahCard row
    overscan: 5,
    scrollMargin: containerRef.current?.offsetTop ?? 0,
  });

  return (
    <div 
      ref={containerRef}
      className="relative w-full"
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const startIndex = virtualRow.index * columns;
        const rowChapters = chapters.slice(startIndex, startIndex + columns);

        return (
          <div
            key={virtualRow.key}
            data-index={virtualRow.index}
            ref={rowVirtualizer.measureElement}
            className="absolute top-0 left-0 w-full"
            style={{
              transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin}px)`,
            }}
          >
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6`}>
              {rowChapters.map((chapter) => (
                <SurahCard key={chapter.id} chapter={chapter} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

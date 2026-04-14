"use client";

import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious, 
  PaginationEllipsis 
} from "@/components/ui/pagination";

interface QuranPaginationProps {
  currentPage: number;
  totalPages: number;
  searchQuery?: string;
  selectedJuz?: string;
}

export function QuranPagination({ currentPage, totalPages, searchQuery, selectedJuz }: QuranPaginationProps) {
  if (totalPages <= 1) return null;

  const buildHref = (p: number) => {
    const params = new URLSearchParams();
    params.set("page", p.toString());
    if (searchQuery) params.set("search", searchQuery);
    if (selectedJuz) params.set("juz", selectedJuz);
    return `/quran?${params.toString()}`;
  };

  return (
    <Pagination className="mt-16">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            href={buildHref(Math.max(1, currentPage - 1))}
            aria-disabled={currentPage === 1}
            className={currentPage === 1 ? "pointer-events-none opacity-20" : "bg-white/5 border-white/10 hover:bg-white/10 hover:text-white transition-colors"}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
          // Show a few pages around current page
          if (p === 1 || p === totalPages || (p >= currentPage - 2 && p <= currentPage + 2)) {
            return (
              <PaginationItem key={p}>
                <PaginationLink 
                  href={buildHref(p)} 
                  isActive={p === currentPage}
                  className={p === currentPage ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground border-primary font-bold" : "bg-white/5 border-white/10 hover:bg-white/10 hover:text-white transition-colors"}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            );
          }
          
          if (p === currentPage - 3 || p === currentPage + 3) {
            return (
              <PaginationItem key={p}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          return null;
        })}

        <PaginationItem>
          <PaginationNext 
            href={buildHref(Math.min(totalPages, currentPage + 1))}
            aria-disabled={currentPage === totalPages}
            className={currentPage === totalPages ? "pointer-events-none opacity-20" : "bg-white/5 border-white/10 hover:bg-white/10 hover:text-white transition-colors"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

import { Metadata } from "next";
import { getChapters, getJuzs } from "@/lib/quran";
import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";
import { SurahCard } from "./_components/surah-card";
import { VirtualizedSurahGrid } from "./_components/virtualized-surah-grid";
import { JuzCard } from "./_components/juz-card";
import { QuranHeader } from "./_components/quran-header";
import { QuranPagination } from "./_components/quran-pagination";
import { filterChapters } from "./_lib/quran-logic";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface PageProps {
  searchParams: Promise<{ page?: string; search?: string; juz?: string; tab?: string }>;
}

const ITEMS_PER_PAGE = 300;

export const metadata: Metadata = {
  title: "Al-Quran | Browse Surahs and Juzs",
  description: "Read and explore the Holy Quran with translations and recitations on Hira.",
};

export default async function QuranPage({ searchParams }: PageProps) {
  const { page, search, tab } = await searchParams;
  const currentPage = Number(page) || 1;
  const searchQuery = search?.toLowerCase() || "";
  const activeTab = tab || "surah";
  
  const [{ chapters }, { juzs }] = await Promise.all([
    getChapters(),
    getJuzs(),
  ]);

  const { paginatedChapters, totalPages } = filterChapters(chapters, juzs, {
    searchQuery,
    selectedJuz: "",
    currentPage,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  return (
    <div className="relative bg-black min-h-screen">
      <Navbar />
      
      <main className="pb-20 pt-20">
        <QuranHeader searchQuery={searchQuery} />
        
        <div className="container mx-auto px-6">

          <Tabs defaultValue={activeTab} className="mb-12">
            <TabsList className="bg-white/5 border border-white/10 p-1 mb-8">
              <TabsTrigger value="surah" className="px-8 py-2">Surah</TabsTrigger>
              <TabsTrigger value="juz" className="px-8 py-2">Juz</TabsTrigger>
            </TabsList>

            <TabsContent value="surah">
              {paginatedChapters.length > 0 ? (
                <VirtualizedSurahGrid chapters={paginatedChapters} />
              ) : (
                <div className="py-24 text-center">
                  <p className="text-white/40 text-lg">No surahs found matching "{searchQuery}"</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="juz">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {/* Ensure unique Juz entries as prelive APIs may contain duplicates */}
                {Array.from(new Map(juzs.map(j => [j.juz_number, j])).values()).map((j) => (
                  <JuzCard key={j.id} juz={j} chapters={chapters} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}

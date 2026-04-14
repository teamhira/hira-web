import { getChapter, getChapterInfo, getVersesByChapter, getTranslations, getRecitations } from "@/lib/quran";
import { SurahView } from "./_components/surah-view";
import { notFound } from "next/navigation";
import { Navbar } from "@/app/_components/navbar";
import { Footer } from "@/app/_components/footer";

interface PageProps {
  params: Promise<{ quranId: string }>;
}

export default async function SurahDetailPage({ params }: PageProps) {
  const { quranId } = await params;

  try {
    // Parallel fetching for performance
    const [chapterData, infoData, translationsData, recitationsData] = await Promise.all([
      getChapter(quranId),
      getChapterInfo(quranId),
      getTranslations(),
      getRecitations(),
    ]);

    const defaultTranslationId = translationsData.translations[0]?.id?.toString() || "33";
    
    // Fetch verses with the default translation
    const versesData = await getVersesByChapter(quranId, { 
      per_page: 300, 
      words: true,
      translations: defaultTranslationId
    });

    if (!chapterData.chapter) {
      return notFound();
    }

    return (
      <div className="relative bg-black min-h-screen">
        <Navbar />
        
        <SurahView
          chapter={chapterData.chapter}
          chapterInfo={infoData.chapter_info}
          initialVerses={versesData.verses}
          initialPagination={versesData.pagination}
          translations={translationsData.translations}
          recitations={recitationsData.recitations}
        />

        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error loading surah details:", error);
    return notFound();
  }
}
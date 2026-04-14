import { Chapter, Juz } from "@/lib/quran";

interface FilterParams {
  searchQuery: string;
  selectedJuz: string;
  currentPage: number;
  itemsPerPage: number;
}

export function filterChapters(chapters: Chapter[], juzs: Juz[], params: FilterParams) {
  const { searchQuery, selectedJuz, currentPage, itemsPerPage } = params;

  // Filter chapters based on search and juz
  const filtered = chapters.filter(chapter => {
    // Search match
    const matchesSearch = 
      chapter.name_simple.toLowerCase().includes(searchQuery) ||
      chapter.name_arabic.toLowerCase().includes(searchQuery) ||
      chapter.translated_name.name.toLowerCase().includes(searchQuery) ||
      chapter.id.toString() === searchQuery;

    // Juz match
    let matchesJuz = true;
    if (selectedJuz) {
      const targetJuz = juzs.find(j => j.juz_number.toString() === selectedJuz);
      matchesJuz = !!targetJuz && (chapter.id.toString() in targetJuz.verse_mapping);
    }

    return matchesSearch && matchesJuz;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  return {
    filteredChapters: filtered,
    paginatedChapters: paginated,
    totalPages
  };
}

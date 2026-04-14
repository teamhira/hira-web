"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useQuranNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilters = (updates: { search?: string; juz?: string; page?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (updates.search !== undefined) {
      if (updates.search) params.set("search", updates.search);
      else params.delete("search");
    }

    if (updates.juz !== undefined) {
      if (updates.juz) params.set("juz", updates.juz);
      else params.delete("juz");
    }

    if (updates.page !== undefined) {
      params.set("page", updates.page);
    } else {
      params.set("page", "1"); // Reset to page 1 on filter change
    }

    router.push(`/quran?${params.toString()}`);
  };

  return { updateFilters };
}

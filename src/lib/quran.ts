"use server";

let tokenPromise: Promise<string> | null = null;

/**
 * Fetches an access token from the Quran Foundation OAuth2 server.
 * Uses a singleton promise pattern to prevent multiple simultaneous refresh requests (Stampede Protection).
 */
async function getAccessToken(forceRefresh = false): Promise<string> {
  // If a request is already in flight and we're not forcing a refresh, return the existing promise
  if (tokenPromise && !forceRefresh) {
    return tokenPromise;
  }

  tokenPromise = (async () => {
    try {
      const oauthUrl = process.env.QURAN_FOUNDATION_OAUTH_URL;
      const clientId = process.env.QURAN_FOUNDATION_CLIENT_ID;
      const clientSecret = process.env.QURAN_FOUNDATION_CLIENT_SECRET;

      if (!oauthUrl || !clientId || !clientSecret) {
        throw new Error("Missing Quran Foundation OAuth credentials");
      }

      const authToken = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

      const response = await fetch(`${oauthUrl}/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${authToken}`,
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          scope: "content",
        }),
        // Avoid caching if forcing a refresh
        cache: forceRefresh ? "no-store" : "default",
        next: forceRefresh ? undefined : { revalidate: 3500 },
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`OAuth failure (${response.status}): ${errorBody}`);
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      // Clear the promise on failure so next attempt can try again
      tokenPromise = null;
      throw error;
    }
  })();

  return tokenPromise;
}

/**
 * Enhanced fetch wrapper for Quran Foundation APIs.
 * Handles authentication headers, client-id injection, and automatic 401 retry logic.
 */
async function quranFetch<T>(endpoint: string, init: RequestInit = {}): Promise<T> {
  const apiUrl = process.env.QURAN_FOUNDATION_API_URL;
  const clientId = process.env.QURAN_FOUNDATION_CLIENT_ID;

  if (!apiUrl || !clientId) {
    throw new Error("Missing API URL or Client ID configuration");
  }

  const makeRequest = async (token: string) => {
    const url = `${apiUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
    return fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        Authorization: `Bearer ${token}`,
        "x-auth-token": token,
        "x-client-id": clientId,
      },
    });
  };

  // 1. Get current token (from promise cache or fresh)
  let token = await getAccessToken();
  let response = await makeRequest(token);

  // 2. Handle 401 Unauthorized or 403 Forbidden (Token might have expired or been revoked)
  if (response.status === 401 || response.status === 403) {
    console.warn(`Quran API ${response.status} at ${endpoint}, attempting token refresh...`);
    
    // Clear and force a new token request
    token = await getAccessToken(true);
    response = await makeRequest(token);
  }

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Quran API error ${response.status} at ${endpoint}: ${errorBody}`);
  }

  return response.json();
}

export interface Chapter {
  id: number;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  revelation_place: string;
  revelation_order: number;
  translated_name: {
    language_name: string;
    name: string;
  };
}

export interface Verse {
  id: number;
  verse_number: number;
  verse_key: string;
  text_uthmani: string;
  text_indopak?: string;
  juz_number: number;
  hizb_number: number;
  rub_el_hizb_number: number;
  sajdah_type: string | null;
  sajdah_number: number | null;
  page_number: number;
  translations?: Array<{
    id: number;
    resource_id: number;
    text: string;
  }>;
  words?: Array<{
    id: number;
    position: number;
    audio_url: string | null;
    char_type_name: string;
    text_uthmani: string;
    translation: {
      text: string;
    };
    transliteration: {
      text: string;
    };
  }>;
}

export interface Recitation {
  id: number;
  reciter_name: string;
  style: string | null;
  translated_name: {
    name: string;
    language_name: string;
  };
}

export interface TranslationResource {
  id: number;
  name: string;
  author_name: string;
  language_name: string;
}

export interface Juz {
  id: number;
  juz_number: number;
  verse_mapping: Record<string, string>;
  first_verse_id: number;
  last_verse_id: number;
  verses_count: number;
}

export async function getChapters(): Promise<{ chapters: Chapter[] }> {
  return quranFetch<{ chapters: Chapter[] }>("/chapters", {
    next: { revalidate: 86400 },
  });
}

export async function getChapter(id: string): Promise<{ chapter: Chapter }> {
  return quranFetch<{ chapter: Chapter }>(`/chapters/${id}`, {
    next: { revalidate: 86400 },
  });
}

export async function getChapterInfo(id: string): Promise<{ chapter_info: { text: string; source: string } }> {
  return quranFetch<{ chapter_info: { text: string; source: string } }>(`/chapters/${id}/info`, {
    next: { revalidate: 86400 },
  });
}

export async function getVersesByChapter(
  chapterId: string,
  params: {
    language?: string;
    page?: number;
    per_page?: number;
    translations?: string;
    words?: boolean;
    audio?: number;
  } = {}
): Promise<{ verses: Verse[]; pagination: any }> {
  const query = new URLSearchParams();
  if (params.page) query.append("page", params.page.toString());
  if (params.per_page) query.append("per_page", params.per_page.toString());
  if (params.translations) query.append("translations", params.translations);
  if (params.words !== undefined) query.append("words", params.words.toString());
  if (params.audio) query.append("audio", params.audio.toString());
  query.append("fields", "text_uthmani,text_indopak,verse_key,verse_number,chapter_id,page_number");
  query.append("word_fields", "text_uthmani,translation,transliteration,audio_url");

  const queryString = query.toString();
  const url = `/verses/by_chapter/${chapterId}?${queryString}`;
  console.log(`Fetching verses from: ${url}`);
  
  const response = await quranFetch<{ verses: Verse[]; pagination: any }>(
    url,
    { next: { revalidate: 3600 } }
  );
  
  // Debug log for checking translation structure
  if (response.verses?.length > 0) {
    console.log(`First verse sample (ID: ${response.verses[0].id}):`, {
      translations: response.verses[0].translations,
      hasTranslations: !!response.verses[0].translations
    });
  }
  
  return response;
}

export async function getRecitations(): Promise<{ recitations: Recitation[] }> {
  return quranFetch<{ recitations: Recitation[] }>("/resources/recitations", {
    next: { revalidate: 86400 },
  });
}

export async function getTranslations(): Promise<{ translations: TranslationResource[] }> {
  return quranFetch<{ translations: TranslationResource[] }>("/resources/translations", {
    next: { revalidate: 86400 },
  });
}

export async function getJuzs(): Promise<{ juzs: Juz[] }> {
  return quranFetch<{ juzs: Juz[] }>("/juzs", {
    next: { revalidate: 86400 },
  });
}
export interface ChapterAudio {
  audio_url?: string;
  audio_files?: Array<{
    verse_key: string;
    url: string;
  }>;
  chapter_id?: number;
  file_size?: number;
  format?: string;
  duration?: number;
  verse_timings?: Array<{
    verse_key: string;
    timestamp_from: number;
    timestamp_to: number;
    duration: number;
    segments: number[][];
  }>;
}

export async function getChapterAudio(recitationId: number, chapterId: number): Promise<{ audio_file?: ChapterAudio; audio_files?: any[] }> {
  // Try the chapter recitation first (Single File)
  try {
    const chapterResponse = await quranFetch<{ audio_file: ChapterAudio }>(`/chapter_recitations/${recitationId}/${chapterId}`, {
      next: { revalidate: 86400 },
    });
    
    if (chapterResponse.audio_file?.verse_timings) {
      return chapterResponse;
    }
  } catch (e) {
    // Fallback if needed
  }

  // Fallback to playlist mode (Individual Verses)
  return quranFetch<any>(`/recitations/${recitationId}/by_chapter/${chapterId}`, {
    next: { revalidate: 86400 },
  });
}

"use client";

import { useState, useEffect, useRef } from "react";
import { ChapterAudio, getChapterAudio } from "@/lib/quran";

interface UseSurahAudioProps {
  chapterId: number;
  recitationId?: number;
  onVerseChange?: (verseId: number) => void;
}

export function useSurahAudio({ chapterId, recitationId, onVerseChange }: UseSurahAudioProps) {
  const [audioData, setAudioData] = useState<ChapterAudio | null>(null);
  const [playlist, setPlaylist] = useState<Array<{ verse_key: string; url: string }>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const onVerseChangeRef = useRef(onVerseChange);
  const lastLoggedTime = useRef<number>(-1);

  // Sync the callback ref
  useEffect(() => {
    onVerseChangeRef.current = onVerseChange;
  }, [onVerseChange]);

  // Handle Audio Instance
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      const time = audio.currentTime * 1000;
      setCurrentTime(time);

      // Single file sync logic
      if (audioData?.verse_timings) {
        const currentVerseTiming = audioData.verse_timings.find(
          (t) => time >= t.timestamp_from && time < t.timestamp_to
        );

        if (currentVerseTiming && onVerseChangeRef.current) {
          const verseId = parseInt(currentVerseTiming.verse_key.split(":")[1]);
          onVerseChangeRef.current(verseId);
        }
      }
    };

    const handleEnded = () => {
      if (playlist.length > 0 && currentIndex < playlist.length - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioData, playlist, currentIndex]);

  // Handle Metadata & Reset
  useEffect(() => {
    if (!recitationId) return;

    const fetchAudio = async () => {
      try {
        const data = await getChapterAudio(recitationId, chapterId);
        
        if (data.audio_file?.audio_url) {
          setAudioData(data.audio_file);
          setPlaylist([]);
          setCurrentIndex(0);
          if (audioRef.current) {
            audioRef.current.src = data.audio_file.audio_url;
            audioRef.current.load();
          }
        } else if (data.audio_files) {
          setAudioData(null);
          setPlaylist(data.audio_files);
          setCurrentIndex(0);
          if (audioRef.current && data.audio_files[0]) {
            audioRef.current.src = `https://verses.quran.com/${data.audio_files[0].url}`;
            audioRef.current.load();
            
            if (onVerseChangeRef.current) {
              const verseId = parseInt(data.audio_files[0].verse_key.split(":")[1]);
              onVerseChangeRef.current(verseId);
            }
          }
        }
      } catch (error) {
        // Keep silent or simple error
      }
    };

    fetchAudio();
    setIsPlaying(false);
  }, [chapterId, recitationId]);

  // Handle Playlist Transitions
  useEffect(() => {
    if (playlist.length > 0 && audioRef.current) {
      const currentItem = playlist[currentIndex];
      audioRef.current.src = `https://verses.quran.com/${currentItem.url}`;
      audioRef.current.load();
      
      if (onVerseChangeRef.current) {
        const verseId = parseInt(currentItem.verse_key.split(":")[1]);
        onVerseChangeRef.current(verseId);
      }

      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentIndex, playlist]);

  const togglePlay = () => {
    if (!audioRef.current || (!audioData && playlist.length === 0)) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return {
    isPlaying,
    currentTime,
    togglePlay,
    audioData,
  };
}

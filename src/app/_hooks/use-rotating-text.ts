"use client";

import { useState, useEffect } from "react";

export function useRotatingText(words: string[], interval: number = 2000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);

  return words[index];
}

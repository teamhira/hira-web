"use client";

import { useState } from "react";

export function useSettingsDrawer() {
  const [activeTab, setActiveTab] = useState<'appearance' | 'content' | 'audio'>('content');

  return {
    activeTab,
    setActiveTab,
  };
}

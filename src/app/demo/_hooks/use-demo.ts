"use client";

import { useState } from "react";
import { videoGroups } from "../data";

export function useDemo() {
  const [activeTab, setActiveTab] = useState("overview");

  const currentGroup = videoGroups.find(g => g.id === activeTab);

  return {
    activeTab,
    setActiveTab,
    currentGroup,
    videoGroups
  };
}

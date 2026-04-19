import { IconCompass, IconLayoutDashboard } from "@tabler/icons-react";

export interface DemoVideo {
  id: string;
  title: string;
  description: string;
  duration?: string;
  parts?: string[]; // For multi-part videos
}

export interface VideoGroup {
  id: "overview" | "features";
  label: string;
  icon: any;
  description: string;
  videos: DemoVideo[];
}

export const videoGroups: VideoGroup[] = [
  {
    id: "overview",
    label: "Overview & Vision",
    icon: IconCompass,
    description: "Deep dive into the architecture, vision, and core philosophy of Hira through these high-impact masterclasses.",
    videos: [
      {
        id: "f1io0T1Zs7w",
        title: "Complete Hira App Tour",
        description: "Every feature, every screen explained. A complete virtual tour of the Hira ecosystem.",
        duration: "15:20"
      },
      {
        id: "XepYk10rp_E",
        title: "Mastering Hira iOS Architecture",
        description: "Technical breakdown of Clean DDD, MVVM-C, SwiftData, and OAuth2 implementation.",
        duration: "22:45"
      },
      {
        id: "7mEL42uFez4",
        title: "The Apple of Islamic Apps",
        description: "How Hira redefines faith-tech through premium design and intentional digital transformation.",
        duration: "10:15"
      },
      {
        id: "5VhfLJtCl1g",
        title: "Global Spiritual Ecosystem",
        description: "Integration with Quran Foundation APIs, v4 content structures, and cross-device sync.",
        duration: "08:30"
      }
    ]
  },
  {
    id: "features",
    label: "Feature Shorts",
    icon: IconLayoutDashboard,
    description: "Bite-sized visual guides for every core ritual and tool within the Hira application.",
    videos: [
      // 1. Onboarding & Home
      {
        id: "1azxc6B2zEU",
        title: "Onboarding & Core Access",
        description: "Seamless introduction and secure ecosystem entry.",
      },
      // 2. feature feature (General Features)
      {
        id: "j7hWyxJhl4I",
        title: "24/7 AI Islamic Assistant",
        description: "Intelligent guidance from verified Islamic sources.",
      },
      {
        id: "SVaiLNHFzgY",
        title: "Precision Prayer Times",
        description: "Accurate timings with clear countdowns and alerts.",
      },
      {
        id: "dd57dr8HkbE",
        title: "Celebrating Milestones",
        description: "Visual records and rewards for spiritual successes.",
      },
      {
        id: "yv-zjprnjQg",
        title: "Halal Lifestyle Guide",
        description: "AR product verification and nearby mosque navigation.",
      },
      {
        id: "XhaVjaysGvA",
        title: "Zakat Calculator",
        description: "Specialized calculators for all major wealth types.",
      },
      {
        id: "QTb1fiOatJA",
        title: "Focused Dhikr Companion",
        description: "Digital Tasbih with immersive haptic feedback.",
      },
      {
        id: "jcr8oXP9zcc",
        title: "Personal Activity Analytics",
        description: "Spiritual heatmaps and habits visualized through data.",
      },
      {
        id: "b-GHpp8LWJU",
        title: "Khatam Tracker",
        description: "Personalized scheduling for your Quran completion goals.",
      },
      {
        id: "-WVaJjJWyp8",
        title: "Authentic Hadith Hub",
        description: "Verified scholarly collections at your fingertips.",
      },
      {
        id: "A7QJeK5Defo",
        title: "Dua Library",
        description: "Sanctuary of daily supplications for every occasion.",
      },
      {
        id: "W-Hwcq4NI2Q",
        title: "Pilgrimage Roadmap",
        description: "Step-by-step guidance for Hajj and Umrah rituals.",
      },
      {
        id: "7PZ6LmGED28",
        title: "Interactive Hajj Journey",
        description: "Visual roadmap for the ultimate spiritual journey.",
      },
      {
        id: "N1GL02D40vI",
        title: "Tarteel AI Lessons",
        description: "Perfect your rhythmic recitation with audio analysis.",
      },
      {
        id: "hf4dAyy5yRo",
        title: "Deen Mode",
        description: "Distraction-free environment for deep worship.",
      },
      {
        id: "KEH6f3j238E",
        title: "Mosque Finder",
        description: "Navigate to facilities with community-driven reviews.",
      },
      {
        id: "fR7XNxLverE",
        title: "Impact Campaigns",
        description: "Support humanitarian causes with real-time tracking.",
      },
      {
        id: "nNWz4X5u3dk",
        title: "Everyday Sadaqah",
        description: "Flexible ways to give digital and physical goods.",
      },
      {
        id: "H8VB8CsIIfE",
        title: "Depth of Knowledge",
        description: "Long-form articles on history and contemporary faith.",
      },
      {
        id: "mpWQ15WfSTE",
        title: "Private Reflection Space",
        description: "Spiritual journal for thoughts and milestones.",
      },
      {
        id: "Lr3MXA9hCzM",
        title: "Smart Qibla Guidance",
        description: "Precise sensor-driven AR directional feedback.",
      },
      {
        id: "hcpJsrhNGR0",
        title: "Holy Day Calendar",
        description: "Integrated religious schedule and significant dates.",
      },
      {
        id: "rI-j_wbfwS8",
        title: "Launcher Settings",
        description: "Personalize your workspace and favorite tools.",
      },
      // 3. Quran
      {
        id: "9e7EB91z0Hs",
        title: "World-Class Quran Hub",
        description: "Traditional Mushaf aesthetics meets modern precision tools.",
        parts: ["9e7EB91z0Hs", "s9goUSjx18c", "v3gyEOLXLWw", "mRGI2WYNetA", "5LJxx1fcN9U", "FLfhkuGNvWc", "jqt-WfElYEI"]
      },
      // 4. Explore
      {
        id: "WoJXzeQzEFc",
        title: "Explore & Spiritual Growth",
        description: "Dynamic discovery and gamified Hijrah progression.",
        parts: ["WoJXzeQzEFc", "q2AyKiwvbPc", "dAZhauOms7c", "B9Nr8p5jYLc"]
      },
      // 5. Profile
      {
        id: "2NTWu3nLTvY",
        title: "Customized Experience",
        description: "Full control over your data, security, and interface.",
      }
    ]
  }
];

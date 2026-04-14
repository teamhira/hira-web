# Hira (Quran & Multimedia Platform)

Hira is a cutting-edge, premium web platform designed to provide a cinematic and highly personalized Quran reading experience. Built with a focus on aesthetics, accessibility, and high-performance engineering, Hira offers seamless synchronized recitation, modern glassmorphism UI, and smart reading modes.

![Hira Banner](https://images.unsplash.com/photo-1584281723351-9dec82ec9020?auto=format&fit=crop&q=80&w=2600)

## ✨ Features

- **Cinematic Reading Experience**: Modern, dark-themed UI with glassmorphism effects and fluid animations.
- **Smart Audio Synchronization**:
  - **Dual-Mode Player**: Automatically switches between continuous chapter streaming and sequential verse playlists based on API data availability.
  - **Auto-Scroll**: Follow along as the reciter speaks—the viewport automatically centers the active Ayah.
  - **Dynamic Highlighting**: Real-time visual feedback for the currently recited verse with glowing emerald aesthetics.
- **Customizable Interface**:
  - **View Modes**: Swap between standard List View and immersive Mushaf mode.
  - **Recitations**: Choose from a vast library of worldwide reciters (Mishary Alafasy, Abdul Baset, etc.).
  - **Translations**: Integrated support for multiple global languages and specific translation resources.
- **High Performance**: 
  - **Window Virtualization**: Smoothly renders large Surahs (like Al-Baqarah) using `@tanstack/react-virtual`.
  - **Server Actions**: Securely handles all API communications and authentication on the server side.
  - **Hydration-Stable**: Optimized for Next.js SSR with robust hydration mismatch prevention.

## 🚀 Technology Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) & [Aceternity UI](https://ui.aceternity.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: React Hooks & Custom Lifecycle Management
- **Icons**: [Tabler Icons](https://tabler-icons.io/)
- **API**: [Quran Foundation API V4](https://quran.foundation/)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or later
- NPM / PNPM / Bun

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/hira-web.git
   cd hira-web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   QURAN_FOUNDATION_API_URL=https://api.quran.com/api/v4
   QURAN_FOUNDATION_OAUTH_URL=https://auth.quran.foundation/v1
   QURAN_FOUNDATION_CLIENT_ID=your_client_id
   QURAN_FOUNDATION_CLIENT_SECRET=your_client_secret
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience Hira locally.

## 📂 Project Structure

- `src/app/quran`: Main Quran reading application routes.
- `src/app/quran/_hooks`: Custom logic for audio management, settings, and surah views.
- `src/components/ui`: Shared Shadcn and Aceternity UI architectural components.
- `src/lib/quran.ts`: Core API interaction layer (Server Actions).

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Hira is dedicated to making the study and recitation of the Quran accessible, beautiful, and engaging for the modern digital audience.*

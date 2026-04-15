import dynamic from "next/dynamic";
import { Navbar } from "./_components/navbar";
import { Hero } from "./_components/hero";

// Dynamic imports for sections below the fold
const About = dynamic(() => import("./_components/about").then(mod => mod.About));

const Features = dynamic(() => import("./_components/features").then(mod => mod.Features));

const FeatureShowcase = dynamic(() => import("./_components/feature-showcase").then(mod => mod.FeatureShowcase));

const FeatureGrid = dynamic(() => import("./_components/feature-grid").then(mod => mod.FeatureGrid));

const Videos = dynamic(() => import("./_components/videos").then(mod => mod.Videos));

const HowItWorks = dynamic(() => import("./_components/how-it-works").then(mod => mod.HowItWorks));

const WaitingList = dynamic(() => import("./_components/waiting-list").then(mod => mod.WaitingList));

const Footer = dynamic(() => import("./_components/footer").then(mod => mod.Footer));

export default function LandingPage() {
  return (
    <main className="relative bg-black scroll-smooth">
      <Navbar />
      
      <Hero />
      
      <div className="relative">
        <About />
        
        <Features />

        <FeatureShowcase />

        <FeatureGrid />
        
        <Videos />
        
        <HowItWorks />
        
        <WaitingList />
      </div>
      
      <Footer />
    </main>
  );
}

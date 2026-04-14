import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";

export default function PrivacyPage() {
  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-6 pt-40 pb-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">Privacy Policy</h1>
        <div className="max-w-3xl prose prose-invert text-white/70">
          <p className="text-lg mb-6">Your privacy is important to us. Here's a quick summary of how we handle your data.</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Data Collection</h2>
          <p className="mb-4">We only collect data that is necessary for the app to function correctly, such as your spiritual progress and settings. We do not sell your personal information.</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Usage</h2>
          <p className="mb-4">Your data is used solely to provide a personalized spiritual experience. All sensitive data is encrypted.</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Security</h2>
          <p className="mb-4">We employ industry-standard security measures to protect your data from unauthorized access.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}

import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";

export default function TermsPage() {
  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-6 pt-40 pb-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">Terms of Service</h1>
        <div className="max-w-3xl prose prose-invert text-white/70">
          <p className="text-lg mb-6">By using Hira, you agree to the following terms.</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Acceptable Use</h2>
          <p className="mb-4">You agree to use Hira for its intended purpose and not to engage in any activities that could harm the platform or other users.</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Intellectual Property</h2>
          <p className="mb-4">All content and designs within Hira are the property of Hira App and are protected by copyright laws.</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Limitation of Liability</h2>
          <p className="mb-4">Hira is provided "as is" without any warranties. We are not liable for any damages resulting from your use of the app.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}

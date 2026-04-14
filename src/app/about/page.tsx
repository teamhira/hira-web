import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";
import { About as AboutSection } from "../_components/about";

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="pt-20">
        <AboutSection />
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-emerald-500">Our Mission</h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Our mission is to empower the global Muslim community with premium digital tools 
               that foster a deeper connection with their faith in a modern, fast-paced world.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

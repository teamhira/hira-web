import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";

export default function ContactPage() {
  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-6 pt-40 pb-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">Contact Us</h1>
        <div className="max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
          <p className="text-white/60 mb-8">
            Have questions or suggestions? We'd love to hear from you. 
            Reach out to us via email and we'll get back to you as soon as possible.
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-emerald-500 font-bold">Email</p>
              <p className="text-xl">hello@hira.app</p>
            </div>
            <div>
              <p className="text-emerald-500 font-bold">Follow Us</p>
              <p className="text-xl">@hira_app</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

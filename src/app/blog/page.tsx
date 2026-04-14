import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";

export default function BlogPage() {
  const posts = [
    { title: "The Future of Muslim Lifestyle Apps", date: "April 12, 2026", excerpt: "Exploring the intersection of faith and modern technology." },
    { title: "Staying Consistent with the Quran", date: "April 10, 2026", excerpt: "Practical tips to maintain a daily reading habit." },
    { title: "Hira Beta Announcement", date: "April 05, 2026", excerpt: "Everything you need to know about our upcoming beta release." },
  ];

  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-6 pt-40 pb-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-12">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.title} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all cursor-pointer group">
              <p className="text-emerald-500 text-sm mb-4">{post.date}</p>
              <h2 className="text-2xl font-bold mb-4 group-hover:text-emerald-500 transition-colors">{post.title}</h2>
              <p className="text-white/50">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}

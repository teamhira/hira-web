"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  IconBrandThreads, 
  IconBrandInstagram, 
  IconBrandYoutube,
  IconBrandGithub,
  IconBrandTiktok
} from "@tabler/icons-react";

export function Footer() {
  return (
    <footer className="py-24 bg-black border-t border-white/5">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 lg:gap-24 mb-20">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="relative w-10 h-10 transition-transform group-hover:scale-110">
                <Image 
                  src="/assets/icon.png" 
                  alt="Hira Logo" 
                  fill 
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">Hira</span>
            </Link>
            <p className="text-white/70 leading-relaxed text-base">
              Your modern spiritual companion, designed to help you build consistency 
              in your faith with thoughtfulness and care.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-20">
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold mb-2 text-sm uppercase tracking-wider">Product</h4>
              <Link href="/quran" className="text-white/60 hover:text-white transition-colors text-sm">Quran</Link>
              <Link href="/about" className="text-white/60 hover:text-white transition-colors text-sm">About</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold mb-2 text-sm uppercase tracking-wider">Connect</h4>
              <Link href="/contact" className="text-white/60 hover:text-white transition-colors text-sm">Contact</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold mb-2 text-sm uppercase tracking-wider">Social</h4>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: IconBrandTiktok, href: "https://www.tiktok.com/@usehiraapp" },
                  { icon: IconBrandYoutube, href: "https://www.youtube.com/@hiraappglobal" },
                  { icon: IconBrandGithub, href: "https://github.com/teamhira" },
                  { icon: IconBrandInstagram, href: "https://www.instagram.com/usehiraapp" },
                  { icon: IconBrandThreads, href: "https://www.threads.net/@usehiraapp" },
                ].map((social, i) => (
                  <Link 
                    key={i}
                    href={social.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors p-2 rounded-full bg-white/5 border border-white/5 hover:bg-white/10"
                  >
                    <social.icon className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-white uppercase tracking-widest font-semibold">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p>© {new Date().getFullYear()} Hira. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-emerald-500 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-emerald-500 transition-colors">Terms of Service</Link>
            </div>
          </div>
          <span className="opacity-40 lowercase tracking-normal italic font-normal text-xs md:text-sm">
            Made with heart for the Muslim Ummah.
          </span>
        </div>
      </div>
    </footer>
  );
}

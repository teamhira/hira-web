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
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <div className="max-w-xs">
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
            <p className="text-white/40 leading-relaxed text-sm">
              Your modern spiritual companion, designed to help you build consistency 
              in your faith with thoughtfulness and care.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold mb-2">Product</h4>
              <Link href="#features" className="text-white/40 hover:text-white transition-colors text-sm">Features</Link>
              <Link href="/about" className="text-white/40 hover:text-white transition-colors text-sm">About</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold mb-2">Company</h4>
              <Link href="/blog" className="text-white/40 hover:text-white transition-colors text-sm">Blog</Link>
              <Link href="/contact" className="text-white/40 hover:text-white transition-colors text-sm">Contact</Link>
              <Link href="/privacy" className="text-white/40 hover:text-white transition-colors text-sm">Privacy</Link>
              <Link href="/terms" className="text-white/40 hover:text-white transition-colors text-sm">Terms</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold mb-2">Social</h4>
              <div className="flex flex-wrap gap-4">
                <Link href="#" className="text-white/40 hover:text-white transition-colors p-2 rounded-full bg-white/5">
                  <IconBrandThreads className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-white/40 hover:text-white transition-colors p-2 rounded-full bg-white/5">
                  <IconBrandInstagram className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-white/40 hover:text-white transition-colors p-2 rounded-full bg-white/5">
                  <IconBrandTiktok className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-white/40 hover:text-white transition-colors p-2 rounded-full bg-white/5">
                  <IconBrandYoutube className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-white/40 hover:text-white transition-colors p-2 rounded-full bg-white/5">
                  <IconBrandGithub className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20">
          <p>© {new Date().getFullYear()} Hira App. All rights reserved.</p>
          <div className="flex items-center gap-4">
             <span>Made with heart for the Muslim Ummah.</span>
             <Link href="/privacy" className="hover:text-white underline-offset-4 hover:underline">Privacy Policy</Link>
             <Link href="/terms" className="hover:text-white underline-offset-4 hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

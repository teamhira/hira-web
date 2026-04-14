"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { IconChevronDown, IconBook, IconCompass, IconPray, IconMapPin } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const features = [
  { title: "Quran", icon: IconBook, href: "/quran", description: "Read and listen to the Holy Quran" },
  { title: "Hijrah", icon: IconCompass, href: "#features", description: "Track your personal growth" },
  { title: "Tasbih", icon: IconPray, href: "#features", description: "Digital counter for dhikr" },
  { title: "Mosques", icon: IconMapPin, href: "#features", description: "Find nearby prayer spaces" },
];

export function Navbar() {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={cn(
        "fixed transition-all duration-300 z-50 flex justify-center w-full",
        isScrolled ? "top-6 px-6" : "top-0 px-0"
      )}
    >
      <motion.nav 
        layout
        className={cn(
          "flex items-center justify-between w-full transition-all duration-300 border-white/10",
          isScrolled 
            ? "max-w-5xl px-6 py-3 rounded-full backdrop-blur-xl bg-black/40 border shadow-[0_0_20px_rgba(0,0,0,0.5)]" 
            : "max-w-full px-8 py-5 rounded-none backdrop-blur-md bg-black/20 border-b"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8 transition-transform group-hover:scale-110">
            <Image 
              src="/assets/icon.png" 
              alt="Hira Logo" 
              fill 
              sizes="32px"
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Hira</span>
        </Link>

        {/* Center Links */}
        <ul className="hidden md:flex items-center gap-2 text-sm font-medium list-none">
          <li 
            className="relative"
            onMouseEnter={() => setIsFeaturesOpen(true)}
            onMouseLeave={() => setIsFeaturesOpen(false)}
          >
            <button 
              type="button"
              className={cn(
                "flex items-center gap-1 px-4 py-2 rounded-full transition-colors hover:text-white cursor-pointer",
                isFeaturesOpen ? "text-white bg-white/5" : "text-white/70"
              )}
              aria-haspopup="true"
              aria-expanded={isFeaturesOpen}
            >
              Features
              <IconChevronDown className={cn("w-4 h-4 transition-transform", isFeaturesOpen && "rotate-180")} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isFeaturesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-2 rounded-2xl bg-black/99 border border-white/10 backdrop-blur-2xl shadow-2xl"
                  role="menu"
                >
                  <div className="grid gap-1">
                    {features.map((item) => (
                      <Link 
                        key={item.title} 
                        href={item.href}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                        role="menuitem"
                      >
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-xs">{item.title}</p>
                          <p className="text-white/40 text-[10px] leading-tight mt-0.5">{item.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <li>
            <Link href="/about" className="px-4 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-all">About</Link>
          </li>
          <li>
            <Link href="/blog" className="px-4 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-all">Blog</Link>
          </li>
        </ul>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <Button type="button" className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-6 shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all hover:scale-105 active:scale-95">
            Join Waiting List
          </Button>
        </div>
      </motion.nav>
    </div>
  );
}

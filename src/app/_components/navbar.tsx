"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Quran", href: "/quran" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

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
          "flex items-center justify-between w-full transition-all duration-300 border-white/10 relative",
          isScrolled 
            ? "max-w-5xl px-6 py-3 rounded-full backdrop-blur-xl bg-black/40 border shadow-[0_0_20px_rgba(0,0,0,0.5)]" 
            : "max-w-full px-8 py-5 rounded-none backdrop-blur-md bg-black/20 border-b"
        )}
      >
        {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group relative z-[60]">
          <div className="relative w-8 h-8 transition-transform group-hover:scale-110">
            <Image 
              src="/assets/icon.png" 
              alt="Hira Logo" 
              fill 
              sizes="32px"
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Hira</span>
        </Link>

        {/* Desktop Center Links */}
        <ul className="hidden md:flex items-center gap-2 text-sm font-medium list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href} 
                className="px-4 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-3 relative z-[60]">
          <Link href="/demo">
            <Button variant="ghost" className="hidden sm:flex text-white hover:bg-white/10 rounded-full px-6 transition-all">
              Watch Demo
            </Button>
          </Link>
          <Link href="/#waiting-list">
            <Button type="button" className="hidden sm:flex bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-6 shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all hover:scale-105 active:scale-95">
              Join Waiting List
            </Button>
          </Link>
          
          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white hover:bg-white/5 rounded-full transition-colors"
          >
            {isOpen ? <IconX className="w-6 h-6" /> : <IconMenu2 className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={cn(
                "absolute top-full left-0 w-full mt-4 p-6 md:hidden",
                "bg-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl"
              )}
            >
              <ul className="flex flex-col gap-4 list-none p-0 m-0">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-6 py-4 text-xl font-bold text-white hover:text-emerald-500 transition-colors border-b border-white/5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li className="pt-4 flex flex-col gap-3">
                  <Link href="/demo" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full h-14 border-white/10 hover:bg-white/5 text-white rounded-2xl text-lg font-bold">
                      Watch Demo
                    </Button>
                  </Link>
                  <Link href="/#waiting-list" onClick={() => setIsOpen(false)}>
                    <Button className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-lg font-bold">
                      Join Waiting List
                    </Button>
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}

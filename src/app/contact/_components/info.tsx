"use client";

import { motion } from "motion/react";
import { 
  IconMail, 
  IconWorld, 
  IconLifebuoy, 
  IconHeartHandshake, 
  IconClock,
  IconBrandYoutube,
  IconBrandInstagram
} from "@tabler/icons-react";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export function ContactInfo() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Main Contact */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5"
          >
            <h3 className="text-sm uppercase tracking-[0.2em] text-emerald-500 font-bold mb-8">Get In Touch</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <IconMail className="w-6 h-6 text-emerald-500 mt-1" />
                <div>
                  <p className="text-white/40 text-sm mb-1">Email</p>
                  <a href="mailto:hello@hira.guru" className="text-xl font-medium hover:text-emerald-500 transition-colors">hello@hira.guru</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <IconWorld className="w-6 h-6 text-emerald-500 mt-1" />
                <div>
                  <p className="text-white/40 text-sm mb-1">Website</p>
                  <a href="https://hira.guru" target="_blank" rel="noopener noreferrer" className="text-xl font-medium hover:text-emerald-500 transition-colors">hira.guru</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Support & Partnership */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5"
          >
            <h3 className="text-sm uppercase tracking-[0.2em] text-emerald-500 font-bold mb-8">Specialized</h3>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <IconLifebuoy className="w-6 h-6 text-white mt-1" />
                <div>
                  <h4 className="font-bold mb-1">Support</h4>
                  <p className="text-sm text-white/50 mb-3">If you need help or have issues.</p>
                  <a href="mailto:support@hira.guru" className="text-lg font-medium hover:text-emerald-500 transition-colors">support@hira.guru</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <IconHeartHandshake className="w-6 h-6 text-white mt-1" />
                <div>
                  <h4 className="font-bold mb-1">Partnership</h4>
                  <p className="text-sm text-white/50 mb-3">Interested in collaborating?</p>
                  <a href="mailto:partnership@hira.guru" className="text-lg font-medium hover:text-emerald-500 transition-colors">partnership@hira.guru</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Response & Social */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="p-10 rounded-[2.5rem] bg-emerald-500/[0.03] border border-emerald-500/10"
          >
            <h3 className="text-sm uppercase tracking-[0.2em] text-emerald-500 font-bold mb-8">Response Time</h3>
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <IconClock className="w-8 h-8 text-emerald-500" />
                <p className="text-lg text-white/70">We usually respond within 24–48 hours.</p>
              </div>
              
              <div className="pt-8 border-t border-white/5">
                <p className="text-sm text-white/40 mb-6 uppercase tracking-widest">Follow Our Journey</p>
                <div className="flex gap-4">
                  <Link href="https://www.youtube.com/@hiraappglobal" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white">
                    <IconBrandYoutube className="w-6 h-6" />
                  </Link>
                  <Link href="https://www.instagram.com/usehiraapp" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white">
                    <IconBrandInstagram className="w-6 h-6" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Final Note */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-12 text-center"
        >
          <p className="text-white/40 italic">
            We appreciate your interest in Hira. Your feedback helps us build a better experience for everyone.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

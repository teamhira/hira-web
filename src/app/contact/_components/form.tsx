"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { IconSend } from "@tabler/icons-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export function ContactForm() {
  return (
    <section className="py-24 border-t border-white/5 bg-white/[0.01]">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Send Us a Message</h2>
            <p className="text-white/50">Have something in mind? We&apos;re here to help.</p>
          </motion.div>

          <motion.form 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-8 p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-white font-medium ml-1">Name</Label>
                <Input 
                  id="name" 
                  placeholder="Your Name" 
                  className="bg-white/5 border-white/10 rounded-2xl h-14 px-6 focus:border-emerald-500/50 transition-all placeholder:text-white/20"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="email" className="text-white font-medium ml-1">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="Your Email" 
                  className="bg-white/5 border-white/10 rounded-2xl h-14 px-6 focus:border-emerald-500/50 transition-all placeholder:text-white/20"
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="message" className="text-white font-medium ml-1">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Your Message" 
                rows={6}
                className="bg-white/5 border-white/10 rounded-3xl p-6 focus:border-emerald-500/50 transition-all placeholder:text-white/20 resize-none"
              />
            </div>
            <Button 
              className="w-full h-16 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-lg font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)] group transition-all"
            >
              Send Message
              <IconSend className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

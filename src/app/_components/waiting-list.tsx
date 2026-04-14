"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { useScrollAnimation } from "../_hooks/use-scroll-animation";
import { IconSend } from "@tabler/icons-react";

export function WaitingList() {
  const { scaleIn } = useScrollAnimation();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Joined waiting list:", email);
    setEmail("");
    alert("Thank you for joining our waiting list!");
  };

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/20 blur-[100px] rounded-full opacity-50 pointer-events-none" />

      <div className="container px-6 mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          className="max-w-4xl mx-auto rounded-[3rem] p-8 md:p-16 border border-white/10 bg-white/5 backdrop-blur-xl text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Ready to enhance your <br />
            <span className="text-emerald-500">spiritual journey?</span>
          </h2>
          <p className="text-lg text-white/60 mb-12 max-w-xl mx-auto leading-relaxed">
            Join thousands of others in the waiting list and be the first to experience 
            the future of Muslim lifestyle technology.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-2xl focus:ring-emerald-500"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button size="lg" className="h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl px-8 group font-bold">
              Join Now
              <IconSend className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </form>

          <p className="mt-8 text-sm text-white/30">
            No spam. Only important updates. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

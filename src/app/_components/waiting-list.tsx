"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";
import { useScrollAnimation } from "../_hooks/use-scroll-animation";
import { IconSend, IconCheck, IconLoader2 } from "@tabler/icons-react";

import { toast } from "sonner";
import { Turnstile } from "@marsidev/react-turnstile";

export function WaitingList() {
  const { scaleIn } = useScrollAnimation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState<number | null>(null);

  const fetchCount = async () => {
    try {
      const res = await fetch("/api/waiting-list/count");
      const data = await res.json();
      setCount(data.count);
    } catch (err) {
      console.error("Error fetching count:", err);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchCount();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form...", { email, turnstileToken });
    
    if (!turnstileToken) {
      toast.error("Please complete the captcha.");
      return;
    }

    setStatus("loading");
    
    try {
      const res = await fetch("/api/waiting-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, turnstileToken }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to join waiting list");
      }
      
      toast.success("Welcome aboard! Check your email.");
      setStatus("success");
      setEmail("");
      fetchCount(); // Update count after success
    } catch (error: any) {
      toast.error(error.message);
      setStatus("idle");
    }
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Very subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/5 blur-[100px] rounded-full opacity-50 pointer-events-none" />

      <div className="container px-6 mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn as any}
          className="w-full mx-auto rounded-[2rem] p-8 md:p-14 border border-white/5 bg-white/[0.03] backdrop-blur-3xl relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {status !== "success" ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 text-left"
              >
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    {count !== null ? `${count.toLocaleString()} people already joined` : "Loading..." }
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                    Join the <span className="text-emerald-500">Waiting List.</span>
                  </h2>
                  <p className="text-base md:text-lg text-white/40 max-w-md leading-relaxed">
                    Be the first to experience the most elegant Muslim lifestyle companion ever built.
                  </p>
                </div>
                
                <div className="w-full md:w-auto min-w-[320px] lg:min-w-[450px]">
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Input 
                        type="email" 
                        placeholder="your@email.com" 
                        disabled={status === "loading"}
                        className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-xl focus:ring-emerald-500/50 focus:border-emerald-500/50 pl-5 text-base transition-all"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <Button 
                      type="submit"
                      size="lg" 
                      disabled={status === "loading"}
                      className="h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl px-8 group/btn font-bold text-base transition-all"
                    >
                      {status === "loading" ? (
                        <IconLoader2 className="w-5 h-5 animate-spin text-white" />
                      ) : (
                        <>
                          Notify Me
                          <IconSend className="ml-2 w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                  <div className="mt-4 flex justify-center md:justify-start min-h-[65px]">
                    {mounted && (
                      <Turnstile 
                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} 
                        onSuccess={(token) => setTurnstileToken(token)}
                        options={{
                          theme: "dark",
                        }}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4 flex flex-col md:flex-row items-center justify-center gap-6"
              >
                <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
                  <IconCheck className="w-7 h-7 text-emerald-500" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">You're on the list!</h3>
                  <p className="text-sm md:text-base text-white/40 leading-relaxed">
                    We'll send you an invitation as soon as early access is ready.
                  </p>
                </div>
                <button 
                  onClick={() => setStatus("idle")}
                  className="md:ml-auto text-white/30 hover:text-white/60 text-sm font-medium transition-colors underline underline-offset-4"
                >
                  Change email
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

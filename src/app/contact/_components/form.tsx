"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { IconSend, IconCheck, IconAlertCircle } from "@tabler/icons-react";
import { toast } from "sonner";

const fadeInUp: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSuccess(true);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="p-12 rounded-[3rem] bg-emerald-500/10 border border-emerald-500/20 text-center space-y-6 backdrop-blur-3xl"
                >
                  <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                    <IconCheck className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-white">Message Sent!</h3>
                    <p className="text-white/60 text-lg">Thank you for reaching out. We&apos;ll get back to you shortly.</p>
                  </div>
                  <Button 
                    onClick={() => setSuccess(false)}
                    variant="ghost"
                    className="text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10"
                  >
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8 p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl"
                  onSubmit={handleSubmit}
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-white font-medium ml-1">Name</Label>
                      <Input 
                        id="name" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name" 
                        className="bg-white/5 border-white/10 rounded-2xl h-14 px-6 focus:border-emerald-500/50 transition-all placeholder:text-white/20"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-white font-medium ml-1">Email</Label>
                      <Input 
                        id="email" 
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Your Email" 
                        className="bg-white/5 border-white/10 rounded-2xl h-14 px-6 focus:border-emerald-500/50 transition-all placeholder:text-white/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-white font-medium ml-1">Message</Label>
                    <Textarea 
                      id="message" 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Your Message" 
                      rows={6}
                      className="bg-white/5 border-white/10 rounded-3xl p-6 focus:border-emerald-500/50 transition-all placeholder:text-white/20 resize-none"
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={loading}
                    className="w-full h-16 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-lg font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)] group transition-all disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Message"}
                    {!loading && <IconSend className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

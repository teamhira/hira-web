"use client";

import { motion } from "motion/react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export function TermsContent() {
  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: "By accessing or using Hira, you agree to comply with and be legally bound by these Terms. If you do not agree, please do not use our services."
    },
    {
      id: "description",
      title: "2. Description of Service",
      content: "Hira is a digital platform that provides tools and features to support your spiritual journey, including but not limited to Quran reading, habit tracking (Hijrah), tasbih, mosque and halal discovery, and charity and zakat features.",
      subContent: "We reserve the right to modify, suspend, or discontinue any part of the service at any time without prior notice."
    },
    {
      id: "accounts",
      title: "3. User Accounts",
      content: "To access certain features, you may be required to create an account.",
      list: [
        "Provide accurate and complete information",
        "Maintain the security of your account",
        "Be responsible for all activities under your account"
      ],
      footer: "We are not liable for any loss or damage resulting from unauthorized use of your account."
    },
    {
      id: "use",
      title: "4. Use of the Service",
      content: "You agree to use Hira only for lawful purposes and in accordance with these Terms.",
      listTitle: "You must not:",
      list: [
        "Use the service for any illegal or harmful activities",
        "Attempt to gain unauthorized access to systems or data",
        "Interfere with the proper functioning of the platform"
      ]
    },
    {
      id: "property",
      title: "5. Intellectual Property",
      content: "All content, features, and functionality of Hira, including design, text, graphics, and software, are the property of Hira and are protected by applicable intellectual property laws.",
      subContent: "You may not copy, modify, distribute, or reproduce any part of the service without prior written consent."
    },
    {
      id: "privacy",
      title: "6. Privacy",
      content: "Your use of Hira is also governed by our Privacy Policy.",
      subContent: "We are committed to protecting your personal data and handling it responsibly."
    },
    {
      id: "third-party",
      title: "7. Third-Party Services",
      content: "Hira may integrate or provide access to third-party services.",
      subContent: "We are not responsible for the content, policies, or practices of any third-party services."
    },
    {
      id: "disclaimer",
      title: "8. Disclaimer",
      content: "Hira is provided on an “as is” and “as available” basis.",
      subContent: "We do not guarantee that the service will be uninterrupted, error-free, or completely secure."
    },
    {
      id: "liability",
      title: "9. Limitation of Liability",
      content: "To the fullest extent permitted by law, Hira shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service."
    },
    {
      id: "termination",
      title: "10. Termination",
      content: "We reserve the right to suspend or terminate your access to Hira at our discretion, without prior notice, if you violate these Terms."
    },
    {
      id: "changes",
      title: "11. Changes to Terms",
      content: "We may update these Terms from time to time.",
      subContent: "We will notify users of significant changes, but it is your responsibility to review them periodically."
    },
    {
      id: "law",
      title: "12. Governing Law",
      content: "These Terms shall be governed and interpreted in accordance with the applicable laws."
    },
    {
      id: "contact",
      title: "13. Contact",
      content: "If you have any questions about these Terms, please contact us:",
      email: "hello@hira.guru"
    }
  ];

  return (
    <section className="py-24 border-t border-white/5 bg-white/[0.01]">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={fadeInUp}
             className="mb-16 p-8 rounded-3xl bg-white/5 border border-white/10"
          >
            <p className="text-lg text-white/70 leading-relaxed">
              Welcome to Hira. By accessing or using our website and application, you agree to be bound by the following Terms of Service. Please read these terms carefully.
            </p>
          </motion.div>

          <div className="space-y-16">
            {sections.map((section, index) => (
              <motion.div 
                key={section.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="group"
              >
                <h2 className="text-2xl font-bold mb-6 text-white group-hover:text-emerald-500 transition-colors">
                  {section.title}
                </h2>
                <div className="space-y-4 text-lg text-white/60 leading-relaxed">
                  <p>{section.content}</p>
                  
                  {section.subContent && <p>{section.subContent}</p>}
                  
                  {section.listTitle && <p className="font-medium text-white/80">{section.listTitle}</p>}
                  
                  {section.list && (
                    <ul className="space-y-3 pl-6 list-disc marker:text-emerald-500">
                      {section.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  
                  {section.footer && <p className="pt-4 border-t border-white/5 text-sm italic">{section.footer}</p>}
                  
                  {section.email && (
                    <a href={`mailto:${section.email}`} className="inline-block pt-2 text-emerald-500 font-bold hover:underline">
                      {section.email}
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-24 pt-12 border-t border-white/10 text-center"
          >
            <p className="text-2xl font-bold text-white mb-4">Agreement</p>
            <p className="text-white/50 text-lg leading-relaxed">
              By using Hira, you acknowledge that you have read, understood, and agreed to these Terms of Service.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

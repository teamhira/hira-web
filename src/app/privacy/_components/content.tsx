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

export function PrivacyContent() {
  const sections = [
    {
      id: "collection",
      title: "1. Information We Collect",
      content: "We may collect the following types of information:",
      items: [
        {
          label: "a. Personal Information",
          list: ["Name", "Email address", "Account credentials"]
        },
        {
          label: "b. Usage Data",
          list: ["App interactions", "Device information", "Log data"]
        },
        {
          label: "c. Optional Information",
          list: ["Preferences and settings", "Feedback or messages you send to us"]
        }
      ]
    },
    {
      id: "usage",
      title: "2. How We Use Your Information",
      content: "We use your information to:",
      list: [
        "Provide and improve our services",
        "Personalize your experience",
        "Communicate updates and important information",
        "Send notifications related to your account or features",
        "Ensure security and prevent misuse"
      ]
    },
    {
      id: "security",
      title: "3. Data Storage and Security",
      content: "We implement appropriate security measures to protect your data.",
      subContent: "However, no method of transmission or storage is 100% secure. We strive to protect your information but cannot guarantee absolute security."
    },
    {
      id: "sharing",
      title: "4. Sharing of Information",
      content: "We do not sell your personal data.",
      listTitle: "We may share information with:",
      list: [
        "Service providers (e.g., hosting, analytics, email services)",
        "Legal authorities if required by law"
      ]
    },
    {
      id: "third-party",
      title: "5. Third-Party Services",
      content: "Hira may use third-party services that collect and process data on our behalf.",
      subContent: "These services have their own privacy policies, and we encourage you to review them."
    },
    {
      id: "cookies",
      title: "6. Cookies and Tracking",
      content: "We may use cookies or similar technologies to improve user experience and analyze usage.",
      subContent: "You can control cookie preferences through your browser settings."
    },
    {
      id: "rights",
      title: "7. Your Rights",
      listTitle: "Depending on your location, you may have the right to:",
      list: [
        "Access your personal data",
        "Request correction or deletion",
        "Withdraw consent",
        "Request data portability"
      ]
    },
    {
      id: "retention",
      title: "8. Data Retention",
      content: "We retain your data only as long as necessary to provide our services and comply with legal obligations."
    },
    {
      id: "children",
      title: "9. Children’s Privacy",
      content: "Hira is not intended for children under the age of 13.",
      subContent: "We do not knowingly collect personal data from children."
    },
    {
      id: "changes",
      title: "10. Changes to This Policy",
      content: "We may update this Privacy Policy from time to time.",
      subContent: "We will notify users of significant changes, but we encourage you to review this page periodically."
    },
    {
      id: "contact",
      title: "11. Contact Us",
      content: "If you have any questions or concerns about this Privacy Policy, please contact us:",
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
              Hira respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and application. Please read this policy carefully.
            </p>
          </motion.div>

          <div className="space-y-16">
            {sections.map((section) => (
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
                  
                  {section.items && (
                    <div className="space-y-6 pt-2">
                      {section.items.map((item, i) => (
                        <div key={i} className="space-y-2">
                          <p className="font-bold text-white/90">{item.label}</p>
                          <ul className="space-y-2 pl-6 list-disc marker:text-emerald-500/50">
                            {item.list.map((listItem, j) => (
                              <li key={j}>{listItem}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.subContent && <p className="text-white/50">{section.subContent}</p>}
                  
                  {section.listTitle && <p className="font-medium text-white/80">{section.listTitle}</p>}
                  
                  {section.list && (
                    <ul className="space-y-3 pl-6 list-disc marker:text-emerald-500">
                      {section.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  
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
            <p className="text-2xl font-bold text-white mb-4">Acceptance</p>
            <p className="text-white/50 text-lg leading-relaxed">
              By using Hira, you agree to the collection and use of information in accordance with this Privacy Policy.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

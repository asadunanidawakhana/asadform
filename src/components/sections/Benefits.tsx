"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

const benefits = [
  {
    title: "Live Online Classes",
    description: "Attend real-time interactive classes from anywhere. Learn directly from expert instructors.",
    icon: "💻",
  },
  {
    title: "Live Q&A Every Weekend",
    description: "Get your doubts resolved every weekend with dedicated Q&A sessions.",
    icon: "❓",
  },
  {
    title: "YouTube Automation",
    description: "Learn how to automate, grow, and monetize YouTube channels effectively.",
    icon: "▶️",
  },
  {
    title: "Web Development with AI",
    description: "Build modern websites using AI tools — faster and smarter development.",
    icon: "🤖",
  },
  {
    title: "Social Media Marketing",
    description: "Master organic and paid strategies for Instagram, Facebook, TikTok, and more.",
    icon: "📱",
  },
  {
    title: "Make Ads with AI",
    description: "Create high-converting ads using AI-generated content and targeting strategies.",
    icon: "🎯",
  },
  {
    title: "Learn About AI",
    description: "Understand AI fundamentals, prompt engineering, and real-world AI applications.",
    icon: "🧠",
  },
];

export function Benefits() {
  return (
    <section className="py-20 sm:py-28 bg-[#f8f9fc]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f]">
            What You&apos;ll Learn in This Course
          </h2>
          <p className="mt-4 text-lg text-[#64748b] max-w-2xl mx-auto">
            Only PKR 2,000 — 1.5 months — Live classes — Limited to 15 seats
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full">
                <span className="text-3xl mb-4 block">{benefit.icon}</span>
                <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[#64748b] leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

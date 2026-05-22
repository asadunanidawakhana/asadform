"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Benefits } from "@/components/sections/Benefits";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

const faqItems = [
  {
    q: "What is Batch +1?",
    a: "Batch +1 is Mac Digital Agency's 1.5-month intensive digital skills program covering AI, web development, YouTube automation, social media marketing, and more.",
  },
  {
    q: "Who can apply?",
    a: "Anyone with a passion for digital skills. No prior experience required. Only 15 seats available!",
  },
  {
    q: "What is the fee?",
    a: "Only PKR 2,000 for the entire 1.5-month program.",
  },
  {
    q: "How long is the program?",
    a: "The program runs for 1.5 months with live online classes and weekend Q&A sessions.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />

        <Benefits />

        <Testimonials />

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f]">
                Batch +1 — Program Details
              </h2>
              <p className="mt-4 text-lg text-[#64748b] max-w-2xl mx-auto">
                1.5 months | Live online classes | Only PKR 2,000 | Limited to 15 seats
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[#1e3a5f]">What You&apos;ll Learn</h3>
                <ul className="space-y-3">
                  {["Live Online Classes", "YouTube Automation", "Web Development with AI", "Social Media Marketing", "How to Make Ads with AI", "AI Fundamentals & Prompt Engineering"].map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 text-sm text-[#64748b]"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1e3a5f]/10 text-[#1e3a5f] text-xs font-bold">
                        {i + 1}
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[#1e3a5f]">Program Highlights</h3>
                <ul className="space-y-3">
                  {["1.5-Month Intensive Program", "Live Weekly Classes", "Weekend Q&A Sessions", "AI-Powered Tools & Workflows", "Only 15 Seats — Limited Batch"].map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 text-sm text-[#64748b]"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00cec9]/10 text-[#00cec9] text-xs font-bold">
                        ✓
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#f8f9fc]">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f]">
                Frequently Asked Questions
              </h2>
            </motion.div>

            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card hover={false} className="p-5">
                    <h3 className="text-sm font-semibold text-[#1e3a5f] mb-2">
                      {item.q}
                    </h3>
                    <p className="text-sm text-[#64748b] leading-relaxed">
                      {item.a}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <a
                href="/faq"
                className="text-sm font-medium text-[#1e3a5f] hover:underline"
              >
                View all FAQs →
              </a>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}

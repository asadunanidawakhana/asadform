"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";

const faqData = [
  {
    category: "Enrollment",
    items: [
      { q: "How do I enroll in Batch +1?", a: "Simply fill out the enrollment form on our website, pay PKR 2,000 via JazzCash to 0308 7817695 (Abdul razzaq), and upload your payment proof. Our team will confirm your seat." },
      { q: "Is there any age limit?", a: "Anyone above 16 years with a passion for digital skills can apply. No prior experience is required." },
      { q: "Can I apply from outside Pakistan?", a: "Yes! The program is online and accessible from anywhere in the world." },
    ],
  },
  {
    category: "Payments",
    items: [
      { q: "What is the fee for Batch +1?", a: "Only PKR 2,000 for the entire 1.5-month program." },
      { q: "What payment methods are accepted?", a: "We accept payments via JazzCash to 0308 7817695 (Abdul razzaq)." },
      { q: "Is the fee refundable?", a: "Please refer to our Terms & Conditions for detailed refund policies." },
    ],
  },
  {
    category: "Course Content",
    items: [
      { q: "What will I learn in this course?", a: "You will learn: Live online classes, YouTube automation, web development with AI, social media marketing, how to make ads with AI, and AI fundamentals." },
      { q: "Are the classes live or recorded?", a: "We conduct live online classes with weekend Q&A sessions. Recordings are also provided." },
      { q: "How long is the program?", a: "The program runs for 1.5 months with live sessions every week." },
    ],
  },
  {
    category: "Support",
    items: [
      { q: "How do I contact support?", a: "You can reach us via WhatsApp at 0333 7629724, email, or through the contact form on our website." },
      { q: "How long does it take to get a response?", a: "Our team typically responds within 24 hours during business days." },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#f8f9fc]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f]">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-[#64748b]">
              Everything you need to know about Batch +1.
            </p>
          </motion.div>

          <div className="space-y-10">
            {faqData.map((category, ci) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.1 }}
              >
                <h2 className="text-xl font-semibold text-[#1e3a5f] mb-4">
                  {category.category}
                </h2>
                <div className="space-y-3">
                  {category.items.map((item, ii) => {
                    const key = `${ci}-${ii}`;
                    const isOpen = openIndex === key;
                    return (
                      <Card key={key} hover={false} className="overflow-hidden">
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : key)}
                          className="w-full flex items-center justify-between p-5 text-left"
                        >
                          <span className="text-sm font-medium text-[#1e3a5f] pr-4">
                            {item.q}
                          </span>
                          <motion.svg
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            className="w-4 h-4 text-[#64748b] shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </motion.svg>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5">
                                <p className="text-sm text-[#64748b] leading-relaxed">
                                  {item.a}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Card>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

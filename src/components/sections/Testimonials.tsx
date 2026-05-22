"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

const testimonials = [
  {
    name: "Ahmed Khan",
    role: "Freelancer",
    content: "Mac Digital completely changed my career. The 1.5-month program gave me all the skills I needed to start earning online.",
    rating: 5,
  },
  {
    name: "Fatima Ali",
    role: "Digital Marketing Specialist",
    content: "The practical approach to learning is what sets Mac Digital apart. Real projects, real skills, real results.",
    rating: 5,
  },
  {
    name: "Usman Raza",
    role: "Web Developer",
    content: "Best decision I ever made. The agency-level training gave me confidence to take on big clients immediately.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f]">
            What Our Students Say
          </h2>
          <p className="mt-4 text-lg text-[#64748b] max-w-2xl mx-auto">
            Hear from graduates who transformed their careers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className="p-6 h-full">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-[#64748b] leading-relaxed mb-4">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold text-[#1e3a5f]">{t.name}</p>
                  <p className="text-xs text-[#94a3b8]">{t.role}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

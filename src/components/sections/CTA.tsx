"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface CTAProps {
  title?: string;
  subtitle?: string;
}

export function CTA({
  title = "Ready to Start Your Journey?",
  subtitle = "Only PKR 2,000 for 1.5 months of live training. Only 15 seats available — book yours now!",
}: CTAProps) {
  return (
    <section className="py-20 sm:py-28 bg-[#f8f9fc]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f]">
            {title}
          </h2>
          <p className="mt-4 text-lg text-[#64748b] max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <Button href="/enrollment" size="lg">
              Enroll Now — PKR 2,000 Only
            </Button>
            <Button href="https://wa.me/923337629724" variant="outline" size="lg">
              Chat on WhatsApp
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

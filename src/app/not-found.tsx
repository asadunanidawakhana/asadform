"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-20 bg-[#f8f9fc]">
        <div className="mx-auto max-w-md px-4 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-8xl font-bold text-[#1e3a5f]/10 block mb-4">
              404
            </span>
            <h1 className="text-3xl font-bold text-[#1e3a5f] mb-4">
              Page Not Found
            </h1>
            <p className="text-[#64748b] mb-8">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Button href="/" size="lg">
              Back to Home
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}

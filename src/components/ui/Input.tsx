"use client";

import { motion } from "framer-motion";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  multiline?: boolean;
  placeholder?: string;
}

export function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  multiline,
  placeholder,
}: InputProps) {
  const Component = multiline ? "textarea" : "input";

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-[#1e3a5f]"
      >
        {label}
      </label>
      <motion.div
        initial={false}
        animate={error ? { x: [0, -4, 4, -4, 4, 0] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Component
          id={name}
          name={name}
          type={multiline ? undefined : type}
          value={value}
          onChange={onChange}
          rows={multiline ? 4 : undefined}
          placeholder={placeholder}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-sm transition-all duration-200 placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-200"
              : "border-[#e2e8f0]"
          }`}
        />
      </motion.div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

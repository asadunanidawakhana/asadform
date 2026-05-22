"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "D" },
  { href: "/admin/students", label: "Students", icon: "S" },
  { href: "/admin/review", label: "Review", icon: "R" },
  { href: "/admin/analytics", label: "Analytics", icon: "A" },
  { href: "/admin/notifications", label: "Notifications", icon: "N" },
  { href: "/admin/settings", label: "Settings", icon: "G" },
  { href: "/admin/support", label: "Support", icon: "H" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-[#e2e8f0] bg-white">
      <div className="flex h-16 items-center gap-2 px-6 border-b border-[#e2e8f0]">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1e3a5f] text-white text-xs font-bold">
          M
        </div>
        <span className="text-lg font-bold text-[#1e3a5f]">Admin</span>
      </div>

      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-[#1e3a5f] text-white"
                  : "text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#1e3a5f]"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-[#1e3a5f]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 text-xs font-bold">
                  {item.icon}
                </span>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#e2e8f0]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { supabase } from "@/lib/supabase";
import type { Enrollment } from "@/lib/types";

const statusColors: Record<string, string> = {
  approved: "text-green-600 bg-green-50",
  pending: "text-yellow-600 bg-yellow-50",
  under_review: "text-blue-600 bg-blue-50",
  rejected: "text-red-600 bg-red-50",
};

export default function AdminDashboard() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = async () => {
    const { data } = await supabase
      .from("enrollments")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setEnrollments(data);
    setLoading(false);
  };

  const total = enrollments.length;
  const pending = enrollments.filter((e) => e.status === "pending").length;
  const approved = enrollments.filter((e) => e.status === "approved").length;
  const rejected = enrollments.filter((e) => e.status === "rejected").length;

  const stats = [
    { label: "Total Applications", value: total, color: "bg-blue-500" },
    { label: "Pending Review", value: pending, color: "bg-yellow-500" },
    { label: "Approved", value: approved, color: "bg-green-500" },
    { label: "Rejected", value: rejected, color: "bg-red-500" },
  ];

  const recent = enrollments.slice(0, 5);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-[#1e3a5f] mb-8">Dashboard</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card hover={false} className="p-5">
                <div className={`w-3 h-3 rounded-full ${stat.color} mb-3`} />
                <p className="text-2xl font-bold text-[#1e3a5f]">
                  {loading ? "..." : stat.value}
                </p>
                <p className="text-xs text-[#64748b] mt-1">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card hover={false} className="p-6">
          <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4">Recent Applications</h2>
          {loading ? (
            <div className="text-center py-8 text-[#64748b] text-sm">Loading...</div>
          ) : recent.length === 0 ? (
            <div className="text-center py-8 text-[#64748b] text-sm">No applications yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e2e8f0]">
                    <th className="text-left py-3 font-medium text-[#64748b]">Name</th>
                    <th className="text-left py-3 font-medium text-[#64748b]">City</th>
                    <th className="text-left py-3 font-medium text-[#64748b]">Status</th>
                    <th className="text-left py-3 font-medium text-[#64748b]">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((item) => (
                    <tr key={item.id} className="border-b border-[#e2e8f0] last:border-0">
                      <td className="py-3 font-medium text-[#1e3a5f]">{item.full_name}</td>
                      <td className="py-3 text-[#64748b]">{item.city}</td>
                      <td className="py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[item.status] || ""}`}>
                          {item.status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="py-3 text-[#64748b]">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { supabase } from "@/lib/supabase";
import type { Enrollment } from "@/lib/types";

const statusBadge: Record<string, "success" | "warning" | "info" | "error"> = {
  approved: "success",
  pending: "warning",
  under_review: "info",
  rejected: "error",
};

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const { data } = await supabase
      .from("enrollments")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setStudents(data);
    setLoading(false);
  };

  const filtered = students.filter(
    (s) =>
      s.full_name.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Students</h1>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 rounded-xl border border-[#e2e8f0] bg-white px-4 py-2.5 text-sm placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
        />
      </div>

      <Card hover={false} className="overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-[#64748b] text-sm">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e2e8f0] bg-[#f8f9fc]">
                  <th className="text-left py-3 px-4 font-medium text-[#64748b]">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748b]">Phone</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748b]">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748b]">City</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748b]">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748b]">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((student) => (
                  <tr key={student.id} className="border-b border-[#e2e8f0] last:border-0 hover:bg-[#f8f9fc] transition-colors">
                    <td className="py-3 px-4 font-medium text-[#1e3a5f]">{student.full_name}</td>
                    <td className="py-3 px-4 text-[#64748b]">{student.phone}</td>
                    <td className="py-3 px-4 text-[#64748b]">{student.email}</td>
                    <td className="py-3 px-4 text-[#64748b]">{student.city}</td>
                    <td className="py-3 px-4">
                      <Badge variant={statusBadge[student.status] || "default"}>
                        {student.status.replace(/_/g, " ")}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-[#64748b]">
                      {new Date(student.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-12 text-[#64748b] text-sm">
            No students found
          </div>
        )}
      </Card>
    </motion.div>
  );
}

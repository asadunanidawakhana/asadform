"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { supabase } from "@/lib/supabase";
import type { Enrollment } from "@/lib/types";

const statusBadge: Record<string, "warning" | "info" | "success" | "error"> = {
  pending: "warning",
  under_review: "info",
  approved: "success",
  rejected: "error",
};

export default function ReviewPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
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

  const updateStatus = async (id: string, status: string) => {
    await supabase
      .from("enrollments")
      .update({ status, admin_notes: notes || null, approved_at: status === "approved" ? new Date().toISOString() : undefined })
      .eq("id", id);
    loadEnrollments();
    setNotes("");
  };

  const selectedStudent = enrollments.find((e) => e.id === selected);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-bold text-[#1e3a5f] mb-8">Review Submissions</h1>

      {loading ? (
        <div className="text-center py-12 text-[#64748b] text-sm">Loading...</div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {enrollments.length === 0 && (
              <div className="text-center py-12 text-[#64748b] text-sm">No submissions yet</div>
            )}
            {enrollments.map((sub, i) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  hover={false}
                  className={`p-5 cursor-pointer transition-all ${
                    selected === sub.id ? "ring-2 ring-[#1e3a5f]" : ""
                  }`}
                  onClick={() => { setSelected(sub.id); setNotes(sub.admin_notes || ""); }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-semibold text-[#1e3a5f]">{sub.full_name}</h3>
                      <p className="text-xs text-[#64748b]">{sub.phone}</p>
                    </div>
                    <Badge variant={statusBadge[sub.status] || "warning"}>
                      {sub.status.replace(/_/g, " ")}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#64748b] line-clamp-2">{sub.goals}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div>
            {selectedStudent ? (
              <Card hover={false} className="p-6">
                <h3 className="text-sm font-semibold text-[#1e3a5f] mb-4">Review & Actions</h3>

                <div className="space-y-3 mb-6">
                  <p className="text-xs text-[#64748b]">
                    <span className="font-medium">Student:</span> {selectedStudent.full_name}
                  </p>
                  <p className="text-xs text-[#64748b]">
                    <span className="font-medium">Email:</span> {selectedStudent.email}
                  </p>
                  <p className="text-xs text-[#64748b]">
                    <span className="font-medium">City:</span> {selectedStudent.city}
                  </p>
                  <p className="text-xs text-[#64748b]">
                    <span className="font-medium">Goals:</span> {selectedStudent.goals}
                  </p>
                  <div className="border-2 border-dashed border-[#e2e8f0] rounded-xl h-40 flex items-center justify-center text-xs text-[#94a3b8]">
                    {selectedStudent.payment_screenshot_url ? (
                      <img src={selectedStudent.payment_screenshot_url} alt="Payment proof" className="h-full object-contain rounded-lg" />
                    ) : (
                      "No payment screenshot uploaded"
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <label className="block text-xs font-medium text-[#1e3a5f]">Admin Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                    placeholder="Add internal notes..."
                  />
                </div>

                <div className="flex gap-3">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => updateStatus(selectedStudent.id, "under_review")}>
                    Mark Reviewing
                  </Button>
                  <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 focus:ring-green-600" onClick={() => updateStatus(selectedStudent.id, "approved")}>
                    Approve
                  </Button>
                  <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700 focus:ring-red-600" onClick={() => updateStatus(selectedStudent.id, "rejected")}>
                    Reject
                  </Button>
                </div>
              </Card>
            ) : (
              <Card hover={false} className="p-6 flex items-center justify-center h-full">
                <p className="text-sm text-[#94a3b8]">Select a submission to review</p>
              </Card>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

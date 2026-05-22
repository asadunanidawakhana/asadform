"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { supabase } from "@/lib/supabase";
import type { SupportRequest } from "@/lib/types";

export default function SupportPage() {
  const [requests, setRequests] = useState<SupportRequest[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    const { data } = await supabase
      .from("support_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setRequests(data);
    setLoading(false);
  };

  const resolve = async (id: string) => {
    await supabase
      .from("support_requests")
      .update({ status: "resolved", response: response || null })
      .eq("id", id);
    loadRequests();
    setResponse("");
    setSelected(null);
  };

  const selectedRequest = requests.find((r) => r.id === selected);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-bold text-[#1e3a5f] mb-8">Support Requests</h1>

      {loading ? (
        <div className="text-center py-12 text-[#64748b] text-sm">Loading...</div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {requests.length === 0 && (
              <div className="text-center py-12 text-[#64748b] text-sm">No support requests yet</div>
            )}
            {requests.map((req, i) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  hover={false}
                  className={`p-5 cursor-pointer transition-all ${
                    selected === req.id ? "ring-2 ring-[#1e3a5f]" : ""
                  }`}
                  onClick={() => setSelected(req.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-semibold text-[#1e3a5f]">{req.name}</h3>
                      <p className="text-xs text-[#64748b]">{req.email}</p>
                    </div>
                    <Badge variant={req.status === "open" ? "warning" : "success"}>
                      {req.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#64748b] line-clamp-2">{req.message}</p>
                  <p className="text-xs text-[#94a3b8] mt-2">
                    {new Date(req.created_at).toLocaleDateString()}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div>
            {selectedRequest ? (
              <Card hover={false} className="p-6">
                <h3 className="text-sm font-semibold text-[#1e3a5f] mb-4">
                  Respond to {selectedRequest.name}
                </h3>

                <div className="mb-4 p-3 rounded-xl bg-[#f8f9fc] text-sm text-[#64748b]">
                  {selectedRequest.message}
                </div>

                {selectedRequest.response && (
                  <div className="mb-4 p-3 rounded-xl bg-green-50 text-sm text-green-700">
                    Previous response: {selectedRequest.response}
                  </div>
                )}

                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] mb-4"
                  placeholder="Type your response..."
                />

                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => resolve(selectedRequest.id)}
                  disabled={!response.trim()}
                >
                  Send Response & Resolve
                </Button>
              </Card>
            ) : (
              <Card hover={false} className="p-6 flex items-center justify-center h-full">
                <p className="text-sm text-[#94a3b8]">Select a request to respond</p>
              </Card>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

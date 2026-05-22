"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { supabase } from "@/lib/supabase";
import type { Notification } from "@/lib/types";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setNotifications(data);
    setLoading(false);
  };

  const markRead = async (id: string) => {
    await supabase.from("notifications").update({ read: true }).eq("id", id);
    loadNotifications();
  };

  const unread = notifications.filter((n) => !n.read).length;

  const typeColors: Record<string, string> = {
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#1e3a5f]">
          Notifications
          {unread > 0 && (
            <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#1e3a5f] text-white text-xs">
              {unread}
            </span>
          )}
        </h1>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#64748b] text-sm">Loading...</div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-12 text-[#64748b] text-sm">No notifications yet</div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                hover={false}
                className={`p-4 cursor-pointer transition-colors ${
                  !n.read ? "bg-[#1e3a5f]/5 border-[#1e3a5f]/20" : ""
                }`}
                onClick={() => markRead(n.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${typeColors[n.type] || "bg-blue-500"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-semibold text-[#1e3a5f]">{n.title}</h3>
                      <span className="text-xs text-[#94a3b8]">
                        {new Date(n.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-[#64748b]">{n.message}</p>
                  </div>
                  {!n.read && <Badge variant="info">New</Badge>}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

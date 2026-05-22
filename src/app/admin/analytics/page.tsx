"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { supabase } from "@/lib/supabase";
import type { Enrollment } from "@/lib/types";

export default function AnalyticsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data } = await supabase.from("enrollments").select("*");
    if (data) setEnrollments(data);
    setLoading(false);
  };

  const total = enrollments.length;
  const approved = enrollments.filter((e) => e.status === "approved").length;
  const conversionRate = total ? ((approved / total) * 100).toFixed(1) : "0";
  const mobileEstimate = 68;

  const cityCount: Record<string, number> = {};
  enrollments.forEach((e) => {
    cityCount[e.city] = (cityCount[e.city] || 0) + 1;
  });
  const topCities = Object.entries(cityCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4);

  const dailyCount: Record<string, number> = {};
  enrollments.forEach((e) => {
    const day = new Date(e.created_at).toLocaleDateString("en-US", { weekday: "short" });
    dailyCount[day] = (dailyCount[day] || 0) + 1;
  });
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const trends = days.map((d) => ({ day: d, count: dailyCount[d] || 0 }));
  const maxCount = Math.max(...trends.map((t) => t.count), 1);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-bold text-[#1e3a5f] mb-8">Analytics</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Conversion Rate", value: `${conversionRate}%` },
          { label: "Total Enrollments", value: total },
          { label: "Approved", value: approved },
          { label: "Mobile Users", value: `${mobileEstimate}%` },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card hover={false} className="p-5">
              <p className="text-2xl font-bold text-[#1e3a5f]">{loading ? "..." : stat.value}</p>
              <p className="text-xs text-[#64748b] mt-1">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card hover={false} className="p-6 mb-8">
        <h2 className="text-lg font-semibold text-[#1e3a5f] mb-6">Weekly Enrollment Trend</h2>
        <div className="flex items-end gap-3 h-40">
          {trends.map((t, i) => (
            <div key={t.day} className="flex-1 flex flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(t.count / maxCount) * 100}%` }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="w-full rounded-lg bg-gradient-to-t from-[#1e3a5f] to-[#6c5ce7]"
                style={{ minHeight: t.count > 0 ? "4px" : "0px", maxHeight: "32px" }}
              />
              <span className="text-xs text-[#64748b]">{t.day}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card hover={false} className="p-6">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-4">Device Usage</h3>
          <div className="space-y-3">
            {[
              { label: "Mobile", value: 68, color: "bg-[#1e3a5f]" },
              { label: "Desktop", value: 22, color: "bg-[#6c5ce7]" },
              { label: "Tablet", value: 10, color: "bg-[#00cec9]" },
            ].map((d) => (
              <div key={d.label}>
                <div className="flex justify-between text-xs text-[#64748b] mb-1">
                  <span>{d.label}</span>
                  <span>{d.value}%</span>
                </div>
                <div className="h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${d.value}%` }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`h-full rounded-full ${d.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card hover={false} className="p-6">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-4">Top Cities</h3>
          {loading ? (
            <p className="text-sm text-[#64748b]">Loading...</p>
          ) : topCities.length === 0 ? (
            <p className="text-sm text-[#64748b]">No data yet</p>
          ) : (
            <div className="space-y-3">
              {topCities.map(([city, count]) => (
                <div key={city} className="flex items-center justify-between text-sm">
                  <span className="text-[#1e3a5f]">{city}</span>
                  <span className="text-[#64748b]">{count}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </motion.div>
  );
}

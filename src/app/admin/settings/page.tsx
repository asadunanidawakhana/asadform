"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import type { SiteSettings } from "@/lib/types";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { data } = await supabase.from("site_settings").select("*").single();
    if (data) setSettings(data);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!settings) return;
    await supabase.from("site_settings").update(settings).eq("id", settings.id);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (key: string, value: string | boolean) => {
    if (!settings) return;
    setSettings({ ...settings, [key]: value });
  };

  if (loading) {
    return <div className="text-center py-12 text-[#64748b] text-sm">Loading...</div>;
  }

  if (!settings) {
    return <div className="text-center py-12 text-[#64748b] text-sm">Run the database migration first</div>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Settings</h1>
        <div className="flex items-center gap-3">
          {saved && (
            <motion.span initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="text-sm text-green-600">
              Saved!
            </motion.span>
          )}
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>

      <div className="max-w-2xl space-y-6">
        <Card hover={false} className="p-6 space-y-5">
          <h2 className="text-lg font-semibold text-[#1e3a5f]">Batch Settings</h2>
          <Input label="Batch Name" name="batch_name" value={settings.batch_name} onChange={(e) => update("batch_name", e.target.value)} />
          <Input label="Batch Description" name="batch_description" value={settings.batch_description || ""} onChange={(e) => update("batch_description", e.target.value)} multiline />
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.enrollment_open}
              onChange={(e) => update("enrollment_open", e.target.checked)}
              className="rounded border-[#e2e8f0] text-[#1e3a5f] focus:ring-[#1e3a5f]"
            />
            <span className="text-sm font-medium text-[#1e3a5f]">Enrollment Open</span>
          </label>
        </Card>

        <Card hover={false} className="p-6 space-y-5">
          <h2 className="text-lg font-semibold text-[#1e3a5f]">Payment Settings</h2>
          <Input label="JazzCash Number" name="jazzcash_number" value={settings.jazzcash_number || ""} onChange={(e) => update("jazzcash_number", e.target.value)} />
          <Input label="Account Name" name="jazzcash_name" value={settings.jazzcash_name || ""} onChange={(e) => update("jazzcash_name", e.target.value)} />
        </Card>

        <Card hover={false} className="p-6 space-y-5">
          <h2 className="text-lg font-semibold text-[#1e3a5f]">Contact Settings</h2>
          <Input label="WhatsApp Number" name="whatsapp_number" value={settings.whatsapp_number || ""} onChange={(e) => update("whatsapp_number", e.target.value)} />
          <Input label="Support Email" name="support_email" type="email" value={settings.support_email || ""} onChange={(e) => update("support_email", e.target.value)} />
        </Card>

        <Card hover={false} className="p-6 space-y-5">
          <h2 className="text-lg font-semibold text-[#1e3a5f]">Hero Section</h2>
          <Input label="Hero Title" name="hero_title" value={settings.hero_title || ""} onChange={(e) => update("hero_title", e.target.value)} multiline />
          <Input label="Hero Subtitle" name="hero_subtitle" value={settings.hero_subtitle || ""} onChange={(e) => update("hero_subtitle", e.target.value)} multiline />
        </Card>
      </div>
    </motion.div>
  );
}

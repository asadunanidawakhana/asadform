"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rddjzywsfbtmoszmpnhn.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkZGp6eXdzZmJ0bW9zem1wbmhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0NTI2MjAsImV4cCI6MjA5NTAyODYyMH0.JgbmBkmSZODLDVEg55rlONaqqO8XucuJ-62ba5VbxDw";

const sb = createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false } });

export default function EnrollmentPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    goals: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.city.trim()) e.city = "City is required";
    if (!file) e.file = "Please upload payment screenshot";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result as string);
        r.onerror = reject;
        r.readAsDataURL(file!);
      });

      const id = crypto.randomUUID();

      const { error } = await sb.from("enrollments").insert({
        id,
        full_name: form.fullName,
        phone: form.phone,
        email: form.email,
        city: form.city,
        goals: form.goals || "",
        payment_screenshot_url: dataUrl,
        status: "pending",
      });

      if (error) {
        setErrors({ form: error.message });
        setSubmitting(false);
        return;
      }

      sessionStorage.setItem("enrollmentName", form.fullName);
      router.push("/success");
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : "Failed" });
      setSubmitting(false);
    }
  };

  const handleFile = (f: File | null) => {
    if (!f) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(f.type)) {
      setErrors({ file: "JPG, PNG, or WEBP only" });
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setErrors({ file: "Max 5MB" });
      return;
    }
    setFile(f);
    setErrors({});
    const r = new FileReader();
    r.onload = () => setPreview(r.result as string);
    r.readAsDataURL(f);
  };

  const copyNumber = (num: string) => navigator.clipboard.writeText(num);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#f8f9fc]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid lg:grid-cols-5 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f]">
                  Join Batch +1
                </h1>
                <p className="mt-3 text-[#64748b] leading-relaxed">
                  Only PKR 2,000 for 1.5 months of live training. Fill out the form, make the payment, and upload your proof to complete enrollment. Only 15 seats available!
                </p>
              </div>

              <Card hover={false} className="p-5 space-y-3">
                <h3 className="text-sm font-semibold text-[#1e3a5f]">Program Fee</h3>
                <p className="text-2xl font-bold text-[#1e3a5f]">PKR 2,000</p>
                <div className="space-y-2 text-sm text-[#64748b]">
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00cec9]" />
                    One-time payment — 1.5 months program
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00cec9]" />
                    Live online classes + Weekend Q&A
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00cec9]" />
                    Only 15 seats — Limited batch
                  </p>
                </div>
              </Card>

              <Card hover={false} className="p-5 space-y-4">
                <h3 className="text-sm font-semibold text-[#1e3a5f]">
                  Payment Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-[#f8f9fc]">
                    <div>
                      <p className="text-[#64748b] text-xs">JazzCash Number</p>
                      <p className="font-semibold text-[#1e3a5f]">0308 7817695</p>
                    </div>
                    <button
                      onClick={() => copyNumber("03087817695")}
                      className="text-xs font-medium text-[#1e3a5f] bg-white px-3 py-1.5 rounded-lg border border-[#e2e8f0] hover:bg-[#f1f5f9] transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-[#f8f9fc]">
                    <div>
                      <p className="text-[#64748b] text-xs">Account Name</p>
                      <p className="font-semibold text-[#1e3a5f]">Abdul razzaq</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card hover={false} className="p-5">
                <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">Need Help?</h3>
                <a
                  href="https://wa.me/923337629724"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-green-50 text-green-700 text-sm font-medium hover:bg-green-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3"
            >
              <Card hover={false} className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input label="Full Name" name="fullName" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} error={errors.fullName} placeholder="Your full name" />
                    <Input label="Phone Number" name="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} error={errors.phone} placeholder="03xx-xxxxxxx" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input label="Email Address" name="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} placeholder="your@email.com" />
                    <Input label="City" name="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} error={errors.city} placeholder="Your city" />
                  </div>
                  <Input label="Your Goals" name="goals" value={form.goals} onChange={(e) => setForm({ ...form, goals: e.target.value })} multiline placeholder="What do you want to achieve?" />

                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                    <p className="text-sm font-medium text-amber-800 mb-1">Send PKR 2,000 to JazzCash:</p>
                    <p className="text-sm text-amber-700"><strong>0308 7817695</strong> (Abdul razzaq)</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[#1e3a5f] mb-2">Upload Payment Screenshot *</p>
                    <div
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                        dragOver ? "border-[#1e3a5f] bg-[#1e3a5f]/5" : preview ? "border-green-300 bg-green-50/50" : "border-[#e2e8f0] hover:border-[#1e3a5f] hover:bg-[#f8f9fc]"
                      }`}
                    >
                      <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => handleFile(e.target.files?.[0] || null)} />
                      {preview ? (
                        <div className="space-y-2">
                          <img src={preview} alt="Preview" className="mx-auto max-h-40 rounded-lg object-contain" />
                          <p className="text-xs text-green-600">Click to change</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="mx-auto w-12 h-12 rounded-full bg-[#f1f5f9] flex items-center justify-center">
                            <svg className="w-6 h-6 text-[#64748b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium text-[#1e3a5f]">Tap to upload screenshot</p>
                          <p className="text-xs text-[#94a3b8]">JPG, PNG, WEBP (max 5MB)</p>
                        </div>
                      )}
                    </div>
                    {errors.file && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-500 mt-1">{errors.file}</motion.p>}
                  </div>

                  {errors.form && <p className="text-sm text-red-500">{errors.form}</p>}

                  <Button type="submit" size="lg" className="w-full" loading={submitting}>
                    {submitting ? "Submitting..." : "Submit Enrollment"}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

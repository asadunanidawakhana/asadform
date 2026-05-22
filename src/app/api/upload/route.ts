import { NextResponse } from "next/server";

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/+$/, "");
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const enrollmentId = formData.get("enrollmentId") as string;

    if (!file || !enrollmentId) {
      return NextResponse.json({ error: "Missing file or enrollment ID" }, { status: 400 });
    }

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
    }

    const ext = file.name.split(".").pop();
    const fileName = `${enrollmentId}-${Date.now()}.${ext}`;

    // Upload to Supabase Storage via REST API
    const fileBuffer = await file.arrayBuffer();
    const uploadRes = await fetch(
      `${supabaseUrl}/storage/v1/object/payment-screenshots/${fileName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": file.type,
          "Authorization": `Bearer ${supabaseAnonKey}`,
        },
        body: fileBuffer,
      }
    );

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      console.error("Storage upload failed:", errText);
      return NextResponse.json(
        { error: `Storage upload failed: ${errText}` },
        { status: 500 }
      );
    }

    const screenshotUrl = `${supabaseUrl}/storage/v1/object/public/payment-screenshots/${fileName}`;

    // Save URL to enrollment record
    const updateRes = await fetch(
      `${supabaseUrl}/rest/v1/enrollments?id=eq.${enrollmentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseAnonKey,
          "Authorization": `Bearer ${supabaseAnonKey}`,
          "Prefer": "return=minimal",
        },
        body: JSON.stringify({ payment_screenshot_url: screenshotUrl }),
      }
    );

    if (!updateRes.ok) {
      const errText = await updateRes.text();
      console.error("Failed to update enrollment:", errText);
      return NextResponse.json(
        { error: `Failed to save URL: ${errText}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: screenshotUrl }, { status: 200 });
  } catch (err) {
    console.error("Upload API error:", err);
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

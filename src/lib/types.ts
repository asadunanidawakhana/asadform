export interface Enrollment {
  id: string;
  created_at: string;
  full_name: string;
  phone: string;
  email: string;
  city: string;
  goals: string;
  status: "pending" | "under_review" | "approved" | "rejected";
  payment_screenshot_url: string | null;
  admin_notes: string | null;
  approved_at: string | null;
}

export interface AdminUser {
  id: string;
  email: string;
  role: "admin" | "superadmin";
  created_at: string;
}

export interface Notification {
  id: string;
  created_at: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  enrollment_id: string | null;
}

export interface SiteSettings {
  id: string;
  batch_name: string;
  batch_description: string;
  enrollment_open: boolean;
  jazzcash_number: string;
  jazzcash_name: string;
  whatsapp_number: string;
  support_email: string;
  hero_title: string;
  hero_subtitle: string;
}

export interface SupportRequest {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string;
  status: "open" | "resolved";
  response: string | null;
}

-- Mac Digital Agency Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enrollments table
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  goals TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')),
  payment_screenshot_url TEXT,
  admin_notes TEXT,
  approved_at TIMESTAMPTZ
);

-- Admin users table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'superadmin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  read BOOLEAN NOT NULL DEFAULT false,
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE
);

-- Site settings table
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_name TEXT NOT NULL DEFAULT 'Batch +1',
  batch_description TEXT DEFAULT '',
  enrollment_open BOOLEAN NOT NULL DEFAULT true,
  jazzcash_number TEXT DEFAULT '',
  jazzcash_name TEXT DEFAULT '',
  whatsapp_number TEXT DEFAULT '',
  support_email TEXT DEFAULT '',
  hero_title TEXT DEFAULT '',
  hero_subtitle TEXT DEFAULT ''
);

-- Support requests table
CREATE TABLE support_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'resolved')),
  response TEXT
);

-- Insert default settings
INSERT INTO site_settings (batch_name, batch_description, jazzcash_number, jazzcash_name, whatsapp_number, support_email, hero_title, hero_subtitle)
VALUES (
  'Batch +1',
  'Learn digital skills and start freelancing with Mac Digital Agency',
  '03087817695',
  'Abdul razzaq',
  '+923337629724',
  'support@macdigital.com',
  'Transform Your Skills With Mac Digital Agency',
  'Join Pakistan''s most comprehensive digital skills program. Learn from industry experts, work on real projects, and launch your freelancing career.'
);

-- Row Level Security
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_requests ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Admins can view all enrollments" ON enrollments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can update enrollments" ON enrollments FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Anyone can insert enrollments" ON enrollments FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Admins can view all notifications" ON notifications FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can update notifications" ON notifications FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Admins can view settings" ON site_settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can update settings" ON site_settings FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Admins can view support requests" ON support_requests FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can update support requests" ON support_requests FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Anyone can insert support requests" ON support_requests FOR INSERT TO anon WITH CHECK (true);

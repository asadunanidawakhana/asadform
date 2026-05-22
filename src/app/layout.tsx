import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mac Digital Agency — Batch +1 Enrollment",
  description:
    "Join Batch +1 — only PKR 2,000 for 1.5 months. Live online classes, YouTube automation, web dev with AI, social media marketing, and more. Only 15 seats!",
  openGraph: {
    title: "Mac Digital Agency — Batch +1 Enrollment",
    description:
      "Only PKR 2,000 for 1.5 months. Live online classes, AI tools, YouTube automation & more. Only 15 seats!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#0a0a0b]">
        {children}
      </body>
    </html>
  );
}

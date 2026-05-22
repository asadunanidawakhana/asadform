import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-8">
            Privacy Policy
          </h1>
          <div className="prose prose-sm max-w-none text-[#64748b] space-y-6">
            <p>
              At Mac Digital Agency, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.
            </p>
            <h2 className="text-lg font-semibold text-[#1e3a5f]">Information We Collect</h2>
            <p>
              We collect information you provide during enrollment including your name, phone number, email address, city, and payment proof screenshots.
            </p>
            <h2 className="text-lg font-semibold text-[#1e3a5f]">How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Process your enrollment application</li>
              <li>Verify payment submissions</li>
              <li>Communicate with you regarding the program</li>
              <li>Improve our services</li>
            </ul>
            <h2 className="text-lg font-semibold text-[#1e3a5f]">Data Protection</h2>
            <p>
              Your data is stored securely using encrypted connections and protected storage systems. Payment screenshots are only accessible to authorized administrative staff.
            </p>
            <h2 className="text-lg font-semibold text-[#1e3a5f]">Data Retention</h2>
            <p>
              We retain your enrollment data for the duration of the program and up to 12 months after completion for record-keeping purposes.
            </p>
            <h2 className="text-lg font-semibold text-[#1e3a5f]">Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of your personal data. Contact us at any time to exercise these rights.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

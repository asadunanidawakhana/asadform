import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-8">
            Terms & Conditions
          </h1>
          <div className="prose prose-sm max-w-none text-[#64748b] space-y-6">
            <p>
              By enrolling in Mac Digital Agency&apos;s Batch +1 program, you agree to the following terms and conditions.
            </p>
            <h2 className="text-lg font-semibold text-[#1e3a5f]">Enrollment Policy</h2>
            <p>
              Enrollment is confirmed only after payment verification. Your spot in the batch is secured once our team approves your application.
            </p>
            <h2 className="text-lg font-semibold text-[#1e3a5f]">Payment Policy</h2>
            <p>
              All fees are non-transferable. The enrollment fee covers the full batch training program. No additional charges apply during the program.
            </p>
            <h2 className="text-lg font-semibold text-[#1e3a5f]">Refund Policy</h2>
            <p>
              Refunds are considered on a case-by-case basis within 7 days of enrollment if the program has not commenced. Once the program starts, no refunds are applicable.
            </p>
            <h2 className="text-lg font-semibold text-[#1e3a5f]">Code of Conduct</h2>
            <p>
              Students are expected to maintain professional behavior, attend sessions regularly, and complete assigned work. Violation of conduct may result in removal from the program without refund.
            </p>
            <h2 className="text-lg font-semibold text-[#1e3a5f]">Platform Usage</h2>
            <p>
              You agree not to misuse the platform, attempt unauthorized access, or share your enrollment credentials with others.
            </p>
            <h2 className="text-lg font-semibold text-[#1e3a5f]">Changes to Terms</h2>
            <p>
              Mac Digital Agency reserves the right to update these terms at any time. Students will be notified of significant changes.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

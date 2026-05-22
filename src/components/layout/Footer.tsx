import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#e2e8f0] bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1e3a5f] text-white text-xs font-bold">
                M
              </div>
              <span className="text-lg font-bold text-[#1e3a5f]">Mac Digital</span>
            </div>
            <p className="text-sm text-[#64748b] leading-relaxed">
              Empowering the next generation of digital professionals through industry-focused education.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-[#64748b] hover:text-[#1e3a5f] transition-colors">Home</Link></li>
              <li><Link href="/enrollment" className="text-sm text-[#64748b] hover:text-[#1e3a5f] transition-colors">Enroll Now</Link></li>
              <li><Link href="/faq" className="text-sm text-[#64748b] hover:text-[#1e3a5f] transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm text-[#64748b] hover:text-[#1e3a5f] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-[#64748b] hover:text-[#1e3a5f] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-[#64748b] hover:text-[#1e3a5f] transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://wa.me/923337629724"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#64748b] hover:text-[#1e3a5f] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@macdigital.com"
                  className="text-sm text-[#64748b] hover:text-[#1e3a5f] transition-colors"
                >
                  Email Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#e2e8f0] text-center">
          <p className="text-xs text-[#94a3b8]">
            &copy; {new Date().getFullYear()} Mac Digital Agency. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1d3e40] text-white border-t border-white/20" id="footer">
      <div className="section-container pt-16 pb-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="group block space-y-0" id="footer-logo">
              <h3 className="font-serif text-3xl font-bold italic text-white leading-none group-hover:text-white/80 transition-colors">
                Goni&apos;s
              </h3>
              <h3 className="font-serif text-3xl font-bold italic text-white leading-none group-hover:text-white/80 transition-colors">
                Shea Butter
              </h3>
            </Link>
            <p className="font-sans text-xs md:text-sm text-white/90 leading-relaxed max-w-xs">
              100% Pure, Natural, Unrefined.
              <br />
              Proudly from Northern Nigeria.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-base md:text-lg font-bold text-white tracking-wide mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-white/80 hover:text-white hover:underline transition-all duration-200 text-sm font-sans"
                  id="footer-link-home"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-white/80 hover:text-white hover:underline transition-all duration-200 text-sm font-sans"
                  id="footer-link-shop"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/80 hover:text-white hover:underline transition-all duration-200 text-sm font-sans"
                  id="footer-link-about-us"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/bulk"
                  className="text-white/80 hover:text-white hover:underline transition-all duration-200 text-sm font-sans"
                  id="footer-link-bulk-wholesale"
                >
                  Bulk & Wholesale
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/80 hover:text-white hover:underline transition-all duration-200 text-sm font-sans"
                  id="footer-link-contact-us"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-sans text-base md:text-lg font-bold text-white tracking-wide mb-5">
              Customer Care
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/faq"
                  className="text-white/80 hover:text-white hover:underline transition-all duration-200 text-sm font-sans"
                  id="footer-link-faq"
                >
                  FAQ&apos;S
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-white/80 hover:text-white hover:underline transition-all duration-200 text-sm font-sans"
                  id="footer-link-shipping-delivery"
                >
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-white/80 hover:text-white hover:underline transition-all duration-200 text-sm font-sans"
                  id="footer-link-returns-refunds"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-white/80 hover:text-white hover:underline transition-all duration-200 text-sm font-sans"
                  id="footer-link-terms-conditions"
                >
                  Terms &amp; Consitions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-white/80 hover:text-white hover:underline transition-all duration-200 text-sm font-sans"
                  id="footer-link-privacy-policy"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-sans text-base md:text-lg font-bold text-white tracking-wide mb-5">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm font-sans text-white/90">
              <li>
                <a
                  href="mailto:gonisheabutter@gmail.com"
                  className="hover:text-white hover:underline transition-colors"
                  id="footer-link-email"
                >
                  gonisheabutter@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+2347044446070"
                  className="hover:text-white hover:underline transition-colors"
                  id="footer-link-phone"
                >
                  +234 704 444 6070
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-sans text-base md:text-lg font-bold text-white tracking-wide mb-5">
              Follow Us
            </h4>
            <div className="flex items-center gap-4">
              {/* WhatsApp */}
              <a
                href="https://wa.me/2347044446070"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="hover:opacity-80 transition-opacity"
                id="footer-social-whatsapp"
              >
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.417 9.863-9.848.002-2.63-1.023-5.101-2.884-6.963C16.58 1.932 14.11 .907 11.5 .907c-5.437 0-9.861 4.418-9.864 9.85a9.805 9.805 0 001.517 5.111L2.094 21.8l6.216-1.63zM16.64 13.91c-.279-.14-1.651-.814-1.907-.907-.256-.093-.442-.14-.628.14-.186.279-.718.907-.881 1.093-.163.186-.326.21-.605.07-.279-.14-1.18-.435-2.247-1.39-1.067-.953-1.785-2.128-1.995-2.477-.21-.349-.022-.538.117-.677.125-.124.279-.326.419-.488.14-.163.186-.279.279-.465.093-.186.047-.349-.023-.488-.07-.14-.628-1.512-.86-2.07-.227-.546-.456-.472-.628-.48-.163-.008-.349-.009-.535-.009-.186 0-.488.07-.744.349-.256.279-.977.953-.977 2.326s1 2.7 1.14 2.885c.14.186 1.968 3.006 4.767 4.21 2.8.186 2.8.79 3.3.74.5-.05 1.651-.674 1.884-1.326.233-.651.233-1.21.163-1.326-.07-.11-.256-.203-.535-.349z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/gonisheabutter"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:opacity-80 transition-opacity"
                id="footer-social-instagram"
              >
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* Linktree */}
              <a
                href="https://linktr.ee/gonisheabutter"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Linktree"
                className="hover:opacity-80 transition-opacity"
                id="footer-social-linktree"
              >
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.012 11.234l4.472-5.96a.965.965 0 011.545 1.159l-3.86 5.148h6.901a.965.965 0 010 1.93H14.17l3.86 5.149a.965.965 0 01-1.545 1.158l-4.472-5.96v7.352a.965.965 0 01-1.93 0v-7.352l-4.472 5.96a.965.965 0 01-1.545-1.158l3.86-5.149H2.43a.965.965 0 010-1.93h6.901l-3.86-5.148a.965.965 0 011.545-1.159l4.472 5.96V2.43a.965.965 0 011.93 0v8.804z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/gonisheabutter"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:opacity-80 transition-opacity flex items-end"
                id="footer-social-linkedin"
              >
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span className="text-[8px] text-white font-sans font-bold select-none leading-none mb-0.5 ml-0.5">®</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar — Copyright */}
        <div className="pt-10 mt-6">
          <div className="flex items-center justify-center gap-3 text-lg md:text-xl font-bold font-sans text-white select-none text-center">
            <svg className="w-7 h-7 md:w-8 md:h-8 text-white inline-block shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M14.83 14.83A4 4 0 1 1 14.83 9.17" />
            </svg>
            <span>2026 Goni&apos;s Shea Butter. All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

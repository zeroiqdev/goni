import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const partnerBenefits = [
  {
    title: "Premium Quality",
    description: "Pure, natural shea butter.",
  },
  {
    title: "Reliable Supply",
    description: "Consistent stock, every time.",
  },
  {
    title: "Better Margins",
    description: "Competitive wholesale pricing.",
  },
  {
    title: "Empower Women",
    description: "Supporting local producers.",
  },
  {
    title: "Trusted Brand",
    description: "Quality customers love.",
  },
];

export default function BulkPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20 animate-fade-in" id="bulk-page">
        {/* Banner Section */}
        <section
          className="relative w-full h-[200px] sm:h-[260px] md:h-[320px] lg:h-[400px] flex items-center overflow-hidden bg-[#e6cfb6]"
          id="bulk-banner"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://res.cloudinary.com/dyg7neetr/image/upload/v1780828208/Banner_d11u8g.png"
              alt="Bulk Shea Butter for Businesses That Care"
              fill
              priority
              className="object-contain object-right"
              sizes="100vw"
            />
            {/* Gradient mask to hide the leaf shadow on the left and blend seamlessly */}
            <div
              className="absolute inset-y-0 left-0 w-full sm:w-[75%] md:w-[65%] lg:w-[60%] z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, #e6cfb6 0%, #e6cfb6 70%, transparent 100%)" }}
            />
          </div>

          {/* Text Overlay */}
          <div className="section-container relative z-20 w-full">
            <div className="max-w-xl text-left space-y-2 sm:space-y-4">
              <h1 className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold italic text-brand-green leading-tight">
                Bulk Shea Butter<br />
                for Businesses<br />
                That Care
              </h1>
              <p className="font-google-sans text-[11px] sm:text-xs md:text-sm lg:text-base text-brand-green/90 max-w-xs sm:max-w-md leading-relaxed">
                Premium, 100% pure shea butter sourced from Northern Nigeria. Perfect for brands, manufacturers, and retail worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Trust Badge Banner — full width, end to end */}
        <section className="w-full bg-[#f3ece4] py-5 border-y border-[#e0cfc0]" id="bulk-trust-banner">
          <div className="w-full max-w-none px-6 sm:px-12 lg:px-24">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12 md:gap-x-16 lg:gap-x-24">

              {/* Women-Sourced */}
              <div className="flex items-center gap-2.5" id="trust-women-sourced">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#1b4d3e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="10" r="4" />
                  <circle cx="24" cy="10" r="4" />
                  <circle cx="18" cy="8" r="4.5" />
                  <path d="M4 28c0-4 3.6-7 8-7M32 28c0-4-3.6-7-8-7M10 21c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                <span className="font-google-sans text-sm font-semibold text-brand-green">Women-Sourced</span>
              </div>

              {/* Divider */}
              <div className="hidden sm:block h-6 w-px bg-brand-green/20" />

              {/* Handcrafted */}
              <div className="flex items-center gap-2.5" id="trust-handcrafted">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#1b4d3e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 6c0-1.1.9-2 2-2h.5a2 2 0 0 1 2 2v8" />
                  <path d="M17.5 6V5a2 2 0 0 1 2-2h.5a2 2 0 0 1 2 2v9" />
                  <path d="M22 7a2 2 0 0 1 2-2h.5a2 2 0 0 1 2 2v9c0 6-4 14-10.5 14C9.2 30 5 24 5 18v-4a2 2 0 0 1 2-2h.5a2 2 0 0 1 2 2v4" />
                  <path d="M13 8V6a2 2 0 0 0-2-2h-.5A2 2 0 0 0 8.5 6v8" />
                  <circle cx="18" cy="8" r="7" />
                  <path d="M14 8c1-2 5-4 8-2" />
                </svg>
                <span className="font-google-sans text-sm font-semibold text-brand-green">Handcrafted</span>
              </div>

              {/* Divider */}
              <div className="hidden sm:block h-6 w-px bg-brand-green/20" />

              {/* Nafdac */}
              <div className="flex items-center gap-2.5" id="trust-nafdac">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#1b4d3e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="6" width="28" height="24" rx="5" />
                  <text x="18" y="22" textAnchor="middle" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#1b4d3e" stroke="none">FDA</text>
                </svg>
                <span className="font-google-sans text-sm font-semibold text-brand-green">Nafdac No: A2-107554L</span>
              </div>

              {/* Divider */}
              <div className="hidden sm:block h-6 w-px bg-brand-green/20" />

              {/* 100% Natural */}
              <div className="flex items-center gap-2.5" id="trust-natural">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#1b4d3e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="18" r="14" />
                  <path d="M18 8c0 0-8 4-8 10s8 10 8 10" />
                  <path d="M18 8c0 0 8 4 8 10s-8 10-8 10" />
                  <path d="M8 18h20" />
                  <path d="M18 8c-2 4-2 16 0 20" />
                </svg>
                <span className="font-google-sans text-sm font-semibold text-brand-green">100% Natural</span>
              </div>

            </div>
          </div>
        </section>

        {/* Wholesale Options Section */}
        <section className="py-16 md:py-20 bg-white" id="wholesale-options">
          <div className="section-container">
            <h2 className="font-google-sans text-3xl md:text-4xl font-bold text-brand-green text-center mb-12">
              Wholesale Options
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* 200g Whipped */}
              <div className="bg-[#f3ece4] rounded-2xl p-8 py-10 flex flex-col items-center text-center gap-6" id="wholesale-card-200g">
                <div className="relative w-52 h-56">
                  <Image
                    src="https://res.cloudinary.com/dyg7neetr/image/upload/v1780561755/PHOTO-2026-05-03-00-49-01-removebg-preview_y7yk8s.png"
                    alt="200g Whipped Shea Butter"
                    fill
                    className="object-contain"
                    sizes="200px"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-google-sans text-2xl font-bold text-brand-green">200g Whipped</h3>
                  <p className="font-google-sans text-sm text-brand-green/70">Perfect for Personal Use</p>
                </div>
                <a
                  href="/bulk/quote"
                  className="mt-auto bg-brand-green text-white font-google-sans font-semibold text-sm px-10 py-3 rounded-md hover:bg-brand-green/90 transition-all duration-300"
                  id="wholesale-enquire-200g"
                >
                  Enquire Now
                </a>
              </div>

              {/* 1kg Pouch */}
              <div className="bg-[#f3ece4] rounded-2xl p-8 py-10 flex flex-col items-center text-center gap-6" id="wholesale-card-1kg">
                <div className="relative w-52 h-56">
                  <Image
                    src="https://res.cloudinary.com/dyg7neetr/image/upload/v1780561757/PHOTO-2026-05-03-00-49-02-removebg-preview_f05esa.png"
                    alt="1kg Pouch Shea Butter"
                    fill
                    className="object-contain"
                    sizes="200px"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-google-sans text-2xl font-bold text-brand-green">1kg Pouch</h3>
                  <p className="font-google-sans text-sm text-brand-green/70">Ideal for families and small businesses</p>
                </div>
                <a
                  href="/bulk/quote"
                  className="mt-auto bg-brand-green text-white font-google-sans font-semibold text-sm px-10 py-3 rounded-md hover:bg-brand-green/90 transition-all duration-300"
                  id="wholesale-enquire-1kg"
                >
                  Enquire Now
                </a>
              </div>

              {/* 15kg Bucket */}
              <div className="bg-[#f3ece4] rounded-2xl p-8 py-10 flex flex-col items-center text-center gap-6" id="wholesale-card-15kg">
                <div className="relative w-52 h-56">
                  <Image
                    src="https://res.cloudinary.com/dyg7neetr/image/upload/v1780561756/PHOTO-2026-05-03-00-49-02_2-removebg-preview_sin3mo.png"
                    alt="15kg Bulk Bucket Shea Butter"
                    fill
                    className="object-contain"
                    sizes="200px"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-google-sans text-2xl font-bold text-brand-green">15kg Bucket</h3>
                  <p className="font-google-sans text-sm text-brand-green/70">For wholesale &amp; large-scale use</p>
                </div>
                <a
                  href="/bulk/quote"
                  className="mt-auto bg-brand-green text-white font-google-sans font-semibold text-sm px-10 py-3 rounded-md hover:bg-brand-green/90 transition-all duration-300"
                  id="wholesale-enquire-15kg"
                >
                  Enquire Now
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* How Wholesale Ordering Works */}
        <section className="py-16 md:py-20 bg-[#f9f5f0]" id="how-it-works">
          <div className="section-container">
            <h2 className="font-google-sans text-3xl md:text-4xl font-bold text-brand-green text-center mb-14">
              How Wholesale Ordering Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

              {/* Step 1 — Choose Your Product */}
              <div className="flex flex-col items-center text-center gap-5" id="how-step-1">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#1b4d3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {/* Shopping bag */}
                  <rect x="18" y="28" width="44" height="42" rx="4" />
                  <path d="M30 28V22a10 10 0 0 1 20 0v6" />
                </svg>
                <div className="space-y-2">
                  <h3 className="font-google-sans text-xl font-bold text-brand-green">
                    1. Choose<br />Your Product
                  </h3>
                  <p className="font-google-sans text-sm text-brand-green/70 max-w-[220px] mx-auto leading-relaxed">
                    Select the size that suites your business needs.
                  </p>
                </div>
              </div>

              {/* Step 2 — Send Your Quantity Request */}
              <div className="flex flex-col items-center text-center gap-5" id="how-step-2">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#1b4d3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {/* Clipboard with pen */}
                  <rect x="16" y="10" width="40" height="56" rx="4" />
                  <line x1="26" y1="26" x2="46" y2="26" />
                  <line x1="26" y1="34" x2="46" y2="34" />
                  <line x1="26" y1="42" x2="40" y2="42" />
                  <line x1="26" y1="50" x2="36" y2="50" />
                  {/* Pen */}
                  <path d="M56 18l6-6 4 4-6 6-4-4z" />
                  <path d="M56 18l-6 6" />
                  <circle cx="22" cy="14" r="3" />
                  <circle cx="28" cy="14" r="3" />
                  <circle cx="34" cy="14" r="3" />
                  <circle cx="40" cy="14" r="3" />
                  <circle cx="46" cy="14" r="3" />
                </svg>
                <div className="space-y-2">
                  <h3 className="font-google-sans text-xl font-bold text-brand-green">
                    2. Send Your<br />Quantity Request
                  </h3>
                  <p className="font-google-sans text-sm text-brand-green/70 max-w-[220px] mx-auto leading-relaxed">
                    Contact us with your required quantity and business needs.
                  </p>
                </div>
              </div>

              {/* Step 3 — Receive Your Quote */}
              <div className="flex flex-col items-center text-center gap-5" id="how-step-3">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#1b4d3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {/* Envelope in circle */}
                  <circle cx="40" cy="40" r="30" />
                  <rect x="22" y="28" width="36" height="24" rx="3" />
                  <polyline points="22,28 40,44 58,28" />
                </svg>
                <div className="space-y-2">
                  <h3 className="font-google-sans text-xl font-bold text-brand-green">
                    3. Receive<br />Your Quote
                  </h3>
                  <p className="font-google-sans text-sm text-brand-green/70 max-w-[220px] mx-auto leading-relaxed">
                    We&apos;ll review and send you a competitive wholesale quote.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Partner Benefits Section */}
        <section className="bg-white pt-4 pb-0" id="bulk-partner-benefits">
          <div className="relative min-h-[460px] overflow-hidden rounded-none bg-[#ead3b7] sm:min-h-[500px] md:min-h-[430px] lg:min-h-[460px]">
            <Image
              src="https://res.cloudinary.com/dyg7neetr/image/upload/v1780831741/51998e24-c5c6-43b4-851d-2e88f4afb174_bqzbob.png"
              alt="Natural shea butter with shea nuts and leaves"
              fill
              className="object-cover object-left md:object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#ead3b7]/25" />

            <div className="section-container relative z-10 flex min-h-[460px] items-center py-6 sm:min-h-[500px] md:min-h-[430px] md:justify-end lg:min-h-[460px]">
              <div className="w-full rounded-xl bg-white/95 px-5 py-6 shadow-card backdrop-blur-sm sm:px-7 sm:py-7 md:max-w-[590px] md:translate-x-4 lg:max-w-[660px] lg:translate-x-8 lg:px-8 xl:translate-x-12">
                <h2 className="font-serif text-4xl font-bold leading-tight text-brand-green sm:text-5xl lg:text-[52px]">
                  Why Partner With Us?
                </h2>

                <ul className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
                  {partnerBenefits.map((benefit) => (
                    <li key={benefit.title} className="flex items-start gap-4 text-brand-green">
                      <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-green">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 12l4 4L19 6" />
                        </svg>
                      </span>
                      <span className="font-google-sans text-2xl leading-snug sm:text-[28px] lg:text-[30px]">
                        {benefit.title} &ndash; {benefit.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Final Contact CTA */}
        <section className="bg-brand-green py-14 text-white sm:py-16" id="bulk-growth-cta">
          <div className="section-container">
            <div className="grid items-center gap-8 md:grid-cols-[220px_1fr_auto] md:gap-10 lg:grid-cols-[260px_1fr_auto] lg:gap-12">
              <div className="flex justify-center md:justify-start">
                <svg
                  width="180"
                  height="140"
                  viewBox="0 0 220 160"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-auto w-36 sm:w-44 lg:w-52"
                >
                  <rect x="10" y="20" width="200" height="120" rx="14" />
                  <path d="M15 28l84 74c6 5 16 5 22 0l84-74" />
                  <path d="M15 134l70-68" />
                  <path d="M205 134l-70-68" />
                </svg>
              </div>

              <div className="text-center md:text-left">
                <h2 className="font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                  Let&apos;s Grow Together
                </h2>
                <p className="mt-4 max-w-2xl font-google-sans text-2xl leading-relaxed sm:text-3xl">
                  Tell us about your business needs and we&apos;ll get back to you with the best solution.
                </p>
              </div>

              <div className="flex justify-center md:justify-end">
                <a
                  href="/contact"
                  className="inline-flex min-h-[72px] min-w-[240px] items-center justify-center rounded-lg border-2 border-white px-8 font-google-sans text-2xl font-medium text-white transition-all duration-300 hover:bg-white hover:text-brand-green sm:min-w-[280px]"
                  id="bulk-growth-contact-btn"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

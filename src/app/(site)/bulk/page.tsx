import React from "react";
import Image from "next/image";
import Link from "next/link";
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
          className="relative w-full overflow-hidden"
          id="bulk-banner"
        >
          {/* Heading & breadcrumb are baked into the banner image;
              keep them accessible to screen readers and SEO. */}
          <div className="sr-only">
            <h1>Bulk Shea Butter for Businesses That Care</h1>
            <nav aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>&gt;</span>
              <span>Bulk &amp; Wholesale</span>
            </nav>
            <p>Premium, 100% pure shea butter sourced from Northern Nigeria. Perfect for brands, manufacturers, and retail worldwide.</p>
          </div>
          <Image
            src="https://res.cloudinary.com/dyg7neetr/image/upload/v1784800268/ChatGPT_Image_Jul_14_2026_11_16_40_AM_clnfbs.png"
            alt="Bulk Shea Butter for Businesses That Care — premium, 100% pure shea butter sourced from Northern Nigeria for brands, manufacturers, and retail worldwide"
            width={1983}
            height={793}
            priority
            className="w-full h-auto"
            sizes="100vw"
          />
        </section>

        {/* Trust Banner (Stacked: icon on top, text below, all in one row) */}
        <section className="bg-[#FAF2EA] py-5 border-y border-[#E9E1D7]/30 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16" id="bulk-trust-banner">
          <div className="flex flex-row items-start justify-between sm:justify-center gap-2 sm:gap-12 md:gap-16 lg:gap-24 text-[#1B4D3E]">
            {/* Badge 1: Women-Sourced */}
            <div className="flex flex-col items-center gap-1 sm:gap-2 flex-1 sm:flex-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 sm:w-10 sm:h-10 text-[#1B4D3E]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
              <span className="font-google-sans font-bold text-[10px] sm:text-lg md:text-xl lg:text-2xl text-center leading-tight">
                Women-Sourced
              </span>
            </div>

            {/* Badge 2: Handcrafted */}
            <div className="flex flex-col items-center gap-1 sm:gap-2 flex-1 sm:flex-none">
              <div className="relative w-6 h-6 sm:w-10 sm:h-10 flex-shrink-0">
                <Image
                  src="https://res.cloudinary.com/dyg7neetr/image/upload/v1782892990/Screenshot_2026-07-01_at_9.01.51_AM-removebg-preview_pqqp3t.png"
                  alt="Handcrafted"
                  fill
                  style={{ filter: "brightness(0) saturate(100%) invert(15%) sepia(91%) saturate(98%) hue-rotate(111deg) brightness(200%) contrast(179%)" }}
                  sizes="40px"
                />
              </div>
              <span className="font-google-sans font-bold text-[10px] sm:text-lg md:text-xl lg:text-2xl text-center leading-tight">
                Handcrafted
              </span>
            </div>

            {/* Badge 3: NAFDAC Approved */}
            <div className="flex flex-col items-center gap-1 sm:gap-2 flex-1 sm:flex-none">
              <div className="relative w-6 h-6 sm:w-10 sm:h-10 flex-shrink-0">
                <Image
                  src="https://res.cloudinary.com/dyg7neetr/image/upload/v1775042455/idZQnoE5i__1775042204657-removebg-preview_jtltnf.png"
                  alt="NAFDAC Approved"
                  fill
                  style={{ filter: "brightness(0) saturate(100%) invert(15%) sepia(91%) saturate(98%) hue-rotate(111deg) brightness(200%) contrast(179%)" }}
                  sizes="40px"
                />
              </div>
              <span className="font-google-sans font-bold text-[10px] sm:text-lg md:text-xl lg:text-2xl text-center leading-tight">
                NAFDAC Approved
              </span>
            </div>

            {/* Badge 4: Natural */}
            <div className="flex flex-col items-center gap-1 sm:gap-2 flex-1 sm:flex-none">
              <div className="relative w-6 h-6 sm:w-10 sm:h-10 flex-shrink-0">
                <Image
                  src="https://res.cloudinary.com/dyg7neetr/image/upload/v1775042870/organic_icon_sndktr.png"
                  alt="Natural"
                  fill
                  style={{ filter: "brightness(0) saturate(100%) invert(15%) sepia(91%) saturate(98%) hue-rotate(111deg) brightness(200%) contrast(179%)" }}
                  sizes="40px"
                />
              </div>
              <span className="font-google-sans font-bold text-[10px] sm:text-lg md:text-xl lg:text-2xl text-center leading-tight">
                Natural
              </span>
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
        <section className="bg-[#1d3e40] py-10 text-white sm:py-12 my-10 md:my-14" id="bulk-growth-cta">
          <div className="section-container">
            <div className="grid items-center gap-6 md:grid-cols-[160px_1fr_auto] md:gap-8 lg:grid-cols-[180px_1fr_auto] lg:gap-10">
              <div className="flex justify-center md:justify-start">
                <svg
                  width="120"
                  height="90"
                  viewBox="0 0 220 160"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-auto w-24 sm:w-28 lg:w-32"
                >
                  <rect x="10" y="20" width="200" height="120" rx="14" />
                  <path d="M15 28l84 74c6 5 16 5 22 0l84-74" />
                  <path d="M15 134l70-68" />
                  <path d="M205 134l-70-68" />
                </svg>
              </div>

              <div className="text-center md:text-left">
                <h2 className="font-serif text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                  Let&apos;s Grow Together
                </h2>
                <p className="mt-3 max-w-2xl font-google-sans text-sm leading-relaxed sm:text-base lg:text-lg">
                  Tell us about your business needs and we&apos;ll get back to you with the best solution.
                </p>
              </div>

              <div className="flex justify-center md:justify-end">
                <a
                  href="/contact"
                  className="inline-flex min-h-[48px] min-w-[180px] items-center justify-center rounded-lg bg-[#1B4D3E] hover:bg-[#153D31] px-6 font-google-sans text-sm font-semibold text-white transition-all duration-300 sm:min-w-[200px] sm:text-base shadow-md uppercase tracking-wider"
                  id="bulk-growth-contact-btn"
                >
                  Contact Us
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

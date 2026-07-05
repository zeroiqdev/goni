import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WholesaleFormClient from "@/components/WholesaleFormClient";

const trustItems = [
  {
    label: "Women-sourced",
    icon: (
      <svg width="52" height="52" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="32" cy="20" r="9" />
        <path d="M18 52c0-10 6-18 14-18s14 8 14 18" />
        <path d="M21 26c-4 2-7 6-7 12v14" />
        <path d="M43 26c4 2 7 6 7 12v14" />
      </svg>
    ),
  },
  {
    label: "Handcrafted",
    icon: (
      <svg width="52" height="52" viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
        <path d="M25 18a6 6 0 0 1 10 0 6 6 0 0 1 10 0c3 4 1 10-5 15L32 40l-8-7c-6-5-8-11-5-15Z" />
        <path d="M16 29c4 0 8 4 8 10v13h-8V29Z" />
        <path d="M48 29c-4 0-8 4-8 10v13h8V29Z" />
        <path d="M28 52V40h8v12h-8Z" />
      </svg>
    ),
  },
  {
    label: "Nafdac Approved",
    icon: (
      <svg width="58" height="58" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="28" cy="30" r="21" />
        <text x="28" y="36" textAnchor="middle" fontFamily="sans-serif" fontSize="17" fontWeight="700" fill="currentColor" stroke="none">FDA</text>
        <circle cx="48" cy="48" r="9" fill="#f8f3ef" />
        <path d="M44 48l4 4 7-9" />
      </svg>
    ),
  },
  {
    label: "Natural",
    icon: (
      <svg width="58" height="58" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 50c12-2 21-9 27-21" />
        <path d="M14 47C6 32 11 18 27 12c1 15-1 29-13 35Z" />
        <path d="M34 47c14-1 23-10 26-25-15 0-26 6-31 19" />
      </svg>
    ),
  },
];

const processSteps = [
  {
    title: "Submit Inquiry",
    description: "Fill out the form with your product and quantity needs.",
    icon: (
      <svg width="110" height="110" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M28 18h46l18 18v54a8 8 0 0 1-8 8H28a8 8 0 0 1-8-8V26a8 8 0 0 1 8-8Z" />
        <path d="M74 18v20h20" />
        <path d="M34 44h24" />
        <path d="M34 58h20" />
        <path d="M34 72h18" />
        <circle cx="78" cy="74" r="18" />
        <path d="M69 73l7 7 14-15" />
        <path d="M91 88l16 16" />
      </svg>
    ),
  },
  {
    title: "Receive Quote",
    description: "We confirm availability and send you a competitive quote.",
    icon: (
      <svg width="110" height="110" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 24h76a8 8 0 0 1 8 8v44a8 8 0 0 1-8 8H56L38 102V84H22a8 8 0 0 1-8-8V32a8 8 0 0 1 8-8Z" />
        <path d="M45 55h.1" />
        <path d="M60 55h.1" />
        <path d="M75 55h.1" />
      </svg>
    ),
  },
  {
    title: "Confirm Order",
    description: "You confirm the order and payment terms.",
    icon: (
      <svg width="110" height="110" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M32 28h56v82H32z" />
        <path d="M48 28v-8h8a8 8 0 0 1 16 0h8v8" />
        <path d="M42 46h36" />
        <path d="M42 60h36" />
        <path d="M42 74h28" />
        <circle cx="60" cy="92" r="12" />
        <path d="M54 92l5 5 10-10" />
      </svg>
    ),
  },
  {
    title: "Delivery",
    description: "Your order is packed and shipped to you.",
    icon: (
      <svg width="130" height="110" viewBox="0 0 140 120" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 66h18" />
        <path d="M10 48h30" />
        <path d="M22 84h20" />
        <path d="M44 28h58v60H44z" />
        <path d="M102 52h26l14 22v14h-40" />
        <path d="M112 58h15l8 14h-23z" />
        <circle cx="62" cy="92" r="13" />
        <circle cx="120" cy="92" r="13" />
      </svg>
    ),
  },
];

const availableSizes = [
  {
    name: "200g Whipped",
    imageSrc: "https://res.cloudinary.com/dyg7neetr/image/upload/v1780561755/PHOTO-2026-05-03-00-49-01-removebg-preview_y7yk8s.png",
    imageAlt: "200g Whipped Shea Butter",
  },
  {
    name: "1kg Pouch",
    imageSrc: "https://res.cloudinary.com/dyg7neetr/image/upload/v1780561757/PHOTO-2026-05-03-00-49-02-removebg-preview_f05esa.png",
    imageAlt: "1kg Pouch Shea Butter",
  },
  {
    name: "15kg Bucket",
    imageSrc: "https://res.cloudinary.com/dyg7neetr/image/upload/v1780561756/PHOTO-2026-05-03-00-49-02_2-removebg-preview_sin3mo.png",
    imageAlt: "15kg Bulk Bucket Shea Butter",
  },
];

function RequiredMark() {
  return <span className="ml-1 align-baseline text-base leading-none text-[#d92d20]">*</span>;
}

export default function WholesaleQuotePage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20 animate-fade-in" id="wholesale-quote-page">
        <section className="relative h-[130px] w-full overflow-hidden bg-[#efe0c5] sm:h-[180px] md:h-[240px] lg:h-[300px]" id="wholesale-quote-banner">
          <div className="absolute inset-y-0 right-0 w-[55%] sm:w-[65%] md:w-full">
            <Image
              src="https://res.cloudinary.com/dyg7neetr/image/upload/v1780834338/ChatGPT_Image_May_14_2026_04_28_09_PM_bvwts7.png"
              alt="Goni's Shea Butter wholesale product range"
              fill
              priority
              className="object-cover object-right"
              sizes="100vw"
            />
          </div>

          <div className="section-container relative z-10 flex h-full items-center">
            <div className="max-w-[180px] text-brand-green sm:max-w-sm md:max-w-lg">
              <h1 className="font-serif text-lg font-bold italic leading-tight sm:text-2xl md:text-4xl lg:text-5xl">
                Request a Wholesale Quote
              </h1>
              <nav className="font-google-sans text-[10px] sm:text-sm text-brand-green/80 mt-1 sm:mt-2 flex items-center gap-1.5 select-none">
                <Link href="/" className="hover:underline font-semibold text-brand-green">Home</Link>
                <span className="text-brand-green/45">&gt;</span>
                <span className="font-semibold text-brand-green">Request Quote</span>
              </nav>
              <p className="mt-3 hidden font-google-sans text-sm leading-relaxed md:block lg:text-base">
                Tell us about your business needs and we&apos;ll get back to you with pricing, availability, and delivery options for your business.
              </p>
            </div>
          </div>
        </section>

        {/* Trust Banner (Stacked: icon on top, text below, all in one row) */}
        <section className="bg-[#FAF2EA] py-5 border-y border-[#E9E1D7]/30 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16" id="wholesale-quote-trust-banner">
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


        <section className="bg-white py-12 md:py-16" id="wholesale-inquiry-form-section">
          <div className="section-container">
            <h2 className="text-center font-serif text-4xl font-bold italic leading-tight text-brand-green sm:text-5xl lg:text-6xl">
              Wholesale Inquiry Form
            </h2>

            <WholesaleFormClient />
          </div>
        </section>

        <section className="bg-white py-14 md:py-20" id="wholesale-how-it-works">
          <div className="section-container">
            <h2 className="text-center font-serif text-4xl font-bold italic leading-tight text-brand-green sm:text-5xl lg:text-6xl">
              How it works
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-10 text-center text-brand-green sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step) => (
                <div key={step.title} className="flex flex-col items-center">
                  <div className="flex h-32 items-center justify-center">
                    {step.icon}
                  </div>
                  <h3 className="mt-4 font-google-sans text-2xl font-bold">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-[260px] font-google-sans text-lg leading-relaxed text-brand-green">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="mt-16 text-center font-serif text-4xl font-bold italic leading-tight text-brand-green sm:text-5xl lg:text-6xl">
              Available Sizes
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
              {availableSizes.map((product) => (
                <div key={product.name} className="bg-[#f8f3ef] px-6 py-8 text-center text-brand-green">
                  <div className="relative mx-auto h-72 w-full max-w-[300px]">
                    <Image
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      fill
                      className="object-contain"
                      sizes="(min-width: 768px) 30vw, 90vw"
                    />
                  </div>
                  <h3 className="mt-8 font-google-sans text-3xl font-bold">
                    {product.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative h-[160px] w-full overflow-hidden bg-[#ead8bb] sm:h-[220px] md:h-[300px] lg:h-[380px] flex items-center justify-center" id="wholesale-final-banner">
          <Image
            src="https://res.cloudinary.com/dyg7neetr/image/upload/v1780834337/1d7c82b0-483c-4d3f-a90a-76835e1d9531_nxosjq.png"
            alt="Goni's Shea Butter wholesale banner"
            fill
            className="object-cover object-center pointer-events-none"
            sizes="100vw"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BLOG_CATEGORIES = ["Tips", "Skincare Guides", "Hair Care", "DIY Recipes"];

export default function BlogPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20 bg-brand-light-bg" id="blog-page">
        {/* Banner Section */}
        <section
          className="relative w-full h-[130px] sm:h-[180px] md:h-[240px] lg:h-[300px] flex items-center overflow-hidden mb-12"
          id="blog-banner"
          style={{ background: 'linear-gradient(to bottom, #ead5c1, #f5e5d5 35%, #f5e5d5 65%, #f1e0d2)' }}
        >
          <div className="absolute inset-0">
            <Image
              src="https://res.cloudinary.com/dyg7neetr/image/upload/v1782891961/ChatGPT_Image_May_12_2026_12_14_58_PM_2_sy45fz.png"
              alt="Our Blog Banner — Goni's Shea Butter products"
              fill
              priority
              className="object-contain object-right"
              sizes="100vw"
            />
          </div>

          <div className="relative z-10 section-container w-full">
            <div className="max-w-sm text-left">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold italic text-brand-green mb-2">
                Our Blog
              </h1>
              <nav className="font-google-sans text-xs sm:text-sm text-brand-green/80 mt-2 flex items-center gap-1.5 select-none">
                <Link href="/" className="hover:underline font-semibold text-brand-green">Home</Link>
                <span className="text-brand-green/45">&gt;</span>
                <span className="font-semibold text-brand-green">Our Blog</span>
              </nav>
              <p className="font-google-sans text-[11px] sm:text-xs md:text-sm lg:text-base text-brand-green/80 mt-3 max-w-xs leading-relaxed">
                Tips, stories, and guides on shea butter, skincare, and natural living.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white pb-7 pt-8 md:pb-8 md:pt-10" id="blog-lower-section">
          <div className="section-container">
            <div className="mx-auto grid max-w-[1054px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {BLOG_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  className="min-h-[64px] bg-[#f0e5d8] px-6 text-center font-google-sans text-xl font-bold text-[#264f4c] transition-colors hover:bg-[#e8dacb]"
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="h-36 md:h-52 lg:h-56" aria-hidden="true" />

            <div className="bg-[#f8f2ef] px-5 py-7 md:px-16 md:py-7" id="blog-stay-updated-banner">
              <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
                  <div className="relative h-20 w-20 flex-shrink-0 md:h-24 md:w-24">
                    <Image
                      src="https://res.cloudinary.com/dyg7neetr/image/upload/v1782891958/Screenshot_2026-07-01_at_8.43.43_AM-removebg-preview_q5w7x1.png"
                      alt="NAFDAC Approved"
                      fill
                      className="object-contain"
                      sizes="96px"
                    />
                  </div>
                  <div>
                    <h2 className="font-google-sans text-3xl font-bold leading-tight text-[#264f4c] md:text-4xl">
                      Stay Updated
                    </h2>
                    <p className="font-google-sans text-2xl leading-snug text-[#264f4c] md:text-3xl">
                      Subscribe to get natural skincare and tips.
                    </p>
                  </div>
                </div>

                <div className="bg-white px-5 py-3 md:px-7 md:py-4">
                  {isSubmitted ? (
                    <div className="font-google-sans text-base font-bold text-[#264f4c]">
                      Thank you for subscribing!
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <input
                        type="email"
                        placeholder="Enter your Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="min-h-[49px] min-w-0 flex-1 border-0 bg-white px-0 font-google-sans text-lg font-bold text-black outline-none placeholder:text-black sm:w-[280px]"
                        required
                        id="newsletter-email-input"
                      />
                      <button
                        type="submit"
                        className="min-h-[49px] bg-[#264f4c] px-7 font-google-sans text-sm font-bold text-white transition-colors hover:bg-[#1b3e3b]"
                        id="newsletter-submit-btn"
                      >
                        Subscribe
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

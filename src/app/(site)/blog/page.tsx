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
          className="relative w-full overflow-hidden mb-12"
          id="blog-banner"
        >
          {/* Heading & breadcrumb are baked into the banner image;
              keep them accessible to screen readers and SEO. */}
          <div className="sr-only">
            <h1>Our Blog</h1>
            <nav aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>&gt;</span>
              <span>Our Blog</span>
            </nav>
            <p>Tips, stories, and guides on shea butter, skincare, and natural living.</p>
          </div>
          <Image
            src="https://res.cloudinary.com/dyg7neetr/image/upload/v1784800267/ChatGPT_Image_Jul_14_2026_11_05_58_AM_rnnwnw.png"
            alt="Our Blog — tips, stories, and guides on shea butter, skincare, and natural living. Goni's Shea Butter products"
            width={1983}
            height={793}
            priority
            className="w-full h-auto"
            sizes="100vw"
          />
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

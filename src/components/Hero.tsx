"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="bg-white relative min-h-[calc(100vh-280px)] flex items-center pt-24 pb-16 overflow-hidden"
      id="hero-section"
    >
      <div className="section-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* ── Left: copy ── */}
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Heading */}
            <h1 className="font-google-sans text-4xl sm:text-5xl font-bold leading-[1.2] text-brand-green">
              Pure, Unrefined
              <br />
              Shea Butter from
              <br />
              Northern Nigeria
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-brand-muted font-google-sans leading-relaxed">
              Skin &amp; Hair Nourishment, Rooted
              <br />
              in Nature
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 bg-brand-green text-white px-7 py-3 text-sm font-google-sans font-semibold tracking-wide transition-all duration-300 hover:bg-brand-green-dark hover:shadow-md"
                id="hero-shop-now-btn"
              >
                Shop Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>

              <Link
                href="/bulk"
                className="inline-flex items-center gap-2 bg-white text-brand-dark px-7 py-3 text-sm font-google-sans font-semibold tracking-wide border border-brand-dark/30 transition-all duration-300 hover:border-brand-green hover:text-brand-green"
                id="hero-bulk-btn"
              >
                Buy In Bulk
              </Link>
            </div>
          </div>

          {/* ── Right: product image with purple border ── */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            {/* Product image — with rounded corners */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
              <Image
                src="https://res.cloudinary.com/dyg7neetr/image/upload/v1780560349/ChatGPT_Image_May_12_2026_12_14_58_PM_npy85w.png"
                alt="Goni's Shea Butter Products — Premium unrefined shea butter in various sizes"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function JoinCommunityClient() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20" id="join-community-section">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left Side: Form */}
          <div className="space-y-4 md:space-y-6 text-left">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold italic text-brand-green">
              Join Our Community
            </h2>
            <p className="font-google-sans text-base sm:text-lg md:text-xl font-bold text-brand-green leading-snug">
              Get tips, offers and updates on natural skincare.
            </p>

            {subscribed ? (
              <div className="bg-[#1B4D3E]/10 border-l-4 border-brand-green text-brand-green p-4 font-sans font-medium text-sm max-w-md">
                Thank you for joining our community! Look out for our updates soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg pt-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email Address"
                  className="flex-grow border border-gray-300 px-4 py-3.5 font-google-sans text-sm text-brand-green placeholder:text-gray-400 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green rounded-none"
                  id="community-email-input"
                />
                <button
                  type="submit"
                  className="bg-[#1B4D3E] hover:bg-[#153D31] text-white font-google-sans font-bold text-sm px-8 py-3.5 rounded-none uppercase tracking-wider transition-all duration-300 whitespace-nowrap"
                  id="community-subscribe-btn"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* Right Side: Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-full aspect-[4/3] max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px]">
              <Image
                src="https://res.cloudinary.com/dyg7neetr/image/upload/v1781593434/ChatGPT_Image_May_5__2026__02_15_45_PM-removebg-preview_szdwl9.png"
                alt="Shea Butter nuts and leaves"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

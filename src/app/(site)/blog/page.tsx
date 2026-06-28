"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BLOG_POSTS = [
  {
    id: "post-1",
    title: "The Ultimate Guide to Whipped Shea Butter: Benefits & Uses",
    excerpt: "Discover why whipped shea butter is a game-changer for your skincare routine. Learn how to apply it, store it, and maximize its moisturizing benefits.",
    category: "Skincare Guide",
    date: "June 25, 2026",
    readTime: "5 min read",
    image: "https://res.cloudinary.com/dyg7neetr/image/upload/v1781586653/cloudinary_banner_image_1781586653348.png",
    slug: "ultimate-guide-whipped-shea-butter",
  },
  {
    id: "post-2",
    title: "Sourcing Raw Shea Butter: Our Journey in Northern Nigeria",
    excerpt: "Step into our sourcing journey. Learn how we partner directly with local women cooperatives in Northern Nigeria to extract 100% pure, premium unrefined shea butter.",
    category: "Our Journey",
    date: "June 18, 2026",
    readTime: "8 min read",
    image: "https://res.cloudinary.com/dyg7neetr/image/upload/v1780563794/media_e08609b0-deab-4bac-9e9f-c05309057062_1780563794768.png",
    slug: "sourcing-raw-shea-butter-nigeria",
  },
  {
    id: "post-3",
    title: "Unrefined vs. Refined Shea Butter: What's the Difference?",
    excerpt: "Not all shea butter is created equal. We break down the processing differences, nutrient retention, and why raw, unrefined shea butter reigns supreme.",
    category: "Ingredient Spotlight",
    date: "June 10, 2026",
    readTime: "4 min read",
    image: "https://res.cloudinary.com/dyg7neetr/image/upload/v1780563824/media_e08609b0-deab-4bac-9e9f-c05309057062_1780563824975.png",
    slug: "unrefined-vs-refined-shea-butter",
  },
];

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
      <main className="flex-grow pt-32 pb-24 bg-brand-light-bg" id="blog-page">
        {/* Banner Section */}
        <section className="py-12 md:py-16 bg-[#f2e7db]/40 border-y border-brand-green/5 mb-16">
          <div className="section-container text-center">
            <span className="text-brand-gold text-sm font-semibold tracking-widest uppercase block mb-3 font-sans">
              Our Stories & Secrets
            </span>
            <h1 className="heading-xl text-4xl md:text-5xl font-bold text-brand-green mb-4">
              Goni's Natural Living Blog
            </h1>
            <p className="text-brand-muted max-w-xl mx-auto text-sm md:text-base leading-relaxed font-sans">
              Your source for natural skincare tips, cooperative stories from Northern Nigeria, and clean beauty guides.
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="section-container mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article 
                key={post.id} 
                className="bg-white rounded-2xl overflow-hidden border border-brand-green/5 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col h-full"
                id={`blog-${post.id}`}
              >
                {/* Image */}
                <div className="relative h-48 md:h-52 w-full bg-brand-cream/35">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 bg-brand-green text-white text-[10px] font-bold px-3 py-1 font-sans uppercase tracking-wider rounded-full">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-xs text-brand-muted mb-3 font-sans">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 bg-brand-green/20 rounded-full" />
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h2 className="font-serif text-lg md:text-xl font-semibold text-brand-dark mb-3 line-clamp-2 hover:text-brand-green transition-colors">
                    <Link href={`/blog/${post.slug}`} id={`blog-link-${post.id}`}>
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-brand-muted text-sm leading-relaxed font-sans mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-brand-green/5">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-semibold text-brand-gold hover:text-brand-gold-light uppercase tracking-wider flex items-center gap-1.5 font-sans"
                      id={`read-more-${post.id}`}
                    >
                      Read Article
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="section-container">
          <div className="bg-[#f2e7db] rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-brand-green/5 shadow-sm">
            <span className="text-brand-gold text-xs font-bold tracking-widest uppercase block mb-3 font-sans">
              Stay in the Loop
            </span>
            <h2 className="heading-md text-2xl md:text-3xl text-brand-green font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-brand-muted max-w-md mx-auto text-sm leading-relaxed font-sans mb-8">
              Get skincare tips, exclusive promotions, and community stories delivered straight to your inbox.
            </p>

            {isSubmitted ? (
              <div className="bg-white/60 text-brand-green py-3 px-6 rounded-xl inline-block font-sans text-sm font-semibold">
                🎉 Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow bg-white border border-brand-green/10 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-brand-green/30 font-sans text-brand-dark"
                  required
                  id="newsletter-email-input"
                />
                <button
                  type="submit"
                  className="bg-brand-green text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-brand-green/90 transition-colors text-sm font-sans"
                  id="newsletter-submit-btn"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

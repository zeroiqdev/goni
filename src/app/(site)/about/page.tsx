import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20 animate-fade-in" id="about-page">
        {/* Banner Section */}
        <section className="relative w-full h-[130px] sm:h-[180px] md:h-[240px] lg:h-[300px] flex items-center overflow-hidden bg-[#ebdcca]" id="about-banner">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://res.cloudinary.com/dyg7neetr/image/upload/v1780579068/25fa7b0f-ff47-4218-a04a-f5e6f8bb3595_mja5or.png"
              alt="About Us Banner — Shea butter ingredients on warm plaster background"
              fill
              priority
              className="object-contain object-right"
              sizes="100vw"
            />
          </div>

          {/* Text Overlay */}
          <div className="section-container relative z-10 w-full">
            <div className="max-w-xl text-left">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold italic text-brand-green">
                About Us
              </h1>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 md:py-24 bg-white" id="about-story">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Left Column — Image */}
              <div className="lg:col-span-5">
                <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden shadow-sm">
                  <Image
                    src="https://res.cloudinary.com/dyg7neetr/image/upload/v1780582671/Copy_of_51787619-f04e-48b2-88f3-b225d2d2cc94_m0nvnx.png"
                    alt="Women processing shea butter in Northern Nigeria"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>

              {/* Right Column — Text content */}
              <div className="lg:col-span-7 space-y-6">
                <h2 className="font-google-sans text-3xl md:text-4xl font-bold text-brand-green tracking-tight">
                  Our Story
                </h2>
                <div className="space-y-4">
                  <p className="font-sans text-base md:text-lg text-brand-green/85 leading-relaxed">
                    Goni&apos;s Shea Butter is more than a product, it&apos;s a purpose. We work with women in rural communities across Northern Nigeria to produce the highest quality shea butter using traditional methods passed down for generations.
                  </p>
                  <p className="font-sans text-base md:text-lg text-brand-green/85 leading-relaxed">
                    Every purchase you make supports these women, their families and their communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission · Vision · Values Section */}
        <section className="py-16 md:py-20 bg-[#F5EDE3]" id="about-mvv">
          <div className="section-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
              {/* Our Mission */}
              <div className="flex items-start gap-5">
                <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 relative">
                  <Image
                    src="https://res.cloudinary.com/dyg7neetr/image/upload/v1780582634/5_webqzu.png"
                    alt="Our Mission icon"
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h3 className="font-google-sans text-lg md:text-xl font-bold text-brand-green mb-2">
                    Our Mission
                  </h3>
                  <p className="font-sans text-sm md:text-base text-brand-green/80 leading-relaxed">
                    To provide natural, high-quality shea butter while empowering women and promoting ethical sourcing.
                  </p>
                </div>
              </div>

              {/* Our Vision */}
              <div className="flex items-start gap-5">
                <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 relative">
                  <Image
                    src="https://res.cloudinary.com/dyg7neetr/image/upload/v1780582634/6_oz78a5.png"
                    alt="Our Vision icon"
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h3 className="font-google-sans text-lg md:text-xl font-bold text-brand-green mb-2">
                    Our Vision
                  </h3>
                  <p className="font-sans text-sm md:text-base text-brand-green/80 leading-relaxed">
                    To become a trusted shea butter brand known for quality, consistency, and positive impact.
                  </p>
                </div>
              </div>

              {/* Our Values */}
              <div className="flex items-start gap-5">
                <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 relative">
                  <Image
                    src="https://res.cloudinary.com/dyg7neetr/image/upload/v1780582634/7_zyqdlv.png"
                    alt="Our Values icon"
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h3 className="font-google-sans text-lg md:text-xl font-bold text-brand-green mb-2">
                    Our Values
                  </h3>
                  <p className="font-sans text-sm md:text-base text-brand-green/80 leading-relaxed">
                    Integrity, quality, empowerment and sustainability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* White spacer */}
        <div className="h-12 bg-white" />
      </main>
      <Footer />
    </>
  );
}

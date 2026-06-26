import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormClient from "@/components/ContactFormClient";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20 animate-fade-in" id="contact-page">
        {/* Banner Section */}
        <section className="relative w-full h-[130px] sm:h-[180px] md:h-[240px] lg:h-[300px] flex items-center overflow-hidden bg-[#f6e9db]" id="contact-banner">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://res.cloudinary.com/dyg7neetr/image/upload/v1780583927/979503d7-809e-4a88-823a-e3d499954332_vbc8mn.png"
              alt="Contact Us Banner — Goni's Shea Butter products display"
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
                Contact Us
              </h1>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 md:py-24 bg-white" id="contact-form-section">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left Column — Info */}
              <div className="space-y-6">
                <h2 className="font-google-sans text-2xl md:text-3xl font-bold text-brand-green">
                  We&apos;d Love to Hear from You
                </h2>
                <p className="font-google-sans text-base md:text-lg text-brand-green/80 leading-relaxed max-w-md">
                  Have a question, order request, wholesale inquiry, or business partnership opportunity? Send us a message and we&apos;ll get back to you.
                </p>

                <div className="space-y-4 pt-4">
                  <div>
                    <h4 className="font-google-sans text-base font-bold text-brand-green">
                      Email
                    </h4>
                    <a
                      href="mailto:gonisheabutter@gmail.com"
                      className="font-google-sans text-sm md:text-base text-brand-green/80 hover:text-brand-green hover:underline transition-colors"
                      id="contact-email-link"
                    >
                      gonisheabutter@gmail.com
                    </a>
                  </div>
                  <div>
                    <h4 className="font-google-sans text-base font-bold text-brand-green">
                      Phone
                    </h4>
                    <a
                      href="tel:+2347044446070"
                      className="font-google-sans text-sm md:text-base text-brand-green/80 hover:text-brand-green hover:underline transition-colors"
                      id="contact-phone-link"
                    >
                      +234 704 444 6070
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column — Form */}
              <div>
                <ContactFormClient />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

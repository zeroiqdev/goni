import React from "react";
import Image from "next/image";

const benefits = [
  {
    imageSrc: "https://res.cloudinary.com/dyg7neetr/image/upload/v1780564928/Screenshot_2026-06-04_at_10.17.15_AM-removebg-preview_gxganm.png",
    title: "Deeply Moisturizes",
    description: "Nourishes and hydrates dry skin.",
  },
  {
    imageSrc: "https://res.cloudinary.com/dyg7neetr/image/upload/v1780565054/Screenshot_2026-06-04_at_10.17.36_AM-removebg-preview_kjncad.png",
    title: "Soothes & Repairs",
    description: "Helps mild irritation and repairs damaged skin.",
  },
  {
    imageSrc: "https://res.cloudinary.com/dyg7neetr/image/upload/v1780564919/Screenshot_2026-06-04_at_10.17.53_AM-removebg-preview_cr94bl.png",
    title: "Natural Glow",
    description: "Promotes healthy, smooth and radiant skin.",
  },
  {
    imageSrc: "https://res.cloudinary.com/dyg7neetr/image/upload/v1780564898/Screenshot_2026-06-04_at_10.18.20_AM-removebg-preview_hgnbbq.png",
    title: "Safe For All Skin Types",
    description: "Gentle, natural and chemical free.",
  },
];

export default function Benefits() {
  return (
    <section className="py-12 md:py-16 bg-[#FDFBF7]" id="benefits-section">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-sans text-brand-green text-lg md:text-xl font-bold tracking-wider uppercase">
            Why You&apos;ll Love It
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="flex items-center lg:items-start gap-4 p-2"
            >
              <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
                <Image
                  src={benefit.imageSrc}
                  alt={benefit.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 56px, 64px"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-sans text-brand-green text-base md:text-lg font-bold leading-tight">
                  {benefit.title}
                </h3>
                <p className="font-sans text-sm text-brand-green/85 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/providers/CartContext";

interface ProductDetailClientProps {
  product: {
    id: string;
    title: string;
    slug: string;
    price: number;
    compareAtPrice?: number;
    weight?: string;
    imageUrl: string;
    imageAlt: string;
    descriptionText: string;
    ingredientsText?: string;
    howToUseText?: string;
    shippingAndDeliveryText?: string;
    returnAndRefundsText?: string;
    images: Array<{ url: string; alt: string }>;
    inStock: boolean;
  };
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const accordionSections = [
    {
      id: "description",
      title: "Description",
      content: product.descriptionText || "Whipped Natural Shea Butter with no added chemicals, no artificial colour, no fragrance, and no harsh ingredients.",
    },
    {
      id: "ingredients",
      title: "Ingredients",
      content: product.ingredientsText || "Shea Butter (Vitellaria Paradoxa).",
    },
    {
      id: "how-to-use",
      title: "How to Use",
      content: product.howToUseText || "Apply a small amount to clean skin and massage gently until absorbed. For best results, use after bathing or showering while the skin is still slightly damp. It can also be used on dry areas such as hands, feet, elbows and knees. For hair use, apply a small amount to the scalp or hair ends to help seal in moisture.",
    },
    {
      id: "shipping-delivery",
      title: "Shipping & Delivery",
      content: product.shippingAndDeliveryText || "Orders are processed after payment confirmation. Delivery times may vary based on location, and customers will receive delivery details once their order is confirmed. Please ensure your delivery address and phone number are accurate before checkout.",
    },
    {
      id: "returns-refunds",
      title: "Returns & Refunds",
      content: product.returnAndRefundsText || "For hygiene and safety reasons, returns are only accepted for items that arrive damaged, defective, or incorrect. Please notify us within 24–48 hours of delivery with clear photos of the product and packaging. Items must be unused, unopened, and in their original packaging. Approved claims will be eligible for a refund or replacement.",
    },
  ];

  // Fallback to primary imageUrl if images array is empty
  const productImages = product.images && product.images.length > 0
    ? product.images
    : [{ url: product.imageUrl, alt: product.imageAlt }];

  const activeImage = productImages[activeImageIndex] || productImages[0];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      slug: product.slug,
      price: product.price,
      weight: product.weight || "",
      imageUrl: product.imageUrl,
    }, quantity);

    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  return (
    <div className="space-y-16">
      {/* Product Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="product-detail-info">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Active Image Display */}
          <div className="bg-white flex items-center justify-center p-6 aspect-square relative overflow-hidden shadow-sm">
            <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px]">
              <Image
                src={activeImage.url}
                alt={activeImage.alt}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Thumbnails Row (Exactly 3 slots, populated or empty) */}
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((index) => {
              const image = productImages[index];
              if (image) {
                return (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`bg-white aspect-square relative border-2 overflow-hidden p-2 transition-all duration-300 ${
                      activeImageIndex === index
                        ? "border-[#1B4D3E] shadow-sm"
                        : "border-transparent hover:border-[#1B4D3E]/30"
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-contain"
                        sizes="120px"
                      />
                    </div>
                  </button>
                );
              } else {
                // Empty thumbnail placeholders matching the Canva design
                return (
                  <div
                    key={index}
                    className="bg-[#FAF8F5] aspect-square flex items-center justify-center text-brand-muted/30"
                  />
                );
              }
            })}
          </div>
        </div>

        {/* Right Column: Product Information */}
        <div className="lg:col-span-6 flex flex-col justify-start space-y-6 lg:pl-4">
          {/* Title */}
          <div className="space-y-1">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold italic text-brand-green leading-tight">
              {product.title}
            </h1>
          </div>

          {/* Price */}
          <div className="pt-1">
            <span className="text-3xl font-sans font-bold text-[#1B4D3E]">
              N{product.price.toLocaleString()}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-lg text-brand-muted line-through font-sans ml-3">
                N{product.compareAtPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-brand-dark/95 leading-relaxed font-sans font-normal">
            {product.descriptionText}
          </p>

          {/* Checklist with circular outline SVG icons */}
          <div className="space-y-4 pt-2">
            {/* item 1 */}
            <div className="flex items-center gap-3 text-base font-semibold text-[#1B4D3E]">
              <div className="w-7 h-7 rounded-full border border-[#1B4D3E] flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#1B4D3E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <span className="font-sans">100% Natural</span>
            </div>

            {/* item 2 */}
            <div className="flex items-center gap-3 text-base font-semibold text-[#1B4D3E]">
              <div className="w-7 h-7 rounded-full border border-[#1B4D3E] flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#1B4D3E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z" />
                </svg>
              </div>
              <span className="font-sans">No Chemicals</span>
            </div>

            {/* item 3 */}
            <div className="flex items-center gap-3 text-base font-semibold text-[#1B4D3E]">
              <div className="w-7 h-7 rounded-full border border-[#1B4D3E] flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#1B4D3E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393l-1.135-1.135a2.25 2.25 0 01-2.25-2.25v-.31c0-.462-.184-.904-.512-1.232l-1.135-1.135a2.25 2.25 0 00-2.25-2.25h-.31a2.25 2.25 0 00-2.25 2.25v.31a2.25 2.25 0 00-2.25 2.25v.31a2.25 2.25 0 00-2.25 2.25v.31a2.25 2.25 0 00-2.25 2.25v.31c0 .462-.184.904-.512 1.232l-1.135 1.135a2.25 2.25 0 00-2.25 2.25v.31a2.25 2.25 0 00-2.25 2.25v.31a2.25 2.25 0 00-2.25 2.25v.31a2.25 2.25 0 00-2.25 2.25v.31c0 .462.184.904.512 1.232l1.135 1.135a2.25 2.25 0 002.25 2.25h.31a2.25 2.25 0 002.25-2.25v-.31a2.25 2.25 0 002.25-2.25v-.31a2.25 2.25 0 002.25-2.25v-.31a2.25 2.25 0 002.25-2.25v-.31c0-.462.184-.904.512-1.232l1.135-1.135a2.25 2.25 0 012.25-2.25h.31a2.25 2.25 0 012.25 2.25v.31z" />
                </svg>
              </div>
              <span className="font-sans">Deep Moisturizing</span>
            </div>

            {/* item 4 */}
            <div className="flex items-center gap-3 text-base font-semibold text-[#1B4D3E]">
              <div className="w-7 h-7 rounded-full border border-[#1B4D3E] flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#1B4D3E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0ZM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <span className="font-sans">For All Skin Types</span>
            </div>

            {/* Stock status indicator */}
            <div className="flex items-center gap-3 text-base font-semibold text-[#1B4D3E] pt-2">
              <div
                className={`h-7 w-7 flex-shrink-0 rounded-full ${
                  product.inStock ? "bg-[#1B4D3E]" : "bg-red-600"
                }`}
                aria-hidden="true"
              />
              <span className="font-sans">{product.inStock ? "In Stock" : "Out of Stock"}</span>
            </div>
          </div>

          {/* Minimalist Quantity Selector */}
          <div className="flex items-center gap-6 text-[#1B4D3E] py-4 select-none">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-3xl font-light hover:scale-110 active:scale-95 transition-transform px-3"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="text-xl font-bold font-sans w-6 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-3xl font-light hover:scale-110 active:scale-95 transition-transform px-3"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="bg-[#1B4D3E] hover:bg-[#153D31] text-white py-4 px-8 rounded-lg text-sm font-semibold font-sans uppercase tracking-wider transition-all duration-300 shadow-md min-w-[200px] disabled:opacity-50 text-center"
            >
              {addedFeedback ? "✓ Added to Cart!" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      {/* Trust Banner (Icon + text side by side, all in one row) */}
      <section className="bg-[#FAF2EA] py-5 border-y border-[#E9E1D7]/30 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12 xl:-mx-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16" id="product-trust-banner">
        <div className="flex flex-row items-center justify-between sm:justify-center gap-3 sm:gap-12 md:gap-16 lg:gap-24 text-[#1B4D3E]">
          {/* Badge 1: Women-Sourced */}
          <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 sm:w-10 sm:h-10 text-[#1B4D3E] flex-shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              />
            </svg>
            <span className="font-google-sans font-bold text-[9px] sm:text-lg md:text-xl lg:text-2xl whitespace-nowrap">
              Women-Sourced
            </span>
          </div>

          {/* Badge 2: Handcrafted */}
          <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
            <div className="relative w-5 h-5 sm:w-10 sm:h-10 flex-shrink-0">
              <Image
                src="https://res.cloudinary.com/dyg7neetr/image/upload/v1782892990/Screenshot_2026-07-01_at_9.01.51_AM-removebg-preview_pqqp3t.png"
                alt="Handcrafted"
                fill
                style={{ filter: "brightness(0) saturate(100%) invert(15%) sepia(91%) saturate(98%) hue-rotate(111deg) brightness(200%) contrast(179%)" }}
                sizes="40px"
              />
            </div>
            <span className="font-google-sans font-bold text-[9px] sm:text-lg md:text-xl lg:text-2xl whitespace-nowrap">
              Handcrafted
            </span>
          </div>

          {/* Badge 3: NAFDAC Approved */}
          <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
            <div className="relative w-5 h-5 sm:w-10 sm:h-10 flex-shrink-0">
              <Image
                src="https://res.cloudinary.com/dyg7neetr/image/upload/v1775042455/idZQnoE5i__1775042204657-removebg-preview_jtltnf.png"
                alt="NAFDAC Approved"
                fill
                style={{ filter: "brightness(0) saturate(100%) invert(15%) sepia(91%) saturate(98%) hue-rotate(111deg) brightness(200%) contrast(179%)" }}
                sizes="40px"
              />
            </div>
            <span className="font-google-sans font-bold text-[9px] sm:text-lg md:text-xl lg:text-2xl whitespace-nowrap">
              NAFDAC Approved
            </span>
          </div>

          {/* Badge 4: Natural */}
          <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
            <div className="relative w-5 h-5 sm:w-10 sm:h-10 flex-shrink-0">
              <Image
                src="https://res.cloudinary.com/dyg7neetr/image/upload/v1775042870/organic_icon_sndktr.png"
                alt="Natural"
                fill
                style={{ filter: "brightness(0) saturate(100%) invert(15%) sepia(91%) saturate(98%) hue-rotate(111deg) brightness(200%) contrast(179%)" }}
                sizes="40px"
              />
            </div>
            <span className="font-google-sans font-bold text-[9px] sm:text-lg md:text-xl lg:text-2xl whitespace-nowrap">
              Natural
            </span>
          </div>
        </div>
      </section>

      {/* Accordion collapsable and expandable section */}
      <div className="border-t border-[#e2d5c5]" id="product-accordion-details">
        {accordionSections.map((section) => {
          const isOpen = !!openSections[section.title];
          return (
            <div key={section.id} className="border-b border-[#e2d5c5] overflow-hidden">
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between py-5 px-1 text-left transition-colors hover:bg-[#1B4D3E]/5 group select-none"
                id={`accordion-btn-${section.id}`}
              >
                <span className="font-google-sans text-base sm:text-lg font-bold text-[#1B4D3E] tracking-wide">
                  {section.title}
                </span>
                <span className="text-[#1B4D3E] text-xl font-bold w-6 h-6 flex items-center justify-center font-mono">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              
              {/* Expandable Content Panel */}
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-[500px] opacity-100 pb-6 px-1" : "max-h-0 opacity-0 pointer-events-none"
                }`}
                style={{ transitionProperty: "max-h, opacity, padding" }}
              >
                <div className="font-sans text-brand-dark/90 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {typeof section.content === "string" ? (
                    <p>{section.content}</p>
                  ) : (
                    section.content
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

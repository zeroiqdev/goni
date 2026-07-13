"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/providers/CartContext";

interface ProductCardProps {
  id: string;
  title: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  weight?: string;
  cardWeightLabel?: string;
  imageUrl: string;
  imageAlt: string;
  subtitle?: string;
  isWholesale?: boolean;
}

export default function ProductCard({
  id,
  title,
  slug,
  price,
  compareAtPrice,
  weight,
  cardWeightLabel,
  imageUrl,
  imageAlt,
  subtitle,
  isWholesale = false,
}: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div 
      className="bg-[#f3ece4] border border-[#e2d5c5] transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col h-full p-6 text-center group" 
      id={`product-card-${slug}`}
    >
      {/* Image */}
      <Link href={`/shop/${slug}`} className="block relative overflow-hidden mb-5">
        <div className="relative w-full aspect-square bg-[#eae0d5]">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        {/* Discount badge */}
        {compareAtPrice && compareAtPrice > price && !isWholesale && (
          <div className="absolute top-3 left-3 bg-brand-gold text-white text-[10px] font-bold px-2.5 py-1 font-sans uppercase tracking-wider">
            Save {Math.round(((compareAtPrice - price) / compareAtPrice) * 100)}%
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="flex-grow flex flex-col justify-between">
        <div className="space-y-2 mb-4">
          <Link href={`/shop/${slug}`} className="block">
            <h3 className="font-google-sans text-lg sm:text-xl font-bold text-[#1B4D3E] hover:underline transition-all duration-200">
              {title}
            </h3>
          </Link>
          {subtitle && (
            <p className="text-sm text-brand-muted font-sans font-medium italic">
              {subtitle}
            </p>
          )}
          {cardWeightLabel && (
            <p className="text-xs text-brand-green font-google-sans font-semibold uppercase tracking-wider">
              {cardWeightLabel}
            </p>
          )}
          {!isWholesale ? (
            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="text-xl font-bold text-brand-dark font-sans">
                ₦{price.toLocaleString()}
              </span>
              {compareAtPrice && compareAtPrice > price && (
                <span className="text-sm text-brand-muted line-through font-sans">
                  ₦{compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>
          ) : (
            <div className="text-sm font-semibold text-brand-gold font-sans pt-1">
              Bulk Wholesale Pricing
            </div>
          )}
        </div>

        {isWholesale ? (
          <Link
            href={`/bulk/quote?product=${encodeURIComponent(title)}`}
            className="block w-full text-center bg-[#1B4D3E] text-white py-3.5 px-4 rounded-lg text-sm font-semibold font-sans
                       hover:bg-[#153D31] transition-all duration-300 uppercase tracking-wider shadow-sm"
            id={`request-quote-${slug}`}
          >
            Request Quote
          </Link>
        ) : (
          <button
            onClick={() => addToCart({ id, title, slug, price, weight: weight || "", imageUrl })}
            className="w-full bg-[#1B4D3E] text-white py-3.5 px-4 rounded-lg text-sm font-semibold font-sans
                       hover:bg-[#153D31] transition-all duration-300 uppercase tracking-wider shadow-sm"
            id={`add-to-cart-${slug}`}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

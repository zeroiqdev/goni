import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShopClient from "@/components/ShopClient";
import JoinCommunityClient from "@/components/JoinCommunityClient";
import { getPayload } from "payload";
import config from "../../../../payload.config";

interface ProductType {
  id: string;
  title: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  weight: string;
  cardWeightLabel?: string;
  imageUrl: string;
  imageAlt: string;
  categoryName: string;
  subtitle?: string;
  isWholesale?: boolean;
}

async function getProducts(): Promise<ProductType[]> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "products",
      where: {
        inStock: {
          equals: true,
        },
      },
      limit: 20,
    });

    if (result.docs.length > 0) {
      return result.docs.map((doc: any) => {
        const imageDoc = doc.images?.[0]?.image;
        const imageUrl = typeof imageDoc === 'object' && imageDoc?.url
          ? imageDoc.url
          : "https://res.cloudinary.com/dyg7neetr/image/upload/v1780561755/PHOTO-2026-05-03-00-49-01-removebg-preview_y7yk8s.png";
        
        const catDoc = doc.category;
        const categoryName = typeof catDoc === 'object' && catDoc?.title
          ? catDoc.title
          : "Raw Shea Butter";

        return {
          id: doc.id,
          title: doc.title,
          slug: doc.slug,
          price: doc.price,
          compareAtPrice: doc.compareAtPrice || undefined,
          weight: doc.weight,
          cardWeightLabel: doc.cardWeightLabel || undefined,
          imageUrl,
          imageAlt: doc.title,
          categoryName,
          subtitle: doc.subtitle || undefined,
          isWholesale: doc.isWholesale || false,
        };
      });
    }
  } catch (error) {
    console.warn("Could not fetch products from database:", error);
  }
  return [];
}

export default async function ShopPage() {
  const products = await getProducts();

  // Unique categories for filtering display
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.categoryName)))];

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20 bg-brand-light-bg animate-fade-in" id="shop-page">
        {/* Banner Section */}
        <section 
          className="relative w-full h-[130px] sm:h-[180px] md:h-[240px] lg:h-[300px] flex items-center overflow-hidden mb-12" 
          id="shop-banner"
          style={{ background: 'linear-gradient(to bottom, #ead5c1, #f5e5d5 35%, #f5e5d5 65%, #f1e0d2)' }}
        >
          <div className="absolute inset-0">
            <Image
              src="https://res.cloudinary.com/dyg7neetr/image/upload/v1781586335/Beginning_Picture_cc6g9k.png"
              alt="Shop Our Products Banner"
              fill
              priority
              className="object-contain object-right"
              sizes="100vw"
            />
          </div>
          
          <div className="relative z-10 section-container w-full">
            <div className="max-w-2xl text-left">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold italic text-brand-green mb-2">
                Shop Our Products
              </h1>
              <nav className="font-google-sans text-xs sm:text-sm text-brand-green/80 mt-2 flex items-center gap-1.5 select-none">
                <Link href="/" className="hover:underline font-semibold text-brand-green">Home</Link>
                <span className="text-brand-green/45">&gt;</span>
                <span className="font-semibold text-brand-green">Shop</span>
              </nav>
            </div>
          </div>
        </section>

        {/* Interactive Shop Filters and Grid */}
        <div className="section-container pb-16">
          <ShopClient products={products} categories={categories} />
        </div>

        {/* Bottom Trust Banner (Mockup Styled) */}
        <section className="bg-[#f4eae1] py-5 border-y border-[#e2d5c5]" id="shop-trust-banner">
          <div className="section-container">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-14 md:gap-20 lg:gap-28 text-brand-green">
              {/* Item 1 */}
              <div className="flex items-center gap-3 md:gap-4 select-none">
                <div className="relative w-12 h-10 md:w-14 md:h-12 flex-shrink-0">
                  <Image
                    src="https://res.cloudinary.com/dyg7neetr/image/upload/v1781593999/Screenshot_2026-06-16_at_8.06.22_AM-removebg-preview_zwxnl8.png"
                    alt="Fast Shipping Icon"
                    fill
                    className="object-contain"
                    sizes="60px"
                  />
                </div>
                <span className="font-google-sans font-bold text-lg md:text-xl lg:text-2xl text-[#1B4D3E]">
                  Fast Shipping
                </span>
              </div>

              {/* Item 2 */}
              <div className="flex items-center gap-3 md:gap-4 select-none">
                <div className="relative w-12 h-10 md:w-14 md:h-12 flex-shrink-0">
                  <Image
                    src="https://res.cloudinary.com/dyg7neetr/image/upload/v1781593999/Screenshot_2026-06-16_at_8.06.54_AM-removebg-preview_pzlnqb.png"
                    alt="Secure Payment Icon"
                    fill
                    className="object-contain"
                    sizes="60px"
                  />
                </div>
                <span className="font-google-sans font-bold text-lg md:text-xl lg:text-2xl text-[#1B4D3E]">
                  Secure Payment
                </span>
              </div>

              {/* Item 3 */}
              <div className="flex items-center gap-3 md:gap-4 select-none">
                <div className="relative w-12 h-10 md:w-14 md:h-12 flex-shrink-0">
                  <Image
                    src="https://res.cloudinary.com/dyg7neetr/image/upload/v1782891958/Screenshot_2026-07-01_at_8.43.43_AM-removebg-preview_q5w7x1.png"
                    alt="NAFDAC Approved Icon"
                    fill
                    className="object-contain"
                    sizes="60px"
                  />
                </div>
                <span className="font-google-sans font-bold text-lg md:text-xl lg:text-2xl text-[#1B4D3E]">
                  NAFDAC Approved
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Join Our Community Section */}
        <JoinCommunityClient />
      </main>
      <Footer />
    </>
  );
}

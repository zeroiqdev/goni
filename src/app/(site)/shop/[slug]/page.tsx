import React from "react";
  import Link from "next/link";
  import { notFound } from "next/navigation";
  import Navbar from "@/components/Navbar";
  import Footer from "@/components/Footer";
  import ProductDetailClient from "./ProductDetailClient";
  import { getPayload } from "payload";
  import config from "../../../../../payload.config";

  interface ProductType {
    id: string;
    title: string;
    slug: string;
    price: number;
    compareAtPrice?: number;
    weight: string;
    imageUrl: string;
    imageAlt: string;
    descriptionText: string;
    ingredientsText?: string;
    howToUseText?: string;
    shippingAndDeliveryText?: string;
    returnAndRefundsText?: string;
    images: Array<{ url: string; alt: string }>;
    inStock: boolean;
  }

  function extractTextFromRichText(richText: any): string {
    if (!richText) return "";
    if (typeof richText === "string") return richText;
    
    try {
      if (richText.root && richText.root.children) {
        let text = "";
        const traverse = (node: any) => {
          if (node.text) {
            text += node.text + " ";
          }
          if (node.children) {
            node.children.forEach(traverse);
          }
        };
        richText.root.children.forEach(traverse);
        return text.trim();
      }
    } catch (e) {
      // fallback
    }
    return JSON.stringify(richText);
  }

  async function getProductBySlug(slug: string): Promise<ProductType | null> {
    try {
      const payload = await getPayload({ config });
      const result = await payload.find({
        collection: "products",
        where: {
          slug: {
            equals: slug,
          },
        },
        limit: 1,
      });

      if (result.docs.length > 0) {
        const doc: any = result.docs[0];
        
        const images = (doc.images || []).map((imgObj: any) => {
          const img = imgObj.image;
          const url = typeof img === 'object' && img?.url
            ? img.url
            : "https://res.cloudinary.com/dyg7neetr/image/upload/v1780448500/Screenshot_2026-06-03_at_2.00.51_AM_ea9i6c.png";
          const alt = typeof img === 'object' && img?.filename
            ? img.filename
            : doc.title;
          return { url, alt };
        });

        const imageUrl = images[0]?.url || "https://res.cloudinary.com/dyg7neetr/image/upload/v1780448500/Screenshot_2026-06-03_at_2.00.51_AM_ea9i6c.png";
        const imageAlt = images[0]?.alt || doc.title;

        return {
          id: doc.id,
          title: doc.title,
          slug: doc.slug,
          price: doc.price,
          compareAtPrice: doc.compareAtPrice || undefined,
          weight: doc.weight,
          imageUrl,
          imageAlt,
          descriptionText: extractTextFromRichText(doc.description) || "Premium shea butter from Northern Nigeria.",
          ingredientsText: extractTextFromRichText(doc.ingredients) || undefined,
          howToUseText: extractTextFromRichText(doc.howToUse) || undefined,
          shippingAndDeliveryText: extractTextFromRichText(doc.shippingAndDelivery) || undefined,
          returnAndRefundsText: extractTextFromRichText(doc.returnAndRefunds) || undefined,
          images,
          inStock: doc.inStock !== false,
        };
      }
    } catch (error) {
      console.warn("Could not fetch product from database:", error);
    }

    return null;
  }

  export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
      notFound();
    }

    return (
      <>
        <Navbar />
        <main className="flex-grow pt-28 pb-20 bg-white" id={`product-detail-page-${product.slug}`}>
          <div className="section-container">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-sans text-[#7a6d5c] mb-6 px-1">
              <Link href="/" className="hover:text-[#1B4D3E] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-[#1B4D3E] transition-colors">Shop</Link>
              <span>/</span>
              <span className="text-[#1B4D3E] font-medium line-clamp-1">{product.title}</span>
            </div>

            {/* Main Interactive Product Section */}
            <ProductDetailClient product={product} />
          </div>
        </main>
        <Footer />
      </>
    );
  }

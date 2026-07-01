"use client";

import React, { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import Image from "next/image";

interface ProductType {
  id: string;
  title: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  weight: string;
  imageUrl: string;
  imageAlt: string;
  categoryName: string;
  subtitle?: string;
  isWholesale?: boolean;
}

interface ShopClientProps {
  products: ProductType[];
  categories: string[];
}

export default function ShopClient({ products, categories }: ShopClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);

  // Toggle size filter
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Toggle price filter
  const togglePrice = (priceRange: string) => {
    setSelectedPrices((prev) =>
      prev.includes(priceRange) ? prev.filter((p) => p !== priceRange) : [...prev, priceRange]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedSizes([]);
    setSelectedPrices([]);
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== "All" && product.categoryName !== selectedCategory) {
        return false;
      }

      // Size filter
      if (selectedSizes.length > 0) {
        const productWeightLower = product.weight.toLowerCase();
        const productTitleLower = product.title.toLowerCase();
        const matchesSize = selectedSizes.some((size) => {
          const sizeLower = size.toLowerCase();
          return productWeightLower.includes(sizeLower) || productTitleLower.includes(sizeLower);
        });
        if (!matchesSize) return false;
      }

      // Price filter
      if (selectedPrices.length > 0) {
        const matchesPrice = selectedPrices.some((range) => {
          if (range === "under-10k") {
            return product.price < 10000 && !product.isWholesale;
          }
          if (range === "10k-20k") {
            return product.price >= 10000 && product.price <= 20000 && !product.isWholesale;
          }
          if (range === "wholesale") {
            return product.isWholesale === true;
          }
          return true;
        });
        if (!matchesPrice) return false;
      }

      return true;
    });
  }, [products, selectedCategory, selectedSizes, selectedPrices]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
      {/* Sidebar Filters */}
      <div className="bg-[#f3ece4] border border-[#e2d5c5] p-6 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-google-sans font-bold text-brand-dark uppercase tracking-wider">
              Categories
            </h3>
            {(selectedCategory !== "All" || selectedSizes.length > 0 || selectedPrices.length > 0) && (
              <button
                onClick={resetFilters}
                className="text-xs text-brand-green hover:underline font-semibold font-sans"
              >
                Clear All
              </button>
            )}
          </div>
          <div className="space-y-1">
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left font-sans text-sm py-2 px-3 transition-colors flex items-center justify-between ${
                    isSelected
                      ? "bg-[#1B4D3E] text-white font-semibold"
                      : "hover:bg-[#e8decb] text-[#1a1a1a] font-medium"
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 border ${
                      isSelected
                        ? "bg-[#153D31] text-white border-white/20"
                        : "bg-[#e2d5c5] text-[#1a1a1a] border-[#d2c4b2]"
                    }`}
                  >
                    {category === "All"
                      ? products.length
                      : products.filter((p) => p.categoryName === category).length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Size Filter */}
        <div className="border-t border-[#e2d5c5] pt-6">
          <h3 className="text-sm font-google-sans font-bold text-brand-dark uppercase tracking-wider mb-4">
            Filter By Size
          </h3>
          <div className="space-y-3">
            {[
              { label: "200g Personal Jar", value: "200g" },
              { label: "1kg Family Pouch", value: "1kg" },
              { label: "15kg Bulk Bucket", value: "15kg" },
            ].map((size) => (
              <label
                key={size.value}
                className="flex items-center gap-3 cursor-pointer text-sm font-sans text-[#1a1a1a] hover:text-brand-green font-medium select-none"
              >
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size.value)}
                  onChange={() => toggleSize(size.value)}
                  className="w-4.5 h-4.5 rounded-none border-[#1B4D3E] text-[#1B4D3E] focus:ring-brand-green/30 cursor-pointer"
                />
                <span>{size.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="border-t border-[#e2d5c5] pt-6">
          <h3 className="text-sm font-google-sans font-bold text-brand-dark uppercase tracking-wider mb-4">
            Filter By Price
          </h3>
          <div className="space-y-3">
            {[
              { label: "Under ₦10,000", value: "under-10k" },
              { label: "₦10,000 – ₦20,000", value: "10k-20k" },
              { label: "Wholesale Quote Request", value: "wholesale" },
            ].map((price) => (
              <label
                key={price.value}
                className="flex items-center gap-3 cursor-pointer text-sm font-sans text-[#1a1a1a] hover:text-brand-green font-medium select-none"
              >
                <input
                  type="checkbox"
                  checked={selectedPrices.includes(price.value)}
                  onChange={() => togglePrice(price.value)}
                  className="w-4.5 h-4.5 rounded-none border-[#1B4D3E] text-[#1B4D3E] focus:ring-brand-green/30 cursor-pointer"
                />
                <span>{price.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid Container */}
      <div className="lg:col-span-3 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#e2d5c5]">
          <h2 className="font-google-sans text-xl sm:text-2xl font-bold text-brand-green">
            Showing {filteredProducts.length} Results
          </h2>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                slug={product.slug}
                price={product.price}
                compareAtPrice={product.compareAtPrice}
                weight={product.weight}
                imageUrl={product.imageUrl}
                imageAlt={product.imageAlt}
                subtitle={product.subtitle}
                isWholesale={product.isWholesale}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#f3ece4] border border-[#e2d5c5] p-8">
            <p className="font-serif text-lg text-brand-muted mb-4">
              No products found matching your filters.
            </p>
            <button
              onClick={resetFilters}
              className="bg-[#1B4D3E] text-white px-6 py-2.5 font-sans font-semibold text-sm hover:bg-[#153D31] transition-all uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

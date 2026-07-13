"use client";

import { useCart } from "@/providers/CartContext";

interface FeaturedAddToCartButtonProps {
  product: {
    id: string;
    title: string;
    slug: string;
    price: number;
    weight: string;
    imageUrl: string;
  };
  className: string;
  idAttr: string;
}

export default function FeaturedAddToCartButton({
  product,
  className,
  idAttr,
}: FeaturedAddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className={className}
      id={idAttr}
    >
      Add to Cart
    </button>
  );
}

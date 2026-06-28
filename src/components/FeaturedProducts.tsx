import Image from "next/image";
import Link from "next/link";

const products = [
  {
    name: "200g Whipped",
    description: "Perfect for Personal Use",
    price: "₦6,000",
    image:
      "https://res.cloudinary.com/dyg7neetr/image/upload/v1780561755/PHOTO-2026-05-03-00-49-01-removebg-preview_y7yk8s.png",
    cta: "Add to Cart",
    href: "/shop",
    filled: true,
  },
  {
    name: "1kg Pouch",
    description: "Ideal for families and small businesses",
    price: "₦17,000",
    image:
      "https://res.cloudinary.com/dyg7neetr/image/upload/v1780561757/PHOTO-2026-05-03-00-49-02-removebg-preview_f05esa.png",
    cta: "Add to Cart",
    href: "/shop",
    filled: true,
  },
  {
    name: "15kg Bucket",
    description: "For wholesale & large scale",
    price: null,
    image:
      "https://res.cloudinary.com/dyg7neetr/image/upload/v1780561756/PHOTO-2026-05-03-00-49-02_2-removebg-preview_sin3mo.png",
    cta: "Request Quote",
    href: "/bulk/quote?product=15kg%20Bucket",
    filled: false,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-white py-16 md:py-20" id="featured-products">
      <div className="section-container">
        {/* Headings */}
        <div className="text-center mb-12">
          <p className="font-google-sans text-brand-gold text-lg mb-2">
            Our Bestselling Products
          </p>
          <h2 className="font-google-sans text-3xl md:text-4xl font-bold text-brand-green">
            Premium Shea Butter
          </h2>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <div
              key={product.name}
              className="bg-brand-cream/50 rounded-sm flex flex-col items-center text-center px-6 py-8 transition-all duration-300 hover:shadow-md"
            >
              {/* Product Image */}
              <div className="relative w-full h-52 md:h-56 mb-6">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Product Info */}
              <h3 className="font-google-sans text-xl md:text-2xl font-semibold text-brand-green mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-brand-green/80 font-google-sans mb-4 max-w-[200px]">
                {product.description}
              </p>

              {/* Price */}
              {product.price && (
                <p className="font-google-sans text-xl font-bold text-brand-green mb-5">
                  {product.price}
                </p>
              )}

              {/* Spacer to push button to bottom when no price */}
              {!product.price && <div className="mb-5" />}

              {/* CTA Button */}
              <Link
                href={product.href}
                className={`inline-block px-8 py-3 text-sm font-google-sans font-semibold tracking-wide transition-all duration-300 rounded-lg ${
                  product.filled
                    ? "bg-brand-green text-white hover:bg-brand-green-dark"
                    : "bg-white text-brand-dark border border-brand-dark/30 hover:border-brand-green hover:text-brand-green"
                }`}
                id={`product-cta-${product.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {product.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

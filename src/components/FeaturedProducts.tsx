import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@/../payload.config";
import FeaturedAddToCartButton from "./FeaturedAddToCartButton";

const fallbackProducts = [
  {
    name: "200g Whipped",
    description: "Perfect for Personal Use",
    price: "₦6,000",
    image:
      "https://res.cloudinary.com/dyg7neetr/image/upload/v1780561755/PHOTO-2026-05-03-00-49-01-removebg-preview_y7yk8s.png",
    cta: "Add to Cart",
    href: "/shop/Whipped-Natural-Shea-Butter",
    filled: true,
  },
  {
    name: "1kg Pouch",
    description: "Ideal for families and small businesses",
    price: "₦17,000",
    image:
      "https://res.cloudinary.com/dyg7neetr/image/upload/v1780561757/PHOTO-2026-05-03-00-49-02-removebg-preview_f05esa.png",
    cta: "Add to Cart",
    href: "/shop/Goni-raw-shea-butter-500g",
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
    detailsHref: "/shop/15kg-wholesale-bucket",
    filled: false,
  },
];

export default async function FeaturedProducts() {
  // Query actual database products on the server side
  let dbProducts: any[] = [];
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "products",
      where: {
        slug: {
          in: [
            "Whipped-Natural-Shea-Butter",
            "Goni-raw-shea-butter-500g",
            "15kg-wholesale-bucket",
            "whipped-shea-butter-lavender",
            "pure-unrefined-shea-butter-1kg",
            "shea-butter-gift-set-premium"
          ],
        },
      },
      depth: 2,
    });
    dbProducts = result.docs || [];
  } catch (err) {
    console.error("Failed to fetch featured products from database:", err);
  }

  // Find matching database product or fallback
  const getDbProduct = (fallbackProduct: typeof fallbackProducts[0]) => {
    if (fallbackProduct.name === "200g Whipped") {
      return dbProducts.find(
        (p) => p.slug === "Whipped-Natural-Shea-Butter" || p.slug.includes("whipped")
      );
    }
    if (fallbackProduct.name === "1kg Pouch") {
      return dbProducts.find(
        (p) => p.slug === "Goni-raw-shea-butter-500g" || p.slug.includes("1kg") || p.slug.includes("pouch")
      );
    }
    if (fallbackProduct.name === "15kg Bucket") {
      return dbProducts.find(
        (p) => p.slug === "15kg-wholesale-bucket" || p.slug.includes("bucket")
      );
    }
    return null;
  };

  return (
    <section className="bg-white py-16 md:py-20" id="featured-products">
      <div className="section-container">
        {/* Headings */}
        <div className="text-center mb-12">
          <p className="font-google-sans text-brand-gold text-lg mb-2">
            Our Products
          </p>
          <h2 className="font-google-sans text-3xl md:text-4xl font-bold text-brand-green">
            Premium Shea Butter
          </h2>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {fallbackProducts.map((fallbackProduct) => {
            const dbProduct = getDbProduct(fallbackProduct);
            
            // Resolve correct URL
            const detailsUrl = dbProduct 
              ? `/shop/${dbProduct.slug}`
              : (fallbackProduct.detailsHref || fallbackProduct.href);

            // Resolve correct Image URL
            const imageDoc = dbProduct?.images?.[0]?.image;
            const imageUrl = typeof imageDoc === "object" && imageDoc?.url
              ? imageDoc.url
              : fallbackProduct.image;

            // Resolve correct Price text
            const priceVal = dbProduct ? dbProduct.price : null;
            const priceText = priceVal 
              ? `₦${priceVal.toLocaleString()}` 
              : fallbackProduct.price;

            return (
              <div
                key={fallbackProduct.name}
                className="bg-[#f2e7db] rounded-sm flex flex-col items-center text-center px-6 py-8 transition-all duration-300 hover:shadow-md"
              >
                {/* Product Image Link */}
                <Link
                  href={detailsUrl}
                  className="relative w-full h-52 md:h-56 mb-6 block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src={imageUrl}
                    alt={fallbackProduct.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </Link>

                <div className="flex flex-1 flex-col items-center">
                  {/* Product Info / Title Link */}
                  <h3 className="font-google-sans text-xl md:text-2xl font-semibold text-brand-green mb-1 hover:text-brand-green/80 transition-colors">
                    <Link href={detailsUrl}>
                      {fallbackProduct.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-brand-green/80 font-google-sans mb-4 max-w-[200px]">
                    {fallbackProduct.description}
                  </p>

                  {/* Price */}
                  <div className="mb-5 flex min-h-[28px] items-center">
                    {priceText && (
                      <p className="font-google-sans text-xl font-bold text-brand-green">
                        {priceText}
                      </p>
                    )}
                  </div>
                </div>

                {/* CTA Button or Add To Cart Component */}
                {fallbackProduct.cta === "Add to Cart" && dbProduct ? (
                  <FeaturedAddToCartButton
                    product={{
                      id: dbProduct.id,
                      title: dbProduct.title,
                      slug: dbProduct.slug,
                      price: dbProduct.price,
                      weight: dbProduct.weight || "200g",
                      imageUrl,
                    }}
                    className="mt-auto inline-flex min-h-[48px] min-w-[150px] items-center justify-center px-8 py-3 text-sm font-google-sans font-semibold tracking-wide transition-all duration-300 rounded-lg bg-brand-green text-white hover:bg-brand-green-dark"
                    idAttr={`product-cta-${fallbackProduct.name.toLowerCase().replace(/\s+/g, "-")}`}
                  />
                ) : (
                  <Link
                    href={fallbackProduct.href}
                    className={`mt-auto inline-flex min-h-[48px] min-w-[150px] items-center justify-center px-8 py-3 text-sm font-google-sans font-semibold tracking-wide transition-all duration-300 rounded-lg ${
                      fallbackProduct.filled
                        ? "bg-brand-green text-white hover:bg-brand-green-dark"
                        : "bg-white text-brand-dark border border-brand-dark/30 hover:border-brand-green hover:text-brand-green"
                    }`}
                    id={`product-cta-${fallbackProduct.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {fallbackProduct.cta}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

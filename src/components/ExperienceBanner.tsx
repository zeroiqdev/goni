import Image from "next/image";
import Link from "next/link";

export default function ExperienceBanner() {
  return (
    <section className="relative overflow-hidden bg-brand-green py-14 md:py-20 lg:py-24 min-h-[300px] md:min-h-[360px] flex items-center mb-10 md:mb-16" id="experience-banner">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://res.cloudinary.com/dyg7neetr/image/upload/v1780572785/Copy_of_7fe5e38d-339f-467f-bfe7-8b37d8caa257_tadrlx.png"
          alt="Bowl of whipped shea butter with shea nuts and leaves"
          fill
          priority
          className="object-cover object-right"
          sizes="100vw"
        />
      </div>

      {/* Content Overlay */}
      <div className="section-container relative z-10 w-full">
        <div className="max-w-xl text-left">
          <p className="font-sans text-sm md:text-base text-white/90 tracking-wide mb-3">
            Experience Shea Butter
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold italic text-white leading-tight mb-8">
            Good For Your Skin.
            <br />
            Better for Your World.
          </h2>
          <div>
            <Link
              href="/shop"
              className="inline-block bg-white text-brand-green font-sans font-semibold text-sm px-8 py-3.5 transition-all duration-300 hover:bg-brand-cream hover:shadow-lg hover:scale-[1.02]"
              id="experience-shop-now-btn"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


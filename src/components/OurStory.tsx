import Image from "next/image";

export default function OurStory() {
  return (
    <section className="bg-brand-green" id="our-story">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[380px] lg:min-h-[440px]">
        {/* Left — Image */}
        <div className="relative w-full h-[280px] lg:h-auto">
          <Image
            src="https://res.cloudinary.com/dyg7neetr/image/upload/v1780561239/2fc3ca7c-01c1-4fd0-ab23-4add41523d6a_pakghu.png"
            alt="Women sourcing shea butter in Northern Nigeria"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Right — Text */}
        <div className="flex flex-col justify-center px-8 md:px-14 lg:px-16 py-10 lg:py-12">
          <p className="font-sans text-lg md:text-xl font-semibold text-white mb-2">
            Our Story
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-4xl font-bold italic text-white mb-5 leading-tight">
            From Our Hands to Yours
          </h2>
          <p className="font-sans text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-xl">
            Our shea butter is sourced directly from women across Northern
            Nigeria who have perfected this craft for generations. Every purchase
            supports livelihoods and empowers communities.
          </p>
        </div>
      </div>
    </section>
  );
}

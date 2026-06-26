import Image from "next/image";

const badges = [
  {
    label: "Women-Sourced",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
        />
      </svg>
    ),
  },
  {
    label: "No Chemicals",
    src: "https://res.cloudinary.com/dyg7neetr/image/upload/v1775042455/ICONS_-_Dermatologically_Tested_x1inob.svg",
  },
  {
    label: "NAFDAC Approved",
    src: "https://res.cloudinary.com/dyg7neetr/image/upload/v1775042455/idZQnoE5i__1775042204657-removebg-preview_jtltnf.png",
  },
  {
    label: "Natural",
    src: "https://res.cloudinary.com/dyg7neetr/image/upload/v1775042870/organic_icon_sndktr.png",
  },
];

export default function TrustBanner() {
  return (
    <section className="bg-brand-green" id="trust-banner">
      <div className="section-container py-8">
        <div className="flex items-center justify-center gap-10 md:gap-16 lg:gap-24 flex-wrap">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-3"
            >
              {badge.icon ? (
                badge.icon
              ) : (
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image
                    src={badge.src!}
                    alt={badge.label}
                    fill
                    className="object-contain brightness-0 invert"
                    sizes="40px"
                  />
                </div>
              )}
              <span className="text-white text-sm font-sans font-medium tracking-wide whitespace-nowrap">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

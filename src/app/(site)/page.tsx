import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBanner from "@/components/TrustBanner";
import FeaturedProducts from "@/components/FeaturedProducts";
import OurStory from "@/components/OurStory";
import Benefits from "@/components/Benefits";
import ExperienceBanner from "@/components/ExperienceBanner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  other: {
    "trustpilot-one-time-domain-verification-id": "5a98bebd-f021-43e9-b877-08c24d2c327b",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <TrustBanner />
        <FeaturedProducts />
        <OurStory />
        <Benefits />
        <ExperienceBanner />
        {/* Completely white space between the last banner and the footer */}
        <div className="bg-white h-10 md:h-16 w-full" />
      </main>
      <Footer />
    </>
  );
}

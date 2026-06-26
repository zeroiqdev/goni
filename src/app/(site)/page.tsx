import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBanner from "@/components/TrustBanner";
import FeaturedProducts from "@/components/FeaturedProducts";
import OurStory from "@/components/OurStory";
import Benefits from "@/components/Benefits";
import ExperienceBanner from "@/components/ExperienceBanner";
import Footer from "@/components/Footer";

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
      </main>
      <Footer />
    </>
  );
}


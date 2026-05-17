import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen lg:h-screen flex flex-col bg-white lg:overflow-hidden">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <FeaturesSection />
      </main>
    </div>
  );
}
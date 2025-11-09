import { Navbar } from "@/components/navbar";
import { LandingHero } from "@/components/landing-hero";
import { ImageCarousel } from "@/components/image-carousel";
import { LandingProblem } from "@/components/landing-problem";
import { LandingHowItWorks } from "@/components/landing-how-it-works";
import { LandingShowcase } from "@/components/landing-showcase";
import { LandingDemo } from "@/components/landing-demo";
import { LandingFeatures } from "@/components/landing-features";
import { LandingFAQ } from "@/components/landing-faq";
import { LandingCTA } from "@/components/landing-cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <LandingHero />
        <ImageCarousel />
        <LandingShowcase />
        <LandingHowItWorks />
        <LandingDemo />
        <LandingFeatures />
        <LandingProblem />
        <LandingCTA />
        <LandingFAQ />
      </main>
      <Footer />
    </div>
  );
}

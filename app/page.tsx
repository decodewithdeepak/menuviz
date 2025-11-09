import { Navbar, Footer } from "@/components/layout";
import {
  LandingHero,
  ImageCarousel,
  LandingShowcase,
  LandingHowItWorks,
  LandingDemo,
  LandingFeatures,
  LandingProblem,
  LandingCTA,
  LandingFAQ,
} from "@/components/landing";

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

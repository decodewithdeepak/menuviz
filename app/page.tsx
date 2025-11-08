import { Navbar } from "@/components/navbar"
import { LandingHero } from "@/components/landing-hero"
import { LandingProblem } from "@/components/landing-problem"
import { LandingHowItWorks } from "@/components/landing-how-it-works"
import { LandingShowcase } from "@/components/landing-showcase"
import { LandingFeatures } from "@/components/landing-features"
import { LandingCTA } from "@/components/landing-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <LandingHero />
        <LandingProblem />
        <LandingHowItWorks />
        <LandingShowcase />
        <LandingFeatures />
        <LandingCTA />
      </main>
      <Footer />
    </div>
  )
}

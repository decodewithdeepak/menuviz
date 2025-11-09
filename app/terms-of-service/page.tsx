import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto max-w-4xl px-4 py-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-4 text-4xl font-bold">Terms of Service</h1>
        <p className="mb-8 text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">1. Acceptance of Terms</h2>
            <p className="mb-4 text-muted-foreground">
              By accessing and using MenuViz ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">2. Description of Service</h2>
            <p className="mb-4 text-muted-foreground">
              MenuViz is an AI-powered platform that generates professional food images from text descriptions using Google Gemini AI. The Service allows users to create, download, and manage AI-generated food imagery for their menus and marketing materials.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">3. User Accounts</h2>
            <p className="mb-4 text-muted-foreground">
              To access certain features of the Service, you must register for an account. You agree to:
            </p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">4. Use of Generated Images</h2>
            <p className="mb-4 text-muted-foreground">
              Images generated through MenuViz are subject to the following terms:
            </p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
              <li>You retain ownership of images you generate</li>
              <li>You may use generated images for commercial purposes</li>
              <li>You may not claim that AI-generated images are photographs of real food items in a misleading manner</li>
              <li>You are responsible for ensuring your use complies with applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">5. Prohibited Uses</h2>
            <p className="mb-4 text-muted-foreground">
              You agree not to use the Service to:
            </p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
              <li>Generate content that is illegal, harmful, or violates any laws</li>
              <li>Generate content that infringes on intellectual property rights</li>
              <li>Attempt to reverse engineer or extract the AI models</li>
              <li>Use the Service in any way that could damage, disable, or impair the Service</li>
              <li>Resell or redistribute the Service without authorization</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">6. API Usage and Rate Limits</h2>
            <p className="mb-4 text-muted-foreground">
              The Service uses Google Gemini AI APIs, which are subject to rate limits and quotas. We reserve the right to:
            </p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
              <li>Implement usage limits on image generation</li>
              <li>Throttle or restrict access during high-demand periods</li>
              <li>Modify pricing or usage tiers at any time with notice</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">7. Intellectual Property</h2>
            <p className="mb-4 text-muted-foreground">
              The Service, including its original content, features, and functionality, is owned by MenuViz and is protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">8. Disclaimer of Warranties</h2>
            <p className="mb-4 text-muted-foreground">
              The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that:
            </p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
              <li>The Service will be uninterrupted or error-free</li>
              <li>Generated images will meet your specific requirements</li>
              <li>The quality of images will remain consistent</li>
              <li>Any errors in the Service will be corrected</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">9. Limitation of Liability</h2>
            <p className="mb-4 text-muted-foreground">
              To the maximum extent permitted by law, MenuViz shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">10. Termination</h2>
            <p className="mb-4 text-muted-foreground">
              We reserve the right to terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including breach of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">11. Changes to Terms</h2>
            <p className="mb-4 text-muted-foreground">
              We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">12. Contact Information</h2>
            <p className="mb-4 text-muted-foreground">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-muted-foreground">
              Email: <a href="mailto:support@menuviz.com" className="text-orange-600 hover:underline">support@menuviz.com</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}


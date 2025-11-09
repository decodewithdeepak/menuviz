import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
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
        <h1 className="mb-4 text-4xl font-bold">Privacy Policy</h1>
        <p className="mb-8 text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
            <p className="mb-4 text-muted-foreground">
              MenuViz ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered menu visualization service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">2. Information We Collect</h2>
            
            <h3 className="mb-3 text-xl font-semibold">2.1 Personal Information</h3>
            <p className="mb-4 text-muted-foreground">
              When you register for an account, we collect:
            </p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
              <li>Name (first and last name)</li>
              <li>Email address</li>
              <li>Password (encrypted)</li>
              <li>Profile information (if provided)</li>
            </ul>

            <h3 className="mb-3 text-xl font-semibold">2.2 Usage Information</h3>
            <p className="mb-4 text-muted-foreground">
              We automatically collect information about your use of the Service:
            </p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
              <li>Text prompts you submit for image generation</li>
              <li>Generated images and their metadata</li>
              <li>Generation history and timestamps</li>
              <li>Style preferences and settings</li>
              <li>Device information and browser type</li>
              <li>IP address and location data</li>
            </ul>

            <h3 className="mb-3 text-xl font-semibold">2.3 Cookies and Tracking</h3>
            <p className="mb-4 text-muted-foreground">
              We use cookies and similar tracking technologies to maintain your session and improve your experience. You can control cookie settings through your browser.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">3. How We Use Your Information</h2>
            <p className="mb-4 text-muted-foreground">
              We use the collected information for the following purposes:
            </p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
              <li>To provide and maintain the Service</li>
              <li>To process your image generation requests</li>
              <li>To manage your account and preferences</li>
              <li>To send you technical notices and updates</li>
              <li>To respond to your inquiries and support requests</li>
              <li>To improve and optimize the Service</li>
              <li>To detect and prevent fraud or abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">4. Third-Party Services</h2>
            
            <h3 className="mb-3 text-xl font-semibold">4.1 Google Gemini AI</h3>
            <p className="mb-4 text-muted-foreground">
              We use Google Gemini AI to generate images. Your prompts are sent to Google's servers for processing. Please review Google's Privacy Policy for information about how they handle your data.
            </p>

            <h3 className="mb-3 text-xl font-semibold">4.2 Supabase</h3>
            <p className="mb-4 text-muted-foreground">
              We use Supabase for authentication and database services. Your account information and generated content are stored on Supabase's secure servers.
            </p>

            <h3 className="mb-3 text-xl font-semibold">4.3 Vercel</h3>
            <p className="mb-4 text-muted-foreground">
              Our Service is hosted on Vercel. They may collect analytics and performance data as described in their Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">5. Data Storage and Security</h2>
            <p className="mb-4 text-muted-foreground">
              We implement appropriate technical and organizational measures to protect your personal information:
            </p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure authentication using industry-standard protocols</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and user data isolation</li>
              <li>Row Level Security (RLS) on database tables</li>
            </ul>
            <p className="mb-4 text-muted-foreground">
              However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security of your data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">6. Data Retention</h2>
            <p className="mb-4 text-muted-foreground">
              We retain your information for as long as your account is active or as needed to provide you services. You can request deletion of your account and associated data at any time through your account settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">7. Your Rights</h2>
            <p className="mb-4 text-muted-foreground">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and data</li>
              <li><strong>Export:</strong> Download your generated images and history</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            </ul>
            <p className="mb-4 text-muted-foreground">
              To exercise these rights, please contact us at <a href="mailto:privacy@menuviz.com" className="text-orange-600 hover:underline">privacy@menuviz.com</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">8. Children's Privacy</h2>
            <p className="mb-4 text-muted-foreground">
              Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">9. International Data Transfers</h2>
            <p className="mb-4 text-muted-foreground">
              Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. By using the Service, you consent to such transfers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">10. Changes to This Privacy Policy</h2>
            <p className="mb-4 text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of the Service after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">11. Contact Us</h2>
            <p className="mb-4 text-muted-foreground">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul className="mb-4 ml-6 list-none space-y-2 text-muted-foreground">
              <li>Email: <a href="mailto:privacy@menuviz.com" className="text-orange-600 hover:underline">privacy@menuviz.com</a></li>
              <li>Support: <a href="mailto:support@menuviz.com" className="text-orange-600 hover:underline">support@menuviz.com</a></li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}


"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does MenuViz generate food images?",
    answer:
      "MenuViz uses advanced AI technology powered by Google Gemini to transform simple text descriptions into professional, high-quality food photography. Just describe your dish, and our AI will create stunning visuals in seconds.",
  },
  {
    question: "What image styles are available?",
    answer:
      "We offer multiple professional styles including Photorealistic, Minimalist, Rustic, Modern, and Elegant. Each style is optimized for different restaurant aesthetics and menu types.",
  },
  {
    question: "Can I use the generated images commercially?",
    answer:
      "Yes! All images generated through MenuViz are yours to use commercially. You can use them on your menus, websites, social media, marketing materials, and anywhere else you need them.",
  },
  {
    question: "How many images can I generate?",
    answer:
      "Our plans offer different generation limits. The free tier includes 10 images per month, while premium plans offer unlimited generations. Check our pricing page for detailed plan comparisons.",
  },
  {
    question: "What if I don't like the generated image?",
    answer:
      "You can regenerate images as many times as you need (within your plan limits). You can also adjust your prompt or try different styles to get the perfect result. Our AI learns from your preferences over time.",
  },
  {
    question: "Do I need photography skills to use MenuViz?",
    answer:
      "Not at all! MenuViz is designed for everyone. Simply describe your dish in plain language, and our AI handles all the technical aspects of creating professional food photography.",
  },
  {
    question: "How long does it take to generate an image?",
    answer:
      "Most images are generated in 5-10 seconds. The AI enhancement process takes 2-3 seconds, and the actual image generation takes another 5-7 seconds. You'll have professional photos faster than you can brew a cup of coffee!",
  },
  {
    question: "Can I edit the generated images?",
    answer:
      "Yes! You can download the images in high resolution and edit them using any photo editing software. You can also regenerate with modified prompts to get different variations.",
  },
  {
    question: "What image resolution do I get?",
    answer:
      "All generated images are high-resolution (1024x1024 pixels minimum) and suitable for both digital and print use. They're optimized for menus, websites, and social media platforms.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely! We use industry-standard encryption and security practices. Your prompts, images, and account data are stored securely and never shared with third parties. You can delete your data anytime from your account settings.",
  },
];

export function LandingFAQ() {
  return (
    <section className="relative py-24 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
            Frequently Asked{" "}
            <span className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent cursive-text">
              Questions
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Everything you need to know about MenuViz and AI-powered food
            photography
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-4"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-lg border border-orange-200 bg-white px-6 shadow-sm transition-all hover:border-orange-300 hover:shadow-md data-[state=open]:border-orange-400 data-[state=open]:shadow-lg data-[state=open]:shadow-orange-500/10"
            >
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-orange-600 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA Below FAQ */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a
              href="mailto:support@menuviz.com"
              className="font-medium text-orange-600 hover:text-orange-700 hover:underline"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}


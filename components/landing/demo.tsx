"use client";

import { Play } from "lucide-react";
import { useState } from "react";

export function LandingDemo() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-white via-orange-50/30 to-white">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
            See{" "}
            <span className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent cursive-text">
              MenuViz
            </span>{" "}
            in Action
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Watch how easy it is to transform simple menu descriptions into
            stunning, professional food photography
          </p>
        </div>

        {/* Demo Thumbnail */}
        <div className="relative mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl border-4 border-orange-200 bg-white shadow-2xl shadow-orange-500/20">
            {/* 16:9 Aspect Ratio Container */}
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              {/* Thumbnail Image */}
              <img
                src="/hero-mockup.webp"
                alt="MenuViz Demo Thumbnail"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/20" />

              {/* Play Button Overlay */}
              <button
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 flex items-center justify-center group cursor-pointer hover:bg-black/10 transition-colors"
              >
                <div className="h-24 w-24 rounded-full bg-orange-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="h-12 w-12 text-white fill-white ml-1" />
                </div>
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-orange-500/10 blur-2xl" />
          <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-orange-500/10 blur-2xl" />
        </div>

        {/* Video Popup Modal */}
        {showVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowVideo(false)}
          >
            <div
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowVideo(false)}
                className="absolute -top-12 right-0 text-white hover:text-orange-500 transition-colors"
              >
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Video Container */}
              <div className="relative overflow-hidden rounded-2xl border-4 border-orange-500 bg-black shadow-2xl">
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "56.25%" }}
                >
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src="https://www.youtube.com/embed/ShQpK5DB8sg?autoplay=1&vq=hd1080&quality=hd1080&hd=1&rel=0&modestbranding=1"
                    title="MenuViz Demo Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Optional: Video Stats or Features */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-orange-600">2 min</div>
            <p className="text-sm text-muted-foreground">Quick Demo</p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-orange-600">
              4 Steps
            </div>
            <p className="text-sm text-muted-foreground">Simple Process</p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-orange-600">∞</div>
            <p className="text-sm text-muted-foreground">Unlimited Images</p>
          </div>
        </div>
      </div>
    </section>
  );
}

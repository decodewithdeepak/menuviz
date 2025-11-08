"use client"

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const showcaseImages = [
  {
    id: 1,
    color: "from-orange-100 via-orange-50 to-amber-50",
  },
  {
    id: 2,
    color: "from-yellow-100 via-yellow-50 to-orange-50",
  },
  {
    id: 3,
    color: "from-amber-100 via-amber-50 to-orange-50",
  },
  {
    id: 4,
    color: "from-teal-100 via-teal-50 to-cyan-50",
  },
  {
    id: 5,
    color: "from-green-100 via-green-50 to-emerald-50",
  },
  {
    id: 6,
    color: "from-red-100 via-red-50 to-rose-50",
  },
  {
    id: 7,
    color: "from-purple-100 via-purple-50 to-pink-50",
  },
  {
    id: 8,
    color: "from-blue-100 via-blue-50 to-indigo-50",
  },
]

export function ImageCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: false })
  )

  return (
    <section className="relative py-12 overflow-hidden bg-white">
      <div className="container mx-auto max-w-full">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {showcaseImages.map((image) => (
              <CarouselItem key={image.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <div className="relative overflow-hidden rounded-xl shadow-md">
                  {/* Image Placeholder */}
                  <div className={`relative h-64 bg-gradient-to-br ${image.color} flex items-center justify-center`}>
                    <div className="text-center">
                      <div className="mx-auto h-32 w-32 rounded-2xl border-4 border-dashed border-white/60 bg-white/30 backdrop-blur-sm flex items-center justify-center">
                        <svg
                          className="h-16 w-16 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}


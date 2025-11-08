"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const showcaseImages = [
  {
    id: 1,
    name: "Paneer Tikka Masala",
    image: "/dishes/paneer-tikka-masala.webp",
    color: "from-orange-100 via-orange-50 to-amber-50",
  },
  {
    id: 2,
    name: "Margherita Pizza Classic",
    image: "/dishes/margherita-pizza.webp",
    color: "from-red-100 via-red-50 to-orange-50",
  },
  {
    id: 3,
    name: "Crispy Masala Dosa",
    image: "/dishes/masala-dosa.webp",
    color: "from-yellow-100 via-yellow-50 to-orange-50",
  },
  {
    id: 4,
    name: "Gourmet Veggie Burger",
    image: "/dishes/veggie-burger.webp",
    color: "from-amber-100 via-yellow-50 to-orange-50",
  },
  {
    id: 5,
    name: "Chole Bhature Platter",
    image: "/dishes/chole-bhature.webp",
    color: "from-amber-100 via-amber-50 to-orange-50",
  },
  {
    id: 6,
    name: "Pasta Alfredo Bowl",
    image: "/dishes/pasta-alfredo.webp",
    color: "from-yellow-50 via-amber-50 to-orange-50",
  },
  {
    id: 7,
    name: "Palak Paneer Bowl",
    image: "/dishes/palak-paneer.webp",
    color: "from-green-100 via-green-50 to-emerald-50",
  },
  {
    id: 8,
    name: "Caesar Salad Fresh",
    image: "/dishes/caesar-salad.webp",
    color: "from-green-100 via-lime-50 to-emerald-50",
  },
  {
    id: 9,
    name: "Veg Biryani Delight",
    image: "/dishes/veg-biryani.webp",
    color: "from-yellow-100 via-amber-50 to-orange-50",
  },
  {
    id: 10,
    name: "Chocolate Lava Cake",
    image: "/dishes/chocolate-lava-cake.webp",
    color: "from-amber-100 via-orange-50 to-red-50",
  },
  {
    id: 11,
    name: "Gulab Jamun Dessert",
    image: "/dishes/gulab-jamun.webp",
    color: "from-red-100 via-red-50 to-rose-50",
  },
  {
    id: 12,
    name: "Pav Bhaji Special",
    image: "/dishes/pav-bhaji.webp",
    color: "from-orange-100 via-orange-50 to-red-50",
  },
];

export function ImageCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: false })
  );

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
          <CarouselContent className="-ml-3 md:-ml-4">
            {showcaseImages.map((image) => (
              <CarouselItem
                key={image.id}
                className="pl-3 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="relative overflow-hidden rounded-xl border border-orange-200 bg-white">
                  {/* Card with gradient background */}
                  <div
                    className={`relative h-80 bg-gradient-to-br ${image.color}`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <div className="text-center">
                        {/* Image in dashed box */}
                        <div className="relative h-64 w-64 mx-auto rounded-lg border-2 border-dashed border-orange-300 bg-white/30 backdrop-blur-sm overflow-hidden">
                          <Image
                            src={image.image}
                            alt={image.name}
                            fill
                            className="object-cover"
                            sizes="192px"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Dish Name at bottom */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-center font-semibold text-sm text-gray-800 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-orange-200">
                        {image.name}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

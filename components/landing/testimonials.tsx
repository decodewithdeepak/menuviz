"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Restaurant Owner",
    restaurant: "Spice Garden",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
    content:
      "MenuViz transformed our menu overnight! We went from grainy phone photos to professional-looking images. Our online orders increased by 40% in just two weeks.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Head Chef",
    restaurant: "Tandoor Tales",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    content:
      "As a chef, presentation is everything. MenuViz captures the essence of my dishes perfectly. The AI understands food styling better than I expected!",
    rating: 5,
  },
  {
    id: 3,
    name: "Arjun Mehta",
    role: "Marketing Manager",
    restaurant: "Masala Junction",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
    content:
      "We saved thousands on food photography. The images look so realistic that customers often compliment us on our 'professional photoshoot'. Incredible value!",
    rating: 5,
  },
  {
    id: 4,
    name: "Sneha Reddy",
    role: "Cafe Owner",
    restaurant: "Chai & Chaat Corner",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
    content:
      "I was skeptical at first, but MenuViz exceeded my expectations. The close-up shots make our chai and snacks look absolutely irresistible!",
    rating: 5,
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Food Blogger",
    restaurant: "Desi Delights",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
    content:
      "Perfect for showcasing authentic Indian cuisine! The AI captures the vibrant colors and textures beautifully. My social media engagement has doubled!",
    rating: 5,
  },
  {
    id: 6,
    name: "Anjali Desai",
    role: "Restaurant Chain Owner",
    restaurant: "Biryani House",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali",
    content:
      "We use MenuViz across all 12 locations. Consistent, high-quality images for every menu item. It's a game-changer for multi-location businesses!",
    rating: 5,
  },
];

export function LandingTestimonials() {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-white via-orange-50/30 to-white overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
            Loved by{" "}
            <span className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent cursive-text">
              Restaurant Owners
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Join hundreds of restaurants using MenuViz to create stunning menu
            visuals
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 -left-3 h-12 w-12 z-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Quote className="h-6 w-6 text-orange-600 fill-orange-600" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-orange-500 fill-orange-500"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full bg-gray-100"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-orange-600 font-medium">
                    {testimonial.restaurant}
                  </p>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid gap-8 sm:grid-cols-3 text-center">
          <div>
            <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
            <p className="text-gray-600">Happy Restaurants</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-600 mb-2">50K+</div>
            <p className="text-gray-600">Images Generated</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-600 mb-2">4.9/5</div>
            <p className="text-gray-600">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}

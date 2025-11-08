"use client";

import { Button } from "@/components/ui/button";
import { Download, Trash2, Eye } from "lucide-react";

const dummyImages = [
  {
    id: 1,
    prompt: "Gourmet burger with cheese",
    style: "Photorealistic",
    createdAt: "2025-01-08",
  },
  {
    id: 2,
    prompt: "Pasta carbonara",
    style: "Rustic",
    createdAt: "2025-01-08",
  },
  {
    id: 3,
    prompt: "Chocolate cake",
    style: "Minimalist",
    createdAt: "2025-01-07",
  },
  {
    id: 4,
    prompt: "Sushi platter",
    style: "Artistic",
    createdAt: "2025-01-07",
  },
  {
    id: 5,
    prompt: "Caesar salad",
    style: "Photorealistic",
    createdAt: "2025-01-06",
  },
  {
    id: 6,
    prompt: "Pizza margherita",
    style: "Rustic",
    createdAt: "2025-01-06",
  },
];

export default function GalleryPage() {
  return (
    <div className="min-h-full p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Gallery</h1>
            <p className="text-sm text-gray-600">
              View and manage all your generated images
            </p>
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none">
              <option>All Styles</option>
              <option>Photorealistic</option>
              <option>Artistic</option>
              <option>Minimalist</option>
              <option>Rustic</option>
            </select>
            <select className="px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none">
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <p className="text-xs text-gray-600">Total Images</p>
            <p className="text-xl font-bold text-gray-900">24</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <p className="text-xs text-gray-600">This Week</p>
            <p className="text-xl font-bold text-gray-900">12</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <p className="text-xs text-gray-600">Downloaded</p>
            <p className="text-xl font-bold text-gray-900">8</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <p className="text-xs text-gray-600">Storage Used</p>
            <p className="text-xl font-bold text-gray-900">2.4 GB</p>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dummyImages.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="aspect-square bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto h-20 w-20 rounded-2xl border-4 border-dashed border-orange-300 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                    <Eye className="h-10 w-10 text-orange-400" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="font-semibold text-sm text-gray-900 mb-1 truncate">
                  {image.prompt}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded-full">
                    {image.style}
                  </span>
                  <span>{image.createdAt}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 px-2">
                    <Trash2 className="h-3 w-3 text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


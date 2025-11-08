"use client";

import { Button } from "@/components/ui/button";
import { Download, Eye, RefreshCw } from "lucide-react";

const historyItems = [
  {
    id: 1,
    prompt: "Gourmet burger with cheese and bacon",
    enhancedPrompt:
      "Gourmet burger with golden sesame bun, perfectly grilled beef patty, melted aged cheddar cheese...",
    style: "Photorealistic",
    status: "completed",
    createdAt: "2025-01-08 14:30",
  },
  {
    id: 2,
    prompt: "Pasta carbonara",
    enhancedPrompt:
      "Creamy pasta carbonara with al dente spaghetti, crispy pancetta, fresh parsley garnish...",
    style: "Rustic",
    status: "completed",
    createdAt: "2025-01-08 13:15",
  },
  {
    id: 3,
    prompt: "Chocolate cake",
    enhancedPrompt:
      "Decadent chocolate layer cake with rich ganache frosting, chocolate shavings...",
    style: "Minimalist",
    status: "completed",
    createdAt: "2025-01-08 11:45",
  },
  {
    id: 4,
    prompt: "Sushi platter",
    enhancedPrompt:
      "Elegant sushi platter with assorted nigiri, maki rolls, fresh wasabi...",
    style: "Artistic",
    status: "completed",
    createdAt: "2025-01-07 16:20",
  },
  {
    id: 5,
    prompt: "Caesar salad",
    enhancedPrompt:
      "Fresh Caesar salad with crisp romaine lettuce, parmesan shavings, croutons...",
    style: "Photorealistic",
    status: "failed",
    createdAt: "2025-01-07 15:10",
  },
];

export default function HistoryPage() {
  return (
    <div className="min-h-full p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Generation History
          </h1>
          <p className="text-sm text-gray-600">
            View all your image generation requests and their status
          </p>
        </div>

        {/* Filters */}
        <div className="mb-4 flex gap-2">
          <select className="px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none">
            <option>All Status</option>
            <option>Completed</option>
            <option>Failed</option>
          </select>
          <select className="px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>All Time</option>
          </select>
        </div>

        {/* History List */}
        <div className="space-y-3">
          {historyItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-base text-gray-900">
                      {item.prompt}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        item.status === "completed"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {item.status === "completed" ? "Completed" : "Failed"}
                    </span>
                    <span className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded-full text-xs font-medium">
                      {item.style}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {item.createdAt}
                  </p>
                </div>
                <div className="flex gap-2">
                  {item.status === "completed" ? (
                    <>
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Retry
                    </Button>
                  )}
                </div>
              </div>

              {/* Enhanced Prompt */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs font-semibold text-gray-700 mb-1">
                  Enhanced Prompt:
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.enhancedPrompt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-6 text-center">
          <Button variant="outline" size="sm">Load More</Button>
        </div>
      </div>
    </div>
  );
}


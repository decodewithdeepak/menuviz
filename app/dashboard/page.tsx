"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  Camera,
  Wand2,
  FileText,
  Megaphone,
  Palette,
  Package,
  ArrowRight,
  Image,
  History,
  Lightbulb
} from "lucide-react";

const features = [
  {
    id: "generate",
    title: "Food Image Generator",
    description: "Create stunning AI food photography for your menu items",
    icon: Camera,
    href: "/dashboard/generate",
    color: "orange",
    bgGradient: "from-orange-500 to-orange-600",
    borderColor: "border-orange-200 hover:border-orange-400",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600 group-hover:text-orange-700",
  },
  {
    id: "enhance",
    title: "Photo Enhancer",
    description: "Upload and enhance your real food photos with AI magic",
    icon: Wand2,
    href: "/dashboard/enhance",
    color: "purple",
    bgGradient: "from-purple-500 to-purple-600",
    borderColor: "border-purple-200 hover:border-purple-400",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600 group-hover:text-purple-700",
  },
  {
    id: "menu",
    title: "Menu Maker",
    description: "Design beautiful digital menus with AI-generated visuals",
    icon: FileText,
    href: "/dashboard/menu",
    color: "blue",
    bgGradient: "from-blue-500 to-blue-600",
    borderColor: "border-blue-200 hover:border-blue-400",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600 group-hover:text-blue-700",
  },
  {
    id: "posters",
    title: "Ad Poster Generator",
    description: "Create eye-catching promotional posters for your dishes",
    icon: Megaphone,
    href: "/dashboard/posters",
    color: "red",
    bgGradient: "from-red-500 to-red-600",
    borderColor: "border-red-200 hover:border-red-400",
    bgColor: "bg-red-50",
    textColor: "text-red-600 group-hover:text-red-700",
  },
  {
    id: "logo",
    title: "Logo Creator",
    description: "Design professional logos for your restaurant brand",
    icon: Palette,
    href: "/dashboard/logo",
    color: "pink",
    bgGradient: "from-pink-500 to-pink-600",
    borderColor: "border-pink-200 hover:border-pink-400",
    bgColor: "bg-pink-50",
    textColor: "text-pink-600 group-hover:text-pink-700",
  },
  {
    id: "packaging",
    title: "Packaging Designer",
    description: "Create branded packaging mockups for takeout and delivery",
    icon: Package,
    href: "/dashboard/packaging",
    color: "green",
    bgGradient: "from-green-500 to-green-600",
    borderColor: "border-green-200 hover:border-green-400",
    bgColor: "bg-green-50",
    textColor: "text-green-600 group-hover:text-green-700",
  },
];

const quickLinks = [
  {
    title: "Gallery",
    description: "View all your generated images",
    icon: Image,
    href: "/dashboard/gallery",
  },
  {
    title: "History",
    description: "Track your generation history",
    icon: History,
    href: "/dashboard/history",
  },
  {
    title: "Tips & Guide",
    description: "Learn how to get best results",
    icon: Lightbulb,
    href: "/dashboard/tips",
  },
];

export default function DashboardPage() {
  const [stats, setStats] = useState({ total: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { count } = await supabase
      .from("generated_images")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    setStats({ total: count || 0 });
  };

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Welcome to MenuViz
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              AI-powered tools to create stunning visuals for your restaurant
            </p>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-3 text-center flex-1 sm:flex-none sm:min-w-[100px]">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-600">Generated</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-3 text-center flex-1 sm:flex-none sm:min-w-[100px]">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">∞</p>
              <p className="text-xs text-gray-600">Remaining</p>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.id}
                href={feature.href}
                className={`group bg-white rounded-xl border-2 ${feature.borderColor} p-5 shadow-sm hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.bgGradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-gray-900 mb-1 ${feature.textColor} transition-colors`}>
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <div className={`mt-4 flex items-center text-sm font-medium ${feature.textColor}`}>
                  Get Started
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 p-4 hover:border-orange-300 hover:shadow-sm transition-all"
                >
                  <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900">{link.title}</h3>
                    <p className="text-xs text-gray-500">{link.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Getting Started Banner */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold mb-1">New to MenuViz?</h2>
              <p className="text-orange-100 text-sm">
                Check out our tips and guide to create professional food imagery
              </p>
            </div>
            <Link
              href="/dashboard/tips"
              className="inline-flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-orange-50 transition-colors"
            >
              <Lightbulb className="h-4 w-4" />
              View Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

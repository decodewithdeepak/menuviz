"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoFastFood } from "react-icons/io5";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-12 flex-col justify-between relative overflow-hidden">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-xl text-white z-10"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-md shadow-orange-500/30">
            <IoFastFood className="h-6 w-6 text-white" />
          </div>
          <span>MenuViz</span>
        </Link>

        {/* Main Content */}
        <div className="z-10">
          <h1 className="text-4xl font-bold text-white mb-6">
            Transform Your Menu with <br /> AI-Powered Visuals
          </h1>
          <p className="text-gray-300 text-lg mb-12">
            Create your free account and start generating professional food
            images instantly.
          </p>

          {/* Steps */}
          <div className="flex gap-4 mt-40">
            <div className="flex-1 p-4 rounded-xl bg-white shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20 text-orange-600 font-semibold mb-3">
                1
              </div>
              <h3 className="text-gray-900 text-sm font-medium">
                Sign in or create your account
              </h3>
            </div>
            <div className="flex-1 p-4 rounded-xl bg-white shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20 text-orange-600 font-semibold mb-3">
                2
              </div>
              <h3 className="text-gray-900 text-sm font-medium">
                Configure your workspace and tools
              </h3>
            </div>
            <div className="flex-1 p-4 rounded-xl bg-white shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20 text-orange-600 font-semibold mb-3">
                3
              </div>
              <h3 className="text-gray-900 text-sm font-medium">
                Start generating stunning food images
              </h3>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-gray-400 text-sm z-10">
          © 2025 MenuViz. All rights reserved.
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent cursive-text">
                Get Started
              </span>
            </h2>
            <p className="text-gray-600">
              Create your free account to continue
            </p>
          </div>

          {/* Google Sign In */}
          <Button
            variant="outline"
            className="w-full h-12 mb-6 border-2 hover:bg-gray-50"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or</span>
            </div>
          </div>

          {/* Name Inputs */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                className="w-full h-12 px-4 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                className="w-full h-12 px-4 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                className="w-full h-12 pl-10 pr-4 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full h-12 pl-10 pr-12 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="mb-6">
            <label className="flex items-start">
              <input
                type="checkbox"
                className="mr-2 mt-1 h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 accent-orange-600"
              />
              <span className="text-sm text-gray-600">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          {/* Sign Up Button */}
          <Button className="w-full h-12 text-base font-semibold mb-6">
            Sign Up
          </Button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-orange-600 hover:text-orange-700 font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

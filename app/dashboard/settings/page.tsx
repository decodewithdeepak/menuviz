"use client";

import { Button } from "@/components/ui/button";
import { Save, User, Bell, Key, CreditCard } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-full p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Settings</h1>
          <p className="text-sm text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="space-y-4">
          {/* Profile Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <User className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Profile Information
                </h2>
                <p className="text-xs text-gray-600">
                  Update your personal details
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full h-9 px-3 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className="w-full h-9 px-3 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="john@example.com"
                  className="w-full h-9 px-3 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>
              <Button size="sm">
                <Save className="mr-2 h-3 w-3" />
                Save Changes
              </Button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Bell className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Notifications
                </h2>
                <p className="text-xs text-gray-600">
                  Manage your notification preferences
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Email Notifications
                  </p>
                  <p className="text-xs text-gray-600">
                    Receive email updates about your generations
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 accent-orange-600"
                />
              </label>
              <label className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Generation Complete
                  </p>
                  <p className="text-xs text-gray-600">
                    Get notified when image generation is complete
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 accent-orange-600"
                />
              </label>
              <label className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Weekly Summary
                  </p>
                  <p className="text-xs text-gray-600">
                    Receive weekly summary of your activity
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 accent-orange-600"
                />
              </label>
            </div>
          </div>

          {/* API Keys */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Key className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  API Configuration
                </h2>
                <p className="text-xs text-gray-600">
                  Manage your API keys and settings
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Google Gemini API Key
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    defaultValue="sk-••••••••••••••••"
                    className="flex-1 h-9 px-3 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                  />
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </div>
              </div>
              <p className="text-xs text-gray-600">
                Your API key is encrypted and stored securely. It's used to
                generate images and enhance prompts.
              </p>
            </div>
          </div>

          {/* Subscription */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Subscription
                </h2>
                <p className="text-xs text-gray-600">
                  Manage your subscription and billing
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Free Plan</h3>
                  <p className="text-xs text-gray-600">Unlimited generations</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-600">$0</p>
                  <p className="text-xs text-gray-600">per month</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Upgrade to Pro
              </Button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-xl border border-red-200 p-5 shadow-sm">
            <h2 className="text-base font-semibold text-red-900 mb-3">
              Danger Zone
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Delete Account
                </p>
                <p className="text-xs text-gray-600">
                  Permanently delete your account and all data
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

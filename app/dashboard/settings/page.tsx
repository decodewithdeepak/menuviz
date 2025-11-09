"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Save,
  User,
  Loader2,
  CheckCircle,
  Key,
  Eye,
  EyeOff,
  LogOut,
  Trash2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { signout } from "@/app/(auth)/actions";

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);

  useEffect(() => {
    fetchUserData();
    // Load API key from localStorage
    const savedApiKey = localStorage.getItem("gemini_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const fetchUserData = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
      setEmail(user.email || "");
      setFullName(user.user_metadata?.full_name || "");

      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
        if (profileData.full_name) {
          setFullName(profileData.full_name);
        }
      }
    }
    setLoading(false);
  };

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("gemini_api_key", apiKey.trim());
    } else {
      localStorage.removeItem("gemini_api_key");
    }
    alert("API key saved locally!");
  };

  const handleClearApiKey = () => {
    setApiKey("");
    localStorage.removeItem("gemini_api_key");
    alert("API key cleared!");
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    const supabase = createClient();

    // Update profile in database
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    // Update auth metadata
    await supabase.auth.updateUser({
      data: { full_name: fullName },
    });

    setSaving(false);
    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleSignOut = async () => {
    await signout();
  };

  if (loading) {
    return (
      <div className="min-h-full p-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Settings</h1>
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
              {/* Profile Picture */}
              {user?.user_metadata?.avatar_url && (
                <div className="flex items-center gap-4 pb-3 border-b border-gray-100">
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata?.full_name || "User"}
                    className="h-16 w-16 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Profile Picture
                    </p>
                    <p className="text-xs text-gray-500">From Google Account</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-9 px-3 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full h-9 px-3 text-sm border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button
                  onClick={handleSave}
                  disabled={saving || !fullName}
                  className="flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : saved ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* API Configuration */}
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
                  Use your own Gemini API key (optional)
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Google Gemini API Key (should support image generation)
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIza... (leave empty to use shared key)"
                    className="w-full h-9 px-3 pr-10 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showApiKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Get your API key from{" "}
                  <a
                    href="https://makersuite.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 underline"
                  >
                    Google AI Studio
                  </a>
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  <strong>Note:</strong> Your API key is stored locally in your
                  browser. If you provide your own key, it will be used for all
                  your generations. Leave empty to use the shared API key
                  (subject to rate limits).
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button
                  onClick={handleSaveApiKey}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save API Key
                </Button>
                {apiKey && (
                  <Button
                    variant="outline"
                    onClick={handleClearApiKey}
                    className="text-xs"
                  >
                    Clear API Key
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Account Information
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Account ID</span>
                <span className="text-gray-900 font-mono text-xs">
                  {user?.id.slice(0, 8)}...
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Account Created</span>
                <span className="text-gray-900">
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Last Sign In</span>
                <span className="text-gray-900">
                  {user?.last_sign_in_at
                    ? new Date(user.last_sign_in_at).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Email Verified</span>
                <span
                  className={`font-medium ${
                    user?.email_confirmed_at
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {user?.email_confirmed_at ? "Yes" : "Pending"}
                </span>
              </div>
            </div>
          </div>

          {/* Sign Out */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <LogOut className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    Sign Out
                  </h2>
                  <p className="text-xs text-gray-600">
                    Sign out of your account
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700 w-full sm:w-auto flex-shrink-0"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-xl border border-red-200 p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-red-600 mb-1">
                  Danger Zone
                </h2>
                <p className="text-xs text-gray-600">
                  These actions are irreversible. Please be careful.
                </p>
              </div>
              <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 w-full sm:w-auto flex-shrink-0"
                onClick={() =>
                  alert("Delete account functionality would go here")
                }
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

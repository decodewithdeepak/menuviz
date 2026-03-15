"use client";
/* eslint-disable @next/next/no-img-element */

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
  Store,
  UploadCloud,
  ChefHat,
  Utensils,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import { signout } from "@/app/(auth)/actions";
import { useAuth } from "@/components/providers/auth-provider";
import { toast } from "sonner";

export default function SettingsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savedProfile, setSavedProfile] = useState(false);
  
  const [savingRestaurant, setSavingRestaurant] = useState(false);
  const [savedRestaurant, setSavedRestaurant] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [role, setRole] = useState("");
  const [primaryCuisine, setPrimaryCuisine] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [apiKey, setApiKey] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("gemini_api_key") || "";
    }
    return "";
  });
  const [showApiKey, setShowApiKey] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
          setLoading(false);
          return;
      }
      const supabase = createClient();

      setEmail(user.email || "");
      setFullName(user.user_metadata?.full_name || "");

      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData) {
        if (profileData.full_name) {
          setFullName(profileData.full_name);
        }
        if (profileData.restaurant_name) setRestaurantName(profileData.restaurant_name);
        if (profileData.role) setRole(profileData.role);
        if (profileData.primary_cuisine) setPrimaryCuisine(profileData.primary_cuisine);
        if (profileData.restaurant_logo_url) setLogoPreview(profileData.restaurant_logo_url);
      }
      setLoading(false);
    };

    if (!authLoading) {
      fetchUserData();
    }
  }, [user, authLoading]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
    }
  };

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      localStorage.removeItem("gemini_api_key");
      toast("API Key Removed", {
        description: "You are now using the shared platform key.",
      });
      return;
    }

    try {
      const response = await fetch("/api/validate-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Invalid API Key");
      }

      localStorage.setItem("gemini_api_key", apiKey.trim());
      toast.success("API Key Saved", {
        description: "Your Gemini API key has been validated and securely saved locally.",
      });
    } catch (error) {
       toast.error("Validation Failed", {
        description: error instanceof Error ? error.message : "Invalid API Key. Please check and try again.",
      });
      setApiKey("");
      localStorage.removeItem("gemini_api_key");
    }
  };

  const handleClearApiKey = () => {
    setApiKey("");
    localStorage.removeItem("gemini_api_key");
    toast("API Key Cleared", {
      description: "Local API key successfully removed.",
    });
  };

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    setSavedProfile(false);

    const supabase = createClient();

    if (!user) {
      setSavingProfile(false);
      return;
    }

    // Update profile in database
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    // Update auth metadata
    const { error: authError } = await supabase.auth.updateUser({
      data: { full_name: fullName },
    });

    setSavingProfile(false);
    
    if (profileError || authError) {
      toast.error("Error Saving Profile", {
        description: (profileError || authError)?.message || "An unknown error occurred.",
      });
      return;
    }

    setSavedProfile(true);
    toast.success("Profile Updated", {
      description: "Your profile information has been successfully saved.",
    });
    setTimeout(() => setSavedProfile(false), 3000);
  };

  const handleSaveRestaurant = async () => {
    setSavingRestaurant(true);
    setSavedRestaurant(false);

    const supabase = createClient();

    if (!user) {
      setSavingRestaurant(false);
      return;
    }

    let logoUrl = logoPreview;

    // Handle logo upload if provided
    if (logoFile) {
      const fileExt = logoFile.name.split('.').pop();
      const fileName = `${user.id}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('restaurant_logos')
        .upload(fileName, logoFile);

      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from('restaurant_logos')
          .getPublicUrl(fileName);
          
        logoUrl = publicUrlData.publicUrl;
      } else {
        toast.error("Logo Upload Failed", {
          description: "Could not upload new logo. Continuing with save.",
        });
      }
    }

    // Update profile in database
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        restaurant_name: restaurantName,
        role: role,
        primary_cuisine: primaryCuisine,
        restaurant_logo_url: logoUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    setSavingRestaurant(false);
    
    if (profileError) {
      toast.error("Error Saving Restaurant Details", {
        description: profileError.message || "An unknown error occurred.",
      });
      return;
    }

    setSavedRestaurant(true);
    toast.success("Restaurant Details Updated", {
      description: "Your business information has been successfully saved.",
    });
    setTimeout(() => setSavedRestaurant(false), 3000);
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
                  onClick={handleSaveProfile}
                  disabled={savingProfile || !fullName}
                  className="flex items-center gap-2"
                >
                  {savingProfile ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : savedProfile ? (
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

          {/* Restaurant Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Store className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Restaurant Details
                </h2>
                <p className="text-xs text-gray-600">
                  Manage your business profile and branding
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Restaurant Logo */}
              <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                <div className="relative h-16 w-16 rounded-lg border-2 border-dashed border-gray-300 hover:border-orange-500 transition-colors bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0 group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    title="Change Logo"
                  />
                  {logoPreview ? (
                    <>
                      <img src={logoPreview} alt="Restaurant Logo" className="h-full w-full object-contain p-1" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <UploadCloud className="h-5 w-5 text-white" />
                      </div>
                    </>
                  ) : (
                    <UploadCloud className="h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Brand Logo</p>
                  <p className="text-xs text-gray-500">Click to upload a new logo (PNG, JPG)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Restaurant Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Store className="h-3 w-3 text-orange-500" /> Restaurant Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    className="w-full h-9 px-3 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <ChefHat className="h-3 w-3 text-orange-500" /> Your Role <span className="text-red-500">*</span>
                  </label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="w-full h-9 px-3 py-0 flex items-center text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-0 focus:outline-none transition-colors bg-white hover:bg-white shadow-none">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-gray-100 rounded-lg shadow-xl">
                      <SelectItem value="Owner" className="text-sm cursor-pointer hover:bg-orange-50">Owner</SelectItem>
                      <SelectItem value="Manager" className="text-sm cursor-pointer hover:bg-orange-50">Manager</SelectItem>
                      <SelectItem value="Chef" className="text-sm cursor-pointer hover:bg-orange-50">Chef</SelectItem>
                      <SelectItem value="Marketing" className="text-sm cursor-pointer hover:bg-orange-50">Marketing / Agency</SelectItem>
                      <SelectItem value="Other" className="text-sm cursor-pointer hover:bg-orange-50">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Primary Cuisine */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Utensils className="h-3 w-3 text-orange-500" /> Primary Cuisine <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={primaryCuisine}
                    onChange={(e) => setPrimaryCuisine(e.target.value)}
                    placeholder="e.g. Italian, Sushi, Cafe"
                    className="w-full h-9 px-3 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <Button
                  onClick={handleSaveRestaurant}
                  disabled={savingRestaurant || !restaurantName || !role}
                  className="flex items-center gap-2"
                >
                  {savingRestaurant ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving Details...
                    </>
                  ) : savedRestaurant ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Details
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

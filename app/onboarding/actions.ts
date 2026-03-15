"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function completeOnboarding(formData: FormData) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const restaurantName = formData.get("restaurantName") as string;
  const role = formData.get("role") as string;
  const primaryCuisine = formData.get("primaryCuisine") as string;
  const logoFile = formData.get("logo") as File | null;

  if (!restaurantName || !role) {
    return { error: "Restaurant Name and Role are required." };
  }

  let logoUrl = null;

  // Handle logo upload if provided
  if (logoFile && logoFile.size > 0) {
    const fileExt = logoFile.name.split('.').pop();
    const fileName = `${user.id}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { error: uploadError, data } = await supabase.storage
      .from('restaurant_logos')
      .upload(fileName, logoFile);

    if (uploadError) {
      console.error("Logo upload error:", uploadError);
      return { error: "Failed to upload logo." };
    }

    const { data: publicUrlData } = supabase.storage
      .from('restaurant_logos')
      .getPublicUrl(fileName);
      
    logoUrl = publicUrlData.publicUrl;
  }

  // Update profile
  const updates: any = {
    restaurant_name: restaurantName,
    role: role,
    primary_cuisine: primaryCuisine,
    updated_at: new Date().toISOString(),
  };

  if (logoUrl) {
    updates.restaurant_logo_url = logoUrl;
  }

  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id);

  if (error) {
    console.error("Profile update error:", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

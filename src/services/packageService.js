import { supabase } from "../lib/supabaseClient";

export async function getActivePackages() {
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function getAllPackages() {
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function updatePackage(packageId, updates) {
  const { data, error } = await supabase
    .from("packages")
    .update(updates)
    .eq("id", packageId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
import { supabase } from "../lib/supabaseClient";

export async function getSiteSettings() {
  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value");

  if (error) {
    throw error;
  }

  return data.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
}

export async function updateSiteSetting(key, value) {
  const { data, error } = await supabase
    .from("site_settings")
    .upsert(
      {
        key,
        value,
      },
      {
        onConflict: "key",
      }
    )
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateSiteSettings(settings) {
  const rows = Object.entries(settings).map(([key, value]) => ({
    key,
    value,
  }));

  const { data, error } = await supabase
    .from("site_settings")
    .upsert(rows, {
      onConflict: "key",
    })
    .select();

  if (error) {
    throw error;
  }

  return data;
}
import { supabase } from "../lib/supabaseClient";

export async function getCtaEvents(limit = 100) {
  const { data, error } = await supabase
    .from("cta_events")
    .select(`
      id,
      event_name,
      target,
      page_path,
      created_at,
      package_id,
      packages (
        name
      )
    `)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data;
}
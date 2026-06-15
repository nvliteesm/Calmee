import { supabase } from "../lib/supabaseClient";

export async function trackCtaClick({ eventName, target, packageId = null }) {
  try {
    const { error } = await supabase.from("cta_events").insert({
      event_name: eventName,
      target,
      package_id: packageId,
      page_path: window.location.pathname,
    });

    if (error) {
      console.error("CTA tracking error:", error);
    }
  } catch (error) {
    console.error("CTA tracking failed:", error);
  }
}
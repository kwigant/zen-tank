import { supabase } from "@/utils/supabase";

export async function getCurrentProfile(sessionId: string) {
      const { data, error } = await supabase
        .from("Profiles")
        .select()
        .eq("user_id", sessionId);
      if (error) throw error;
      if (data) return data[0];
  }



import { GetCurrentProfile, profile } from "@/constants/Types"
import { supabase } from "./supabase"


export async function getCurrentProfile({setLoading, session}: GetCurrentProfile) {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("Profiles")
        .select()
        .eq("user_id", session?.user.id);
      if (error) throw error;
      if (data) {
        return data;
      }
    } catch (err) {
      throw err;
    }
  }
import { profile, updateProfileInput } from "@/constants/Types";
import { supabase } from "@/utils/supabase";

export async function getCurrentProfile(sessionId: string) {
      const { data, error } = await supabase
        .from("Profiles")
        .select()
        .eq("user_id", sessionId);
      if (error) throw error;
      if (data) return data[0];
  }



export async function updateProfile(profileObj: updateProfileInput) {
  //console.log('update profile')
    const { data, error } = await supabase
      .from("Profiles")
      .update({
        tanks: profileObj.tanks,
        current_tank_id: profileObj.current_tank_id, 
        current_tank_name: profileObj.current_tank_name, 
        current_tank_size: profileObj.current_tank_size, 
        current_tank_description: profileObj.current_tank_description, 
        current_tank_dgh: profileObj.current_tank_dgh,
        current_tank_temp: profileObj.current_tank_temp
      })
      .eq("user_id", profileObj.user_id)
      .select();
    if (error) throw error;
    if (data) return data;
  }
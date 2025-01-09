import { supabase } from "../utils/supabase";
import { tank } from "@/constants/Types";

export async function listTanks(userId: string) {
    const { data, error } = await supabase
      .from("Tanks")
      .select()
      .eq("user_id", userId);
    if (error) throw error;
    if (data) return data;
}

export async function getTank(tankId: string) {
  const { data, error } = await supabase
    .from("Tanks")
    .select()
    .eq("tank_id", tankId);
  if (error) throw error;
  if (data) return data;
}

export async function createTank(tank: tank ) {
    const { error, data } = await supabase
      .from("Tanks")
      .upsert(tank)
      .select();
    if (error) throw error;
    if (data) return data
}

export async function deleteTank(tankId: string) {
  if (tankId) {
    const { error } = await supabase
      .from("Tanks")
      .delete()
      .eq("tank_id", tankId)
      .select();
    
    if (error) throw error;
  }  
}
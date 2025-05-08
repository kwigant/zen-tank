import { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";
import { fish, Logs, plant, tank, Tasks } from "@/constants/Types";

export async function listLogs(tankId: string) {
    const { data, error } = await supabase
      .from("Logs")
      .select()
      .eq("tank_id", tankId);
    if (error) throw error;
    if (data) return data;
}

export const getLog = async (id: string) => {
  const { data, error } = await supabase
    .from("Logs")
    .select()
    .eq("id", id);
  if (error) throw error;
  if (data) return data[0] as Logs;
}

export async function createLog(log: Logs ) {
    const { error, data } = await supabase
      .from("Logs")
      .upsert(log)
      .select();
    if (error) throw error;
    if (data) return data
}

export async function deleteLog(log_id: string) {
  if (log_id) {
    const { error } = await supabase
      .from("Logs")
      .delete()
      .eq("log_id", log_id)
      .select();
    
    if (error) throw error;
  }  
}

export async function editLog(log_id: string, updated_log: Logs) {
  try {
    const { data, error } = await supabase
    .from('Logs')
    .update(updated_log)
    .eq('log_id', log_id)
    .select()
    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
}

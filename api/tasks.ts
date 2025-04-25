import { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";
import { fish, plant, tank, Tasks } from "@/constants/Types";

export async function listTasks(userId: string) {
    const { data, error } = await supabase
      .from("Tasks")
      .select()
      .eq("user_id", userId);
    if (error) throw error;
    if (data) return data;
}

export const getTask = async (task_id: string) => {
  const { data, error } = await supabase
    .from("Tasks")
    .select()
    .eq("id", task_id);
  if (error) throw error;
  if (data) return data[0] as tank;
}

export async function createTask(task: Tasks ) {
    const { error, data } = await supabase
      .from("Tasks")
      .upsert(task)
      .select();
    if (error) throw error;
    if (data) return data
}

export async function deleteTask(task_id: string) {
  if (task_id) {
    const { error } = await supabase
      .from("Tasks")
      .delete()
      .eq("task_id", task_id)
      .select();
    
    if (error) throw error;
  }  
}

export async function editTask(task_id: string, updated_task: Tasks) {
  try {
    const { data, error } = await supabase
    .from('Tasks')
    .update(updated_task)
    .eq('task_id', task_id)
    .select()
    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
}

import { plant } from "@/constants/Types";
import { supabase } from "@/utils/supabase";

export const fetchPlantById = async (id: string) => {
    const { data, error } = await supabase
        .from("Plants") // Replace with your table name
        .select()
        .eq("id", id);

    if (error) {
        console.error("Error fetching data:", error);
    } else {
       return data[0] as plant;
    }
};

export const fetchPlantList = async () => {
    const { data, error } = await supabase
        .from("Plants") // Replace with your table name
        .select('*')

    if (error) {
        console.error("Error fetching data:", error);
    } else {
       return data as plant[];
    }
};

export const searchPlantData = async (searchQuery: string) => {
  const { data, error } = await supabase
    .from("Plants")
    .select()
    .ilike('name', `%${searchQuery}%`)
  if (error) {
    console.error("Error fetching data:", error);
  } else {
    return data as plant[];
  }
}
import { fish } from "@/constants/Types";
import { supabase } from "@/utils/supabase";

export async function getFishInTank(tank_id: string) {
    const { data, error } = await supabase
      .from("TankFish")
      .select('*')
      .eq("tank_id", tank_id);
    if (error) throw error;
    if (data) return data;
}


// export async function getPlantsInTank(tank_id: string) {
//   const { data, error } = await supabase
//     .from("TankPlants")
//     .select('*')
//     .eq("tank_id", tank_id);
//   if (error) throw error;
//   if (data) return data;
// }

// Fetch specific fish given an id
export const fetchFish = async (id: string) => {
  const { data, error } = await supabase
    .from("Fish") // Replace with your table name
    .select()
    .eq("id", id);
  if (error) {
    console.error("Error fetching data:", error);
  } else {
    return data[0] as fish
  }
};

// fetch all fish in db
export const fetchFishList = async () =>{
  const { data, error } = await supabase
    .from("Fish")
    .select("*");
  if (error) {
    console.error("Error fetching data:", error);
  } else {
    return data as fish[];
  }
};

// search all fish and return those that match query 
export const searchFishData = async (searchQuery: string) => {
  const { data, error } = await supabase
    .from("Fish")
    .select()
    .ilike('name', `%${searchQuery}%`)
  if (error) {
    console.error("Error fetching data:", error);
  } else {
    return data as fish[];
  }
}

// async function addFish(tank_id: string, fish: fish) {
//     try {
//       if (user) {
//         const { error } = await supabase
//           .from("TankFish")
//           .upsert({
//             fish_id: fish.id,
//             name: fish.name,
//             user_id: user.id,
//             sizeAtMaturity: fish.sizeAtMaturity,
//             waterTemperature: fish.waterTemperature,
//             tankSize: fish.tankSize,
//             temperament: fish.temperament,
//             tank_id: tank_id,
//             email: user.email,
//           })
//           .select();
//         if (error) {
//           throw error;
//         }
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         alert(error.message);
//       }
//     }
//   }
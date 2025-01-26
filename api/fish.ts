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

export async function getPlantsInTank(tank_id: string) {
  const { data, error } = await supabase
    .from("TankPlants")
    .select('*')
    .eq("tank_id", tank_id);
  if (error) throw error;
  if (data) return data;
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
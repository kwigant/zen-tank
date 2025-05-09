import { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";
import { fish, plant, tank } from "@/constants/Types";

export async function listTanks(userId: string) {
    const { data, error } = await supabase
      .from("Tanks")
      .select()
      .eq("user_id", userId);
    if (error) throw error;
    if (data) return data;
}

export const getTank = async (tankId: string) => {
  const { data, error } = await supabase
    .from("Tanks")
    .select()
    .eq("tank_id", tankId);
  if (error) throw error;
  if (data) return data[0] as tank;
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

export async function editTank(tank_id: string, updatedTank: tank) {
  try {
    const { data, error } = await supabase
    .from('Tanks')
    .update(updatedTank)
    .eq('tank_id', tank_id)
    .select()
    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
}

export async function addPlant(tank_id: string, user: User, plant: plant) {
  try {
    if (user && plant) {
      const { error } = await supabase
        .from("TankPlants")
        .upsert({
          plant_id: plant.id,
          name: plant.name,
          user_id: user.id,
          tank_id: tank_id,
          email: user.email,
          img: plant.img,
          ph: plant.ph,
          temperature: plant.ph
        })
        .select();
      if (error) {
        throw error;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
}

export  async function addFish(tank_id: string, user: User, fish: fish) {
  try {
    if (user && fish) {
      const { error } = await supabase
        .from("TankFish")
        .upsert({
          fish_id: fish.id,
          name: fish.name,
          user_id: user.id,
          img: fish.img,
          sizeAtMaturity: fish.sizeAtMaturity,
          waterTemperature: fish.waterTemperature,
          tankSize: fish.tankSize,
          temperament: fish.temperament,
          tank_id: tank_id,
          email: user.email,
        })
        .select();
      if (error) {
        throw error;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
}

export async function getFishInTank(tank_id: string) {
  try {
    if (tank_id) {
      const {data,  error } = await supabase
        .from("TankFish")
        .select()
        .eq("tank_id", tank_id);
      if (error) {
        throw error;
      }
      return data
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
}


export async function deletePlantInTank(id: string) {
  try {
    if (id) {
      const { error } = await supabase
        .from('TankPlants')
        .delete()
        .eq('id', id)
      if (error) {
        throw error;
      }
      
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
}

export async function deleteFishInTank(id: string) {
  try {
    if (id) {
      const { error } = await supabase
        .from('TankFish')
        .delete()
        .eq('id', id)
      if (error) {
        throw error;
      }
      
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
}

export async function updateFishInTank(tank_id: string, fish_count: number ) {
  const { data, error } = await supabase
  .from('Tanks')
  .update({ fish_count: fish_count })
  .eq('tank_id', tank_id)
  .select()
  if (error) throw error;
  if (data) return data
}

export async function updatePlantsInTank(tank_id: string, plant_count: number ) {
  const { data, error } = await supabase
  .from('Tanks')
  .update({ plant_count: plant_count })
  .eq('tank_id', tank_id)
  .select()
  if (error) throw error;
  if (data) return data
}
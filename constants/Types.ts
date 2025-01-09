import { Dispatch, SetStateAction } from "react";
import { Session } from "@supabase/supabase-js";

// ITEM PROPS--------------------------------
// Fish Item
export type fish = {
  name: string;//
  img: string;
  id: string;//
  sizeAtMaturity: string;//
  tankSize: string;//
  temperament: string; 
  waterTemperature: string;//
  pH: string;//
  hardness: string;//
  tankSetup: string;//
  diet: string;//
  careLevel: string;//
  lifespan: string;//
  preferredSwimDepth: string;
  preferredNumber: string;//
  specialEquipment: string;//
  idealSubstrates: string;//
  popularityLevel: string;
  compatibleSpecies: string;
  typicalBehavior: string;//
  feedingHabits: string;//
  breedingFrequency: string;//
  fryCount: string;//
};
  

//Plant Item
export type plant = {
  id: string;
  img: string;
  water_type: string; // Freshwater
  name: string;
  pH: string;
  temperature: string;
  hardness: string;
  light_levels: string;
  fertilizer: string;
  commonProblems: string;
  ideal_substrates: string;
  ideal_tank_placement: string;
  planting_instructions: string;
  water_change_schedule: string;
}

// Tank Item
export type tank = {
 //id: number;
  tank_id: string;
  name: string;
  user_id: string;
  size: number;
  email?: string;
  // fish: string[]; // fish ids
  // plants: string[]; // plant ids
}

// User Profile 
export type profile = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  initials: string;
  tanks: number; // tank number
  img: string;
  current_tank_id: string;
  current_tank_name: string;
  current_tank_size: number;
}

// API PROPS--------------------------------
// Create Account - Auth
export type SignUpProps = {
  email: string, 
  password: string, 
  first: string,
  last: string
}

  export type TankFish = {
    id: string;
    fish_id: string;
    name: string;
    user_id: string;
    tank_id: string;
    sizeAtMaturity: string;//
    temperament: string; 
    tankSize: string;//
    waterTemperature: string;//
    img: string;
  };

// Log In to Account - Auth
export type SignInProps = {
  email: string, 
  password: string, 
  // setLoading: Dispatch<SetStateAction<boolean>>
}

// Get Current Profile - Profiles
export type GetCurrentProfile = {
  session: Session, 
  setLoading: Dispatch<SetStateAction<boolean>>
}

export type updateProfileInput = {
  tanks: number, 
  current_tank_id: string, 
  current_tank_name: string,
  current_tank_size: number,
  user_id: string
}

// Search Data Props - Fish
export type SearchDataProps = {
  searchQuery: string,
  setData: Dispatch<SetStateAction<fish[]>>
}

export type FetchFishProps = {
  setFishData: Dispatch<SetStateAction<fish[]>>
}
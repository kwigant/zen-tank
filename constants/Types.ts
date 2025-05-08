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
  name: string;
  ph: string;
  temperature: string;
  hardness: string;
  lighting: string;
  fertilization: string;
  maintenance: string;
  growth_rate: string;
  size: string;
  look: string;
  texture: string;
  tank_with_fish: string;
}

// Tank Item
export type tank = {
  tank_id: string;
  name: string;
  user_id: string;
  size: number;
  description: string;
  email?: string;
  fish_count: number;
  plant_count: number;
  temp: string;
  substrates: string;
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
}

// API PROPS--------------------------------
// Create Account - Auth
export type SignUpProps = {
  email: string, 
  password: string, 
  first: string,
  last: string
}

export type TankPlants = {
  id: string,
  name: string,
  user_id: string,
  tank_id: string,
  plant_id: string, 
  img: string,
  temperature: string,
  ph: string
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
    pH: string;
    hardness: string;
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


// Search Data Props - Fish
export type SearchDataProps = {
  searchQuery: string,
}

export type FetchFishProps = {
  setFishData: Dispatch<SetStateAction<fish[]>>
}

export type Tasks = {
  task_id: string;
  tank_id: string;
  user_id: string;
  name: string;
  description: string;
  checked: boolean;
  email: string;
}

export type Logs = {
  log_id: string;
  tank_id: string; 
  date_added: string;
  title: string;
  description: string;
  user_id: string;
  email: string;
}

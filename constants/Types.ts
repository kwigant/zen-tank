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
  
export type plant = {
  id: string;
  img: string;
  waterType: string;
  name: string;
  waterTemperature: string;
  sunlight: string;
  fertilizer: string;
  compatibleFish: string[];
  susceptibleTo: string[];
  substrate: string;
  tankPlacement: string;
}
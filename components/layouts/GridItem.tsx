import { style } from "@/constants/Styles";
import { fish, plant, TankFish, TankPlants } from "@/constants/Types";
import { Link, RelativePathString } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Avatar, Icon, Text } from "react-native-paper";

export type GridProps = {
  item: fish | TankFish | plant | TankPlants;
  isFish: boolean;
  tab: string;
  tank_id: string | null;
  tank_name: string | null;
  fish_count: string | null;
  plant_count: string | null;
};
export type FishProps = { fish: fish | TankFish };
export type PlantProps = { plant: plant };

const FishTag = ({ fish }: FishProps) => {
  return (
    <View style={style.row}>
      <Text variant="bodySmall" style={{ marginRight: 4 }}>
        {fish.sizeAtMaturity}
      </Text>
      <Icon source="circle" size={4} />
      <Text variant="bodySmall" style={{ marginHorizontal: 8 }}>
        {fish.tankSize} @ {fish.waterTemperature}
      </Text>
      <Icon source="circle" size={4} />
      <Text variant="bodySmall" style={{ marginHorizontal: 8 }}>
        {fish.temperament}
      </Text>
    </View>
  );
};

const PlantTag = ({ plant }: PlantProps) => {
  return (
    <View style={style.row}>
      <Text variant="bodySmall" style={{ marginHorizontal: 4 }}>
        {plant.temperature}
      </Text>
      <Icon source="circle" size={4} />
      {/* <Text variant="bodySmall" style={{ marginHorizontal: 4 }}>
      {plant.hardness} dGH
      </Text>
      <Icon source="circle" size={4} /> */}
      <Text variant="bodySmall" style={{ marginLeft: 4 }}>
        {plant.ph} pH
      </Text>
    </View>
  );
};

export default function GridItem({
  item,
  isFish,
  tab,
  tank_id,
  tank_name,
  fish_count, 
  plant_count
}: GridProps) {
  const path = isFish
    ? `(tabs)/${tab}/fish-profile`
    : `(tabs)/${tab}/plant-profile`;
  return (
    <Link
      href={{
        pathname: path as RelativePathString,
        params: { id: item.id, tank_id: tank_id, tank_name: tank_name, fish_count: fish_count, plant_count: plant_count },
      }}
      style={{ width: "100%" }}
    >
      <View style={[style.listItem]}>
        <Avatar.Image size={50} source={{ uri: item.img }} />
        <View style={{ marginLeft: 12, alignSelf: "center" }}>
          <Text variant="headlineSmall" style={{ marginBottom: 4 }}>
            {item.name}
          </Text>
          {isFish ? (
            <FishTag fish={item as fish} />
          ) : (
            <PlantTag plant={item as plant} />
          )}
        </View>
      </View>
    </Link>
  );
}

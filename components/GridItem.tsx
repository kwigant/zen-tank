import { style } from "@/constants/Global";
import { fish, plant } from "@/constants/Types";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Avatar, Icon, Text } from "react-native-paper";

export type GridProps = { item: fish | plant; isFish: boolean };
export type FishProps = { fish: fish };
export type PlantProps = { plant: plant };

const FishTag = ({ fish }: FishProps) => {
  return (
    <View style={style.row}>
      <Text variant="bodySmall" style={{ marginRight: 4 }}>
        {fish.sizeAtMaturity}{" "}
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
      <Text variant="bodySmall" style={{ marginRight: 4 }}>
        {plant.waterTemperature}
      </Text>
      <Icon source="circle" size={4} />
      <Text variant="bodySmall" style={{ marginHorizontal: 4 }}>
        {plant.sunlight}
      </Text>
      <Icon source="circle" size={4} />
      <Text variant="bodySmall" style={{ marginHorizontal: 4 }}>
        {plant.waterType}
      </Text>
    </View>
  );
};
export default function GridItem({ item, isFish }: GridProps) {
  const path = isFish ? "/fish-search/[id]" : "/plant-search/[id]";
  return (
    <Link
      href={{ pathname: path, params: { id: item.id } }}
      style={{ width: "100%" }}
    >
      <View style={[style.listItem]}>
        <Avatar.Image size={50} source={{ uri: item.img }} />
        <View style={{ marginLeft: 12, alignSelf: "center" }}>
          <Text variant="body" style={{ marginBottom: 4 }}>
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

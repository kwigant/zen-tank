import { style } from "@/constants/Global";
import { fish } from "@/constants/Types";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Avatar, Icon, Text } from "react-native-paper";

export type ListProps = { fish: fish };

export default function ListItem({ fish }: ListProps) {
  return (
    <Link href={{ pathname: "/fish-search/[id]", params: { id: fish.id } }}>
      <View style={[style.listItem]}>
        <Avatar.Image size={50} source={{ uri: fish.img }} />
        <View style={{ marginLeft: 12, alignSelf: "center" }}>
          <Text variant="body" style={{ marginBottom: 4 }}>
            {fish.name}
          </Text>
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
        </View>
      </View>
    </Link>
  );
}

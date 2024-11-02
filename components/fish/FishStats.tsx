import { fish } from "@/constants/Types";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

export type GridProps = { fish: fish };

export default function FishStats({ fish }: GridProps) {
  return (
    <View>
      <Text variant="body"> fish text here</Text>
    </View>
  );
}

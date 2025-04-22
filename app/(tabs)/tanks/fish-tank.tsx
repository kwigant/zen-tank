import React from "react";
import { View, Image, FlatList } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { getTank } from "@/api/tanks";
import { useQuery } from "react-query";
import { style } from "@/constants/Styles";
import { Avatar, Button, Text } from "react-native-paper";
import { getFishInTank } from "@/api/fish";
import { getPlantsInTank } from "@/api/plants";

export default function FishTankScreen() {
  // get context
  const { id } = useLocalSearchParams();
  const { data: tank, isLoading } = useQuery({
    queryFn: () => getTank(id as string),
    queryKey: "tankProfile",
  });

  const { data: tankFish } = useQuery({
    queryFn: () => getFishInTank(id as string),
    queryKey: "tankFish",
  });

  const { data: tankPlants } = useQuery({
    queryFn: () => getPlantsInTank(id as string),
    queryKey: "tankPlants",
  });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View style={{ backgroundColor: "#fff", paddingTop: 0, height: "100%" }}>
      <Image
        source={require("@/assets/images/full-tank.png")}
        resizeMode="cover"
        style={{ width: "100%", height: 250 }}
      />

      <View style={style.container}>
        <View style={style.justifiedRow}>
          <Text variant="headlineLarge" style={{ textAlign: "center" }}>
            {tank?.name}
          </Text>
        </View>
        <Text>{tank?.description}</Text>
        <Text>Size: {tank?.size} gallons</Text>
        <Text>Temp: {tank?.tank_temp}</Text>
        <Text>pH: {tank?.tank_pH}</Text>
        <Text>dGH: {tank?.tank_dgh}</Text>
        <Text>Fish</Text>
        <FlatList
          data={tankFish}
          horizontal
          style={{ marginBottom: 24 }}
          renderItem={({ item }) => {
            return (
              <Avatar.Image size={50} source={{ uri: item.img }}></Avatar.Image>
            );
          }}
          keyExtractor={(item) => item.id}
          ListFooterComponent={
            <Button
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/tanks/fish-search",
                  params: { tank_id: id },
                })
              }
              style={[style.iconBtn, { padding: 2, minWidth: null }]}
              textColor="black"
            >
              Add Fish
            </Button>
          }
        />
        <Text>Plants</Text>
         <FlatList
          data={tankPlants}
          horizontal
          style={{ marginBottom: 24 }}
          renderItem={({ item }) => {
            return (
              <Avatar.Image size={50} source={{ uri: item.img }}></Avatar.Image>
            );
          }}
          keyExtractor={(item) => item.id}
          ListFooterComponent={
            <Button
            onPress={() =>
              router.push({
                pathname: "/(tabs)/tanks/plant-search",
                params: { tank_id: id },
              })
            }
            style={[style.iconBtn, { padding: 2, minWidth: null }]}
            textColor="black"
          >
            Add Plants
          </Button>
          }
        />
      </View>
    </View>
  );
}

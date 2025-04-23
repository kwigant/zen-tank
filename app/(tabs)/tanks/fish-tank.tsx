import React, { useState } from "react";
import { View, Image, FlatList, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { getTank } from "@/api/tanks";
import { useQuery } from "react-query";
import { style } from "@/constants/Styles";
import { Avatar, Button, Text } from "react-native-paper";
import { getFishInTank } from "@/api/fish";
import { getPlantsInTank } from "@/api/plants";
import TankMenu from "@/components/tanks/TankMenu";
import EditTankModal from "@/components/tanks/EditTankModal";
import DeleteTankModal from "@/components/tanks/DeleteTankModal";

export default function FishTankScreen() {
  const [visible, setVisible] = useState(false);
  const hideModal = () => setVisible(false);
  const [delvisible, setDelVisible] = useState(false);
  const hideDModal = () => setDelVisible(false);

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
          <TankMenu
            onPress={() => setVisible(true)}
            onDeletePress={() => setDelVisible(true)}
          />
        </View>
        <Text>{tank?.description}</Text>
        <Text>Size: {tank?.size} gallons</Text>
        <Text>Fish</Text>
        <FlatList
          data={tankFish}
          horizontal
          style={{ marginBottom: 24 }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/tanks/fish-profile",
                    params: { id: item.fish_id, tank_name: tank?.name,tank_id: tank?.tank_id },
                  })
                }
              >
                <Avatar.Image
                  size={50}
                  source={{ uri: item.img }}
                ></Avatar.Image>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
          ListFooterComponent={
            <Button
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/tanks/fish-search",
                  params: { tank_id: id, tank_name: tank?.name },
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
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/tanks/plant-profile",
                    params: { id: item.plant_id },
                  })
                }
              >
                <Avatar.Image
                  size={50}
                  source={{ uri: item.img }}
                ></Avatar.Image>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
          ListFooterComponent={
            <Button
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/tanks/plant-search",
                  params: { tank_id: id, tank_name: tank?.name },
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
      {tank && (
        <EditTankModal
          visible={visible}
          hideModal={hideModal}
          tank={tank}
        ></EditTankModal>
      )}
      {tank && (
        <DeleteTankModal
          visible={delvisible}
          hideModal={hideDModal}
          tank={tank}
        ></DeleteTankModal>
      )}
    </View>
  );
}

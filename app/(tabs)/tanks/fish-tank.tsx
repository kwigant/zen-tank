import React, { useState } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { getTank } from "@/api/tanks";
import { useQuery } from "react-query";
import { style } from "@/constants/Styles";
import { Avatar, Button, Card, Text, useTheme } from "react-native-paper";
import { getFishInTank } from "@/api/fish";
import { getPlantsInTank } from "@/api/plants";
import TankMenu from "@/components/tanks/TankMenu";
import EditTankModal from "@/components/tanks/EditTankModal";
import DeleteTankModal from "@/components/tanks/DeleteTankModal";
import TankChips from "@/components/tanks/TankChips";
import Loading from "@/components/layouts/Loading";
import WaterPropsChart from "@/components/tanks/WaterPropsChart";
import TankAccordion from "@/components/tanks/TankAccordion";

export default function FishTankScreen() {
  const [visible, setVisible] = useState(false);
  const hideModal = () => setVisible(false);
  const [delvisible, setDelVisible] = useState(false);
  const hideDModal = () => setDelVisible(false);
  const theme = useTheme();

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

  if (isLoading) return <Loading />;

  return (
    <ScrollView
      style={{
        backgroundColor: theme.colors.background,
        paddingTop: 0,
        height: "100%",
      }}
    >
      <Image
        source={require("@/assets/images/full-tank.png")}
        resizeMode="cover"
        style={{ width: "100%", height: 250 }}
      />

      <View style={[style.container]}>
        <View style={style.justifiedRow}>
          <Text variant="headlineLarge" style={{ textAlign: "center" }}>
            {tank?.name}
          </Text>
          <TankMenu
            onPress={() => setVisible(true)}
            onDeletePress={() => setDelVisible(true)}
          />
        </View>
        {tank && (
          <View style={{display: 'flex', alignItems: 'center', marginVertical: 12}}>
            <TankChips
              size={tank.size}
              fish_count={tank.fish_count}
              plant_count={tank.plant_count}
            />
          </View>
        )}

        <Text style={{marginVertical: 24, textAlign: 'center'}}>{tank?.description}</Text>
       { tank && <TankAccordion {...tank}/>}

        <View style={style.justifiedRow}>
        <Text variant="headlineSmall">Fish</Text>
        <Button
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/tanks/fish-search",
                  params: {
                    tank_id: id,
                    tank_name: tank?.name,
                    fish_count: tankFish?.length,
                    plant_count: tankPlants?.length,
                  },
                })
              }
              style={[style.iconBtn, {padding: 0, minWidth: null }]}
              textColor="black"
            >
              Add Fish
            </Button>
        </View>
        <View style={{backgroundColor: theme.colors.background, padding: 12, marginVertical: 12,  borderRadius: 8, borderWidth: 2, borderColor: theme.colors.surfaceVariant}}>

        <FlatList
          data={tankFish}
          horizontal
          ListEmptyComponent={ <Text style={{textAlign: 'center'}}>No Fish in Tank</Text>}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
              style={{display: 'flex', alignItems: 'center'}}

                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/tanks/fish-profile",
                    params: {
                      id: item.fish_id,
                      tank_name: tank?.name,
                      tank_id: tank?.tank_id,
                      adding: "true",
                      fish_id: item.id,
                    },
                  })
                }
              >
                 <Avatar.Image
                  size={60}
                  source={{ uri: item.img }}
                ></Avatar.Image>
                <Text style={{width: 100, marginTop: 12,  textAlign: 'center'}}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
        </View>
        <View style={style.justifiedRow}>
          <Text variant="headlineSmall">Plants</Text>
          <Button
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/tanks/plant-search",
                    params: {
                      tank_id: id,
                      tank_name: tank?.name,
                      fish_count: tankFish?.length,
                      plant_count: tankPlants?.length,
                    },
                  })
                }
                style={[style.iconBtn, { padding: 0, minWidth: null }]}
                textColor="black"
              >
                Add Plants
              </Button>
        </View>
        <View style={{ marginVertical: 12, backgroundColor: theme.colors.background, padding: 12, borderRadius: 8, borderWidth: 2, borderColor: theme.colors.surfaceVariant}}>
          <FlatList
            data={tankPlants}
            horizontal
            ListEmptyComponent={<Text>No Plants in Tank</Text>}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                style={{display: 'flex', alignItems: 'center'}}
                  onPress={() =>
                    router.push({
                      pathname: "/(tabs)/tanks/plant-profile",
                      params: {
                        id: item.plant_id,
                        adding: "true",
                        plant_id: item.id,
                        tank_id: tank?.tank_id,
                        tank_name: tank?.name,
                      },
                    })
                  }
                >
                  <Avatar.Image
                    size={60}
                    source={{ uri: item.img }}
                  ></Avatar.Image>
                  <Text style={{width: 100, textAlign: 'center'}}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>

          <View style={style.justifiedRow}>
            <Text variant="headlineSmall">Water Conditions</Text>
                    <Button
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/tanks/fish-search",
                    params: {
                      tank_id: id,
                      tank_name: tank?.name,
                      fish_count: tankFish?.length,
                      plant_count: tankPlants?.length,
                    },
                  })
                }
                style={[style.iconBtn, {padding: 0, minWidth: null }]}
                textColor="black"
              >
                Update
              </Button>
          </View>
        <WaterPropsChart/>

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
    </ScrollView>
  );
}

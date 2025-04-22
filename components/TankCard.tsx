import { updateProfile } from "@/api/profile";
import { deleteTank, getTank } from "@/api/tanks";
import { style } from "@/constants/Styles";
import { tank, TankFish, TankPlants } from "@/constants/Types";
import { useContext, useEffect, useState } from "react";
import { View, Image, FlatList } from "react-native";
import {
  Avatar,
  Chip,
  Divider,
  IconButton,
  Menu,
  Text,
} from "react-native-paper";
import { router } from "expo-router";
import { useAuth } from "@/hooks/Auth";
import { useProfile } from "@/hooks/Profile";
import { getFishInTank, getPlantsInTank } from "@/api/fish";
import { theme } from "@/constants/Theme";

type tankCardProps = {
  id: string;
  tank: tank;
  fish: TankFish[];
  addToList: boolean;
};
export default function TankCard(props: tankCardProps) {
  // get context
  const ctx = useAuth();
  const profileCtx = useProfile();
  const { user } = useContext(ctx);
  const { profile, setProfile } = useContext(profileCtx);

  // state variables
  const [card, setCard] = useState(props.tank);
  const [allTanks, setAllTanks] = useState([] as tank[]);
  const [currentTank, setCurrentTank] = useState({} as tank);
  const [allPlantsInTank, setPlantsInTank] = useState([] as TankPlants[]);
  const [allFishInTank, setFishInTank] = useState([] as TankFish[]);
  const [waterTemp, setWaterTemp] = useState(0);

  // menu props
  const [mVisible, setMVisible] = useState(false);
  const openMenu = () => setMVisible(true);
  const closeMenu = () => setMVisible(false);
  // useEffect(() => {
  //   getFishInTank(props.id)
  //     .then((data) => {
  //       if (data) {
  //         setFishInTank(data);
  //       }
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  //   getPlantsInTank(props.id)
  //     .then((data) => {
  //       if (data) setPlantsInTank(data);
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  //   setCard(props.tank);
  // }, [allFishInTank, allPlantsInTank]);

  // get min and max of temp range from fish
  // function getWaterTemp() {
  //   let min: number[] = [], max: number[] = []
  //   allFishInTank.map(f => {
  //     min.push(parseInt(f.waterTemperature.split('-')[0]))
  //     max.push(parseInt(f.waterTemperature.split('-')[1]))
  //   })
  //   if (max.length > 0 && min.length > 0) card.tank_temp = `${Math.min(...min)} - ${Math.max(...max)}°F`
  //   else card.tank_temp = 'TBD'
  // }

  function menuNavigation(path: string) {
    if (path === "/fish-search" || path === "/plant-search")
      router.navigate(path);
    closeMenu();
  }

  if (card) {
    return (
      <View style={style.tankCard}>
        <Image
          style={{ width: 180, height: 100, alignSelf: "center" }}
          source={require("../assets/images/full-tank.png")}
        />

        <View style={[style.justifiedRow, { marginVertical: 24 }]}>
          <Text variant={"headlineLarge"}>{card.name}</Text>
          <Chip
            style={{ borderRadius: 24, backgroundColor: theme.colors.primary }}
          >
            {card.size} gal.
          </Chip>
        </View>

        <View style={style.justifiedRow}>
          <View style={style.row}>
            <Text variant="bodyMedium" style={{ fontWeight: "bold" }}>
              Temp:
            </Text>
            <Text variant="bodyMedium">
              {allFishInTank[0]?.waterTemperature}
            </Text>
          </View>
          <View style={style.row}>
            <Text variant="bodyMedium" style={{ fontWeight: "bold" }}>
              pH:
            </Text>
            <Text variant="bodyMedium"> {allFishInTank[0]?.pH}</Text>
          </View>

          <View style={style.row}>
            <Text variant="bodyMedium" style={{ fontWeight: "bold" }}>
              dGH:
            </Text>
            <Text variant="bodyMedium">{allFishInTank[0]?.hardness}</Text>
          </View>
        </View>
        <Text style={{ marginTop: 12, marginBottom: 12 }} variant="bodyLarge">
          {card.description}
        </Text>

        <Text style={{ marginTop: 12, marginBottom: 12 }} variant="bodyLarge">
          Fish in Tank:
        </Text>
        <FlatList
          data={allFishInTank}
          horizontal
          style={{ width: "100%" }}
          ListFooterComponent={() => {
            if (props.addToList) {
              return (
                <IconButton
                  icon="plus"
                  onPress={() => menuNavigation("/fish-search")}
                />
              );
            }
          }}
          renderItem={({ item }) => (
            <Avatar.Image
              key={item.id}
              style={{ marginHorizontal: 4 }}
              source={{ uri: item.img }}
            ></Avatar.Image>
          )}
        />
        <Text style={{ marginTop: 12, marginBottom: 12 }} variant="bodyLarge">
          Plants in Tank:
        </Text>
        <FlatList
          data={allPlantsInTank}
          horizontal
          ListFooterComponent={() => {
            if (props.addToList) {
              return (
                <IconButton
                  icon="plus"
                  onPress={() => menuNavigation("/plant-search")}
                />
              );
            }
          }}
          style={{ width: "100%" }}
          renderItem={({ item }) => (
            <Avatar.Image
              key={item.id}
              style={{ marginHorizontal: 4 }}
              source={{ uri: item.img }}
            ></Avatar.Image>
          )}
        />
      </View>
    );
  }
}

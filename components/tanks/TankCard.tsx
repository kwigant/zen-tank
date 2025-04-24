import { style } from "@/constants/Styles";
import { tank } from "@/constants/Types";
import { View, Image } from "react-native";
import { Card, Chip, Text } from "react-native-paper";
import { Link } from "expo-router";
import { theme } from "@/constants/Theme";
import TankChips from "./TankChips";

type tankCardProps = {
  tank: tank;
};
export default function TankCard(props: tankCardProps) {
  return (
    <Link
    style={{marginBottom: 24}}
      href={{
        pathname: "/(tabs)/tanks/fish-tank",
        params: { id: props.tank.tank_id },
      }}
    >
      <Card  style={{padding: 12, margin: 0, width: '100%'}}>
        <View style={style.row}>
          <Image
            style={{
              width: 80,
              height: 80,
              marginRight: 18,
            }}
            source={require("@/assets/images/full-tank.png")}
          />
          <View style={style.column}>
            <Text variant={"bodyMedium"} style={{ fontWeight: "bold" }}>
              {props.tank.name}
            </Text>
            <TankChips size={props.tank.size} fish_count={props.tank.fish_count} plant_count={props.tank.plant_count}/>
            <Text style={{ marginTop: 12, marginBottom: 12 }} variant="bodyLarge">
              {props.tank.description}
            </Text>
          </View>
        </View>
      </Card>
    </Link>
  );
}

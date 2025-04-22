import { style } from "@/constants/Styles";
import { tank } from "@/constants/Types";
import { View, Image } from "react-native";
import { Chip, Text } from "react-native-paper";
import { Link } from "expo-router";
import { theme } from "@/constants/Theme";

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
      <View style={style.tankCard}>
        <Image
          style={{
            width: 80,
            height: 80,
            alignSelf: "center",
            marginRight: 18,
          }}
          source={require("../assets/images/full-tank.png")}
        />
        <View style={style.column}>
          <Text variant={"bodyMedium"} style={{ fontWeight: "bold" }}>
            {props.tank.name}
          </Text>
          <View style={[style.row]}>
            <Chip
              style={{
                borderRadius: 24,
                backgroundColor: theme.colors.primary,
                marginRight: 4,
              }}
            >
              {props.tank.size} Gal.
            </Chip>
            <Chip
              style={{
                borderRadius: 24,
                backgroundColor: "orange",
                marginRight: 4,
              }}
            >
              4 Fish
            </Chip>
            <Chip style={{ borderRadius: 24, backgroundColor: "lightgreen" }}>
              7 Plants
            </Chip>
          </View>
          <Text style={{ marginTop: 12, marginBottom: 12 }} variant="bodyLarge">
            {props.tank.description}
          </Text>
        </View>
      </View>
    </Link>
  );
}

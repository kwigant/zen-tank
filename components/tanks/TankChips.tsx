import { Colors } from "@/constants/Colors";
import { style } from "@/constants/Styles";
import { theme } from "@/constants/Theme";
import { View } from "react-native";
import { Chip } from "react-native-paper";

export type TankChipProps = {
  size: number;
  fish_count: number;
  plant_count: number;
};

export default function TankChips({
  size,
  fish_count,
  plant_count,
}: TankChipProps) {
  return (
    <View style={[style.row]}>
      <Chip
        textStyle={{fontSize: 14}}
        style={{
          backgroundColor: Colors.light.primaryContainer,
          borderRadius: 24,
          marginRight: 16,
        }}
      >
        Size: {size} Gal.
      </Chip>
      <Chip
        textStyle={{fontSize: 14}}

        style={{
          borderRadius: 24,
          marginRight: 16,
        }}
      >
        Fish: {fish_count}
      </Chip>
      <Chip
        style={{
          backgroundColor: theme.colors.tertiaryContainer,
          borderRadius: 24,
        }}
        textStyle={{fontSize: 14}}

      >
        Plants: {plant_count}
      </Chip>
    </View>
  );
}

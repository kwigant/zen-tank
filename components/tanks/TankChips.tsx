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
        style={{
          borderRadius: 24,
          backgroundColor: theme.colors.primary,
          marginRight: 4,
        }}
      >
        {size} Gal.
      </Chip>
      <Chip
        style={{
          borderRadius: 24,
          backgroundColor: theme.colors.secondary,
          marginRight: 4,
        }}
      >
        {fish_count} Fish
      </Chip>
      <Chip
        style={{ borderRadius: 24, backgroundColor: theme.colors.tertiary }}
      >
        {plant_count} Plants
      </Chip>
    </View>
  );
}

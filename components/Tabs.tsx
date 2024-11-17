import { style } from "@/constants/Styles";
import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

interface TabProps {
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
}
export default function Tabs({ tab, setTab }: TabProps) {
  return (
    <View
      style={[
        style.row,
        { borderBottomWidth: 1, marginTop: 12, justifyContent: 'space-between',  borderBottomColor: "#D9D9D970" },
      ]}
    >
      <Button
        style={tab === 0 ? style.tabActive : style.tabInactive}
        onPress={() => setTab(0)}
      >
        <Text variant="bodyMedium">About</Text>
      </Button>
      <Button
        mode="text"
        style={tab === 1 ? style.tabActive : style.tabInactive}
        onPress={() => setTab(1)}
      >
        <Text variant="bodyMedium">Basic Care</Text>
      </Button>
      <Button
        style={tab === 2 ? style.tabActive : style.tabInactive}
        onPress={() => setTab(2)}
      >
        <Text variant="bodyMedium">Plant Stats</Text>
      </Button>
    </View>
  );
}

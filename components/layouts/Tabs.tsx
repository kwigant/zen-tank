import { style } from "@/constants/Styles";
import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

interface TabProps {
  tabs: string[];
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
}
export default function Tabs({
  tabs = ["About", "Basic Care", "Stats"],
  tab,
  setTab,
}: TabProps) {
  return (
    <View
      style={[
        style.row,
        { marginVertical: 12, justifyContent: "space-between" },
      ]}
    >
      {tabs.map((t, i) => {
        return (
          <Button
            key={i}
            style={tab === i ? style.tabActive : style.tabInactive}
            onPress={() => setTab(i)}
          >
            <Text
              style={
                tab === i ? { fontWeight: "bold" } : { fontWeight: "normal" }
              }
              variant="bodyMedium"
            >
              {t}
            </Text>
          </Button>
        );
      })}
    </View>
  );
}

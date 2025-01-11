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
        { marginVertical: 12, justifyContent: 'space-between', },
      ]}
    >
      <Button
        style={tab === 0 ? style.tabActive : style.tabInactive}
        onPress={() => setTab(0)}
      >
        <Text  style={tab === 0 ? {fontWeight: 'bold'} : {fontWeight: 'normal'}} variant="bodyMedium">About</Text>
      </Button>
      <Button
        mode="text"
        style={tab === 1 ? style.tabActive : style.tabInactive}
        onPress={() => setTab(1)}
      >
        <Text  style={tab === 1 ? {fontWeight: 'bold'} : {fontWeight: 'normal'}} variant="bodyMedium">Basic Care</Text>
      </Button>
      <Button
        style={tab === 2 ? style.tabActive : style.tabInactive}
        onPress={() => setTab(2)}
      >
        <Text  style={tab === 2 ? {fontWeight: 'bold'} : {fontWeight: 'normal'}} variant="bodyMedium">Plant Stats</Text>
      </Button>
    </View>
  );
}

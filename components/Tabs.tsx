import { style } from "@/constants/Styles";
import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

interface TabProps {
  tabs: string[],
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
}
export default function Tabs({tabs = ['About', 'Basic Care', 'Stats'], tab, setTab }: TabProps) {
  return (
    <View
      style={[
        style.row,
        { marginVertical: 12, justifyContent: 'space-between', },
      ]}
    >
      {tabs.map((t,i) => {
        return(<Button
        style={tab === i ? style.tabActive : style.tabInactive}
        onPress={() => setTab(i)}
      >
        <Text  style={tab === i ? {fontWeight: 'bold'} : {fontWeight: 'normal'}} variant="bodyMedium">{t}</Text>
      </Button>)})}
      {/* <Button
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
      </Button> */}
    </View>
  );
}

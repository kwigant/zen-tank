import * as React from "react";
import { View, Image, ScrollView } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { style } from "@/constants/Styles";
import { useLocalSearchParams } from "expo-router";
import Tabs from "@/components/layouts/Tabs";
import { useQuery } from "react-query";
import { fetchPlantById } from "@/api/plants";
import About from "@/components/plants/About";
import BasicCare from "@/components/plants/BasicCare";

export default function PlantProfileScreen({}) {
  const { id } = useLocalSearchParams();
  const [tab, setTab] = React.useState(0);
  const theme = useTheme()
  const { data: plant, isLoading } = useQuery({
    queryKey: "plantProfile",
    queryFn: () => fetchPlantById(id as string),
  });

  return (
    <View style={{ backgroundColor: theme.colors.background, paddingTop: 0, height: "100%" }}>
      <Image
        source={{ uri: plant?.img }}
        resizeMode="cover"
        style={{ width: "100%", height: 250 }}
      />
      <View style={style.container}>
        <View style={style.justifiedRow}>
          <Text variant="headlineLarge">{plant?.name}</Text>
          <Button
            style={[style.iconBtn, { padding: 2, minWidth: null }]}
            textColor="black"
          >
            Add Plant
          </Button>
        </View>
        <Tabs
          tabs={["About", "Basic Care", "Stats"]}
          setTab={setTab}
          tab={tab}
        />
      </View>
      <ScrollView>
        {tab === 0
          ? plant && <About plant={plant} />
          : tab === 1
          ? plant && <BasicCare plant={plant} />
          : null}
      </ScrollView>
    </View>
  );
}

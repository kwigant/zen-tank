import * as React from "react";
import { View, Image, ScrollView } from "react-native";
import { Button, Text } from "react-native-paper";
import { style } from "@/constants/Styles";
import { useLocalSearchParams } from "expo-router";
import { plant } from "@/constants/Types";
import { supabase } from "@/utils/supabase";
import Tabs from "@/components/Tabs";
import About from "@/components/plants/About";
import BasicCare from "@/components/plants/BasicCare";
import AddToTankModal, { AddToTankProps } from "@/components/AddToTankModal";

export default function PlantProfileScreen({}) {
  const { id } = useLocalSearchParams();
  const [tab, setTab] = React.useState(0);
  const [plant, setPlant] = React.useState({} as plant);
  // modal props
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  function getProps(): AddToTankProps {
    return {
      plant: plant,
      visible: visible,
      hideModal: hideModal,
    };
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("Plants") // Replace with your table name
        .select()
        .eq("id", id);

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setPlant(data[0] as plant);
      }
    };

    fetchData();
  }, []);
  if (plant) {
    return (
      <View style={{ backgroundColor: "#fff", paddingTop: 0, height: "100%" }}>
        <Image
          source={{ uri: plant.img }}
          resizeMode="cover"
          style={{ width: "100%", height: 250 }}
        />
        <View style={style.container}>
          <View style={style.justifiedRow}>
            <Text variant="headlineLarge">{plant.name}</Text>
            <Button
              onPress={() => showModal()}
              style={[style.iconBtn, { padding: 2, minWidth: null }]}
              textColor="black"
            >
              Add Plant
            </Button>
          </View>
          <Tabs setTab={setTab} tab={tab} />
        </View>
        <ScrollView>
          {tab === 0 ? (
            <About plant={plant} />
          ) : tab === 1 ? (
            <BasicCare plant={plant} />
          ) : null}
        </ScrollView>
        <AddToTankModal {...getProps()} />
      </View>
    );
  }
}

import * as React from "react";
import { ImageBackground, View, Image } from "react-native";
import { Button, Text, IconButton } from "react-native-paper";
import { style } from "@/constants/Styles";
import { Link, useLocalSearchParams } from "expo-router";
import { plant } from "@/constants/Types";
import { supabase } from "@/utils/supabase";
import Tabs from "@/components/Tabs";

export default function PlantProfileScreen({}) {
  const { id } = useLocalSearchParams();
  const [tab, setTab] = React.useState(0);
  const [plant, setPlant] = React.useState({} as plant);

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
            <Link href="/plant-search">
              <IconButton icon="arrow-left" iconColor="black" />
            </Link>
            <Text variant="headlineLarge" style={{ textAlign: "center", flexWrap: 'wrap', width: 190 }}>
              {plant.name}
            </Text>
            <IconButton icon="plus" iconColor={"black"} />
          </View>
          <Tabs setTab={setTab} tab={tab}/>
        </View>
      </View>
    );
  }
}

import * as React from "react";
import { ImageBackground, View, ScrollView } from "react-native";
import { Button, Text, IconButton } from "react-native-paper";
import { style } from "@/constants/Global";
import { Link, useLocalSearchParams } from "expo-router";
import BasicCare from "@/components/fish/BasicCare";
import AdditionalCare from "@/components/fish/AdditionalCare";
import FishStats from "@/components/fish/FishStats";
import { supabase } from "@/utils/supabase";
import { fish } from "@/constants/Types";

export default function FishProfileScreen({}) {
  const { id } = useLocalSearchParams();
  const [tab, setTab] = React.useState(0);
  const [fish, setFish] = React.useState({} as fish)

  React.useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('Fish') // Replace with your table name
        .select()
        .eq('id', id);

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setFish(data[0] as fish);
      }
    };

    fetchData();
  }, []);
  
  if (fish) {
    return (
      <View style={{ backgroundColor: "#fff", paddingTop: 0, height: "100%" }}>
        <ImageBackground
          source={{ uri: fish.img }}
          resizeMode="cover"
          style={{ width: "100%", height: 250 }}
        >
          <Link style={{ marginTop: 24 }} href="/fish-search">
            <IconButton icon="chevron-left" iconColor="black" />
          </Link>
        </ImageBackground>

        <View style={style.container}>
          <Text
            variant="headerLarge"
            style={{ textAlign: "center", marginBottom: 16 }}
          >
            {fish.name}
          </Text>
          <View
            style={[
              style.row,
              { borderBottomWidth: 1, borderBottomColor: "#D9D9D970" },
            ]}
          >
            <Button
              style={tab === 0 ? style.tabActive : style.tabInactive}
              onPress={() => setTab(0)}
            >
              <Text variant="body">About</Text>
            </Button>
            <Button
              mode="text"
              style={tab === 1 ? style.tabActive : style.tabInactive}
              onPress={() => setTab(1)}
            >
              <Text variant="body">Basic Care</Text>
            </Button>
            <Button
              style={tab === 2 ? style.tabActive : style.tabInactive}
              onPress={() => setTab(2)}
            >
              <Text variant="body">Fish Stats</Text>
            </Button>
          </View>
        </View>
        <ScrollView>
          {tab === 0 ? (
            <AdditionalCare fish={fish} />
          ) : tab === 1 ? (
            <BasicCare fish={fish} />
          ) : (
            <FishStats fish={fish} />
          )}
        </ScrollView>
      </View>
    );
  }
  return null;
}

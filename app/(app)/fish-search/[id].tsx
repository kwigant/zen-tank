import * as React from "react";
import { Image, View, ScrollView } from "react-native";
import { Text, IconButton, Button } from "react-native-paper";
import { style } from "@/constants/Styles";
import { useLocalSearchParams } from "expo-router";
import BasicCare from "@/components/fish/BasicCare";
import AdditionalCare from "@/components/fish/AdditionalCare";
import FishStats from "@/components/fish/FishStats";
import { supabase } from "@/utils/supabase";
import { fish, tank } from "@/constants/Types";
import Tabs from "@/components/Tabs";
import { useAuth } from "@/hooks/Auth";
import AddToTankModal, { AddToTankProps } from "@/components/AddToTankModal";
import { listTanks } from "@/api/tanks";

export default function FishProfileScreen({}) {
  const { id } = useLocalSearchParams();
  const ctx = useAuth();
  const { user } = React.useContext(ctx);
  const [tab, setTab] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [fish, setFish] = React.useState({} as fish);
  const [tanks, setTanks] = React.useState([] as tank[]);
  // modal props
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  React.useEffect(() => {
    const fetchFish = async () => {
      const { data, error } = await supabase
        .from("Fish") // Replace with your table name
        .select()
        .eq("id", id);
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setFish(data[0] as fish);
        setLoading(false);
      }
    };

    setLoading(true);
    fetchFish();
    if (user)
      listTanks(user?.id)
        .then((data) => {
          if (data) {
            setTanks(data);
          }
        })
        .catch((error) => {
          throw error;
        });
  }, []);

  function getProps(): AddToTankProps {
    return {
      fish: fish,
      visible: visible,
      hideModal: hideModal,
    };
  }

  if (loading) return <Text>Loading</Text>;
  if (!loading && !fish) return <Text>Error</Text>;
  return (
    <View style={{ backgroundColor: "#fff", paddingTop: 0, height: "100%" }}>
      <Image
        source={{ uri: fish.img }}
        resizeMode="cover"
        style={{ width: "100%", height: 250 }}
      />

      <View style={style.container}>
        <View style={style.justifiedRow}>
          <Text variant="headlineLarge" style={{ textAlign: "center" }}>
            {fish.name}
          </Text>

          <Button
              onPress={() => showModal()}
              style={[style.iconBtn, { padding: 2, minWidth: null }]}
              textColor="black"
            >
              Add Fish
          </Button>
        </View>
        <Tabs setTab={setTab} tab={tab} />
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
      <AddToTankModal {...getProps()} />
    </View>
  );
}

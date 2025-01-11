import * as React from "react";
import {
  Image,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Button, Text, IconButton, Portal, Modal } from "react-native-paper";
import { style } from "@/constants/Styles";
import { Link, useLocalSearchParams } from "expo-router";
import BasicCare from "@/components/fish/BasicCare";
import AdditionalCare from "@/components/fish/AdditionalCare";
import FishStats from "@/components/fish/FishStats";
import { supabase } from "@/utils/supabase";
import { fish, tank } from "@/constants/Types";
import Tabs from "@/components/Tabs";
import { Session } from "@supabase/supabase-js";
import { useAuth } from "@/hooks/Auth";
import { useProfile } from "@/hooks/Profile";
import AddToTankModal, { AddToTankProps } from "@/components/AddToTankModal";


export default function FishProfileScreen({}) {
  const { id } = useLocalSearchParams();
  const ctx = useAuth();
  const { user } = React.useContext(ctx);
  const pctx = useProfile();
  const { profile } = React.useContext(pctx);
  const [tab, setTab] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [fish, setFish] = React.useState({} as fish);
  const [session, setSession] = React.useState<Session | null>(null);
  const [currentTank, setCurrentTank] = React.useState({} as tank);
  const containerStyle = { backgroundColor: "white", margin: 24, padding: 20 };
  const [tanks, setTanks] = React.useState([] as tank[]);
  // modal props
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  React.useEffect(() => {
    const fetchFish = async () => {
     //("calling");
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
    listTanks()
      .then((data) => {
        if (data) {
          setTanks(data);
          //console.log(tanks);
        }
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  function getProps() : AddToTankProps {
    return {
      fish: fish,
      visible: visible,
      hideModal: hideModal
    }
  }

  async function listTanks() {
    //console.log("list tank");
    const { data, error } = await supabase
      .from("Tanks")
      .select()
      .eq("user_id", session?.user.id);
    if (error) throw error;
    if (data) return data;
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

          <IconButton
            onPress={() => showModal()}
            icon="plus"
            iconColor={"black"}
          />
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
      <AddToTankModal {...getProps()}/>
    </View>
  );
}

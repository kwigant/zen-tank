import * as React from "react";
import { Image, View, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { style } from "@/constants/Styles";
import { useLocalSearchParams } from "expo-router";
import Tabs from "@/components/Tabs";
import AddToTankModal, { AddToTankProps } from "@/components/tanks/AddToTankModal";
import { fetchFish } from "@/api/fish";
import { useQuery } from "react-query";
import AdditionalCare from "@/components/fish/AdditionalCare";
import BasicCare from "@/components/fish/BasicCare";
import FishStats from "@/components/fish/FishStats";

export default function FishProfileScreen({}) {
  const { id, tank_id, tank_name } = useLocalSearchParams();
  const [tab, setTab] = React.useState(0);
  // modal props
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [added, setAdded] = React.useState(false)
  const {data: fish, isLoading } = useQuery({
    queryFn: () => fetchFish(id as string),
    queryKey: 'fishProfile'
  })

  function getProps(): AddToTankProps {
    return {
      name: tank_name.toString(),
      tank: tank_id.toString(),
      fish: fish,
      visible: visible,
      hideModal: hideModal,
    };
  }

  if (isLoading) return <Text>Loading...</Text>

  return (
    <View style={{ backgroundColor: "#fff", paddingTop: 0, height: "100%" }}>
      <Image
        source={{ uri: fish?.img }}
        resizeMode="cover"
        style={{ width: "100%", height: 250 }}
      />

      <View style={style.container}>
        <View style={style.justifiedRow}>
          <Text variant="headlineLarge" style={{ textAlign: "center" }}>
            {fish?.name}
          </Text>

          <Button
              onPress={() => showModal()}
              style={[style.iconBtn, { padding: 2, minWidth: null }]}
              textColor="black"
            >
              {added ? <Text>Remove Fish</Text> : <Text>Add Fish</Text>}
          </Button>
        </View>
        <Tabs tabs={['About', 'Basic Care', 'Stats']} setTab={setTab} tab={tab} />
      </View>
      <ScrollView>
        {tab === 0 ? (
          fish && <AdditionalCare fish={fish} />
        ) : tab === 1 ? (
          fish && <BasicCare fish={fish} />
        ) : (
          fish && <FishStats fish={fish} />
        )}
      </ScrollView>
      <AddToTankModal {...getProps()} />
    </View>
  );
}

import * as React from "react";
import { View, Image, ScrollView } from "react-native";
import { Button, Text } from "react-native-paper";
import { style } from "@/constants/Styles";
import { useLocalSearchParams } from "expo-router";
import Tabs from "@/components/Tabs";
import { useQuery } from "react-query";
import { fetchPlantById } from "@/api/plants";
import About from "@/components/plants/About";
import BasicCare from "@/components/plants/BasicCare";
import AddToTankModal, { AddToTankProps } from "@/components/tanks/AddToTankModal";

export default function PlantProfileScreen({}) {
  const { id, tank_name, tank_id } = useLocalSearchParams();
  const [tab, setTab] = React.useState(0);
   // modal props
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
  
 const { data: plant, isLoading } = useQuery({
     queryKey: "plantProfile", 
     queryFn: ()=> fetchPlantById(id as string), 
   });

  function getProps(): AddToTankProps {
      return {
        name: tank_name.toString(),
        tank: tank_id.toString(),
        plant: plant,
        visible: visible,
        hideModal: hideModal,
      };
    }

    if (isLoading) return <Text>Loading...</Text>
    return (
      <View style={{ backgroundColor: "#fff", paddingTop: 0, height: "100%" }}>
        <Image
          source={{ uri: plant?.img }}
          resizeMode="cover"
          style={{ width: "100%", height: 250 }}
        />
        <View style={style.container}>
          <View style={style.justifiedRow}>
            <Text variant="headlineLarge">{plant?.name}</Text>
            <Button
              onPress={() => showModal()}
              style={[style.iconBtn, { padding: 2, minWidth: null }]}
              textColor="black"
            >
              Add Plant
            </Button>
          </View>
          <Tabs tabs={['About', 'Basic Care', 'Stats']} setTab={setTab} tab={tab} />
        </View>
        <ScrollView>
          {tab === 0 ? (
            plant && <About plant={plant} />
          ) : tab === 1 ? (
            plant && <BasicCare plant={plant} />
          ) : null}
        </ScrollView>
        <AddToTankModal {...getProps()} />
        
      </View>
    );
}

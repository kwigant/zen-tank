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
import AddToTankModal, {
  AddToTankProps,
} from "@/components/tanks/AddToTankModal";
import RemoveFromTankModal from "@/components/tanks/RemoveFromTankModal";
import Loading from "@/components/layouts/Loading";

export default function PlantProfileScreen({}) {
  const { id, tank_id, tank_name, fish_count, plant_count, adding, plant_id } =
    useLocalSearchParams();
  const [tab, setTab] = React.useState(0);
  const theme = useTheme();
  // modal props
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [added, setAdd] = React.useState(false);

  const { data: plant, isLoading } = useQuery({
    queryKey: "plantProfile",
    queryFn: () => fetchPlantById(id as string),
  });

  function getProps(): AddToTankProps {
    const props: AddToTankProps = {
      fish_count: parseInt(fish_count ? fish_count.toString() : "0"),
      plant_count: parseInt(plant_count ? plant_count.toString() : "0"),
      name: tank_name ? tank_name.toString() : "",
      tank: tank_id ? tank_id.toString() : "",
      plant: plant,
      visible: visible,
      fish_id: null,
      plant_id: plant_id ? plant_id.toString() : null,
      hideModal: hideModal,
    };
    return props;
  }
  if (isLoading) return <Loading/>;
  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        paddingTop: 0,
        height: "100%",
      }}
    >
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
            {adding && plant_id ? (
              <Text>Remove Plant</Text>
            ) : (
              <Text>Add Plant</Text>
            )}
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
      {adding && plant_id ? (
        <RemoveFromTankModal {...getProps()} />
      ) : (
        <AddToTankModal {...getProps()} />
      )}
    </View>
  );
}

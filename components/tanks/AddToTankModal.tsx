import {
  addFish,
  addPlant,
  listTanks,
  updateFishInTank,
  updatePlantsInTank,
} from "@/api/tanks";
import { style } from "@/constants/Styles";
import { fish, plant } from "@/constants/Types";
import { useAuth } from "@/hooks/Auth";
import { router, useNavigation } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button, Modal, Portal, Text, TextInput } from "react-native-paper";
import { useQuery, useQueryClient } from "react-query";
import { Dropdown, Option } from "react-native-paper-dropdown";
import { useNavigationState } from "@react-navigation/native";

export type AddToTankProps = {
  fish_count: number;
  plant_count: number;
  name: string;
  tank: string;
  fish?: fish;
  plant?: plant;
  visible: boolean;
  fish_id: string | null;
  plant_id: string | null;
  hideModal: () => void;
};

export default function AddToTankModal(props: AddToTankProps) {
  const containerStyle = { backgroundColor: "white", margin: 24, padding: 20 };
  const ctx = useAuth();
  const navigation = useNavigation();

  const [selectedTank, setSelectedTank] = React.useState<string>('')


  const { user } = React.useContext(ctx);
  if (user) {
    const { data: allTanks, isLoading } = useQuery({
      queryKey: "tankList",
      queryFn: () => listTanks(user.id),
    });
    let options = new Array<Option>();
    allTanks?.map((t) => options.push({ label: t.name, value: t.tank_id }));
    const queryClient = useQueryClient();
    function addToTank() {
      if (user) {
        if (props.tank) {
          if (props.fish) {
            addFish(props.tank, user, props.fish)
              .then(() => updateFishInTank(props.tank, props.fish_count + 1))
              .finally(() => {
                queryClient.invalidateQueries("tankFish");
                queryClient.invalidateQueries("tankList");
                queryClient.invalidateQueries("tankProfile");
              });
          } else if (props.plant)
            addPlant(props.tank, user, props.plant)
              .then(() => updatePlantsInTank(props.tank, props.plant_count + 1))
              .finally(() => {
                queryClient.invalidateQueries("tankPlants");
                queryClient.invalidateQueries("tankList");
                queryClient.invalidateQueries("tankProfile");
              });
        }
        else {
          if (props.fish) {
            addFish(selectedTank, user, props.fish)
              .then(() => updateFishInTank(props.tank, props.fish_count + 1))
              .finally(() => {
                queryClient.invalidateQueries("tankFish");
                queryClient.invalidateQueries("tankList");
                queryClient.invalidateQueries("tankProfile");
              });
          } else if (props.plant)
            addPlant(props.tank, user, props.plant)
              .then(() => updatePlantsInTank(props.tank, props.plant_count + 1))
              .finally(() => {
                queryClient.invalidateQueries("tankPlants");
                queryClient.invalidateQueries("tankList");
                queryClient.invalidateQueries("tankProfile");
              });
        }
        props.hideModal();
        
          navigation.popTo("fish-tank")
        
      }
    }

    return (
      <Portal>
        <Modal
          visible={props.visible}
          onDismiss={props.hideModal}
          contentContainerStyle={containerStyle}
        >
          <View>
            {props.name != "" && allTanks ? (
              <Text>
                Add {props.fish?.name || props.plant?.name} to {props.name} tank
              </Text>
            ) : (
              <View>
                <Text>
                  Where would you like to add{" "}
                  {props.fish?.name || props.plant?.name}?
                </Text>
                <Dropdown
                  label="Pick a Tank"
                  placeholder="Pick a Tank"
                  options={options}
                  value={selectedTank}
                  onSelect={(s) => { if (s) setSelectedTank(s)}}
                />
              </View>
            )}

            <View style={style.row}>
              <Button mode="text" onPress={props.hideModal}>
                Cancel
              </Button>
              <Button onPress={() => addToTank()} mode="contained">
                Add
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    );
  }
}

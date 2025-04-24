import {
  addFish,
  addPlant,
  deleteFishInTank,
  updateFishInTank,
  updatePlantsInTank,
} from "@/api/tanks";
import { style } from "@/constants/Styles";
import { fish, plant, tank } from "@/constants/Types";
import { useAuth } from "@/hooks/Auth";
import React, { Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";
import { useQueryClient } from "react-query";

export type AddToTankProps = {
  setAdded: Dispatch<SetStateAction<boolean>>;
  fish_count: number;
  plant_count: number;
  name: string;
  tank: string;
  fish?: fish;
  plant?: plant;
  visible: boolean;
  hideModal: () => void;
};

export default function AddToTankModal(props: AddToTankProps) {
  const containerStyle = { backgroundColor: "white", margin: 24, padding: 20 };
  const ctx = useAuth();
  const { user } = React.useContext(ctx);
  const queryClient = useQueryClient();
  function addToTank() {
    if (props.tank && user) {
      if (props.fish) {
        addFish(props.tank, user, props.fish)
          .then(() => updateFishInTank(props.tank, props.fish_count + 1))
          .finally(() => {
            queryClient.invalidateQueries("tankFish");
            queryClient.invalidateQueries("tankList");
            queryClient.invalidateQueries("tankProfile");
          });
      } else if (props.plant)
        addPlant(props.tank, user, props.plant) .then(() => updatePlantsInTank(props.tank, props.plant_count + 1))
        .finally(() => {
          queryClient.invalidateQueries("tankPlants");
          queryClient.invalidateQueries("tankList");
          queryClient.invalidateQueries("tankProfile");
        });
      props.setAdded(true)
      props.hideModal();
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
          <Text>
            Add {props.fish?.name || props.plant?.name} to {props.name} tank
          </Text>

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

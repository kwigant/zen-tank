import {
  deleteFishInTank,
  deletePlantInTank,
  updateFishInTank,
  updatePlantsInTank,
} from "@/api/tanks";
import { style } from "@/constants/Styles";
import { useAuth } from "@/hooks/Auth";
import React from "react";
import { View } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";
import { useQueryClient } from "react-query";
import { AddToTankProps } from "./AddToTankModal";
import { useNavigation } from "expo-router";

export default function RemoveFromTankModal(props: AddToTankProps) {
  const containerStyle = { backgroundColor: "white", margin: 24, padding: 20 };
  const ctx = useAuth();

  const { user } = React.useContext(ctx);
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  function removeFromTank() {
    if (props.tank && user) {
      if (props.fish_id) {
        deleteFishInTank(props.fish_id)
          .then(() => updateFishInTank(props.tank, props.fish_count - 1))
          .finally(() => {
            queryClient.invalidateQueries("tankFish");
            queryClient.invalidateQueries("tankList");
            queryClient.invalidateQueries("tankProfile");
          });
      } else if (props.plant && props.plant_id) {
        deletePlantInTank(props.plant_id)
          .then(() => updatePlantsInTank(props.tank, props.plant_count - 1))
          .finally(() => {
            queryClient.invalidateQueries("tankList");
            queryClient.invalidateQueries("tankProfile");
            queryClient.invalidateQueries("tankPlants");
          });
      }

      props.hideModal();
      navigation.popTo("fish-tank");
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
            Remove {props.fish?.name || props.plant?.name} from {props.name}{" "}
            tank
          </Text>

          <View style={style.row}>
            <Button mode="text" onPress={props.hideModal}>
              Cancel
            </Button>
            <Button onPress={() => removeFromTank()} mode="contained">
              Remove
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

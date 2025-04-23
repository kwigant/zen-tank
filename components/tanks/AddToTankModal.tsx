import { addFish, addPlant, deleteFishInTank } from "@/api/tanks";
import { style } from "@/constants/Styles";
import { fish, plant } from "@/constants/Types";
import { useAuth } from "@/hooks/Auth";
import React from "react";
import { View } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";
import {  useQueryClient } from "react-query";

export type AddToTankProps = {
  add: boolean;
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
  const queryClient = useQueryClient()
 
  function addToTank() {
    if (props.tank && user) {
      if (props.fish) {
        addFish(props.tank, user, props.fish).then(()=> queryClient.invalidateQueries('tankFish'));
      }
      else if (props.plant) addPlant(props.tank, user, props.plant).then(()=> queryClient.invalidateQueries('tankPlants'));

      props.hideModal();
    }
  }

  function removeFromTank() {
    if (props.tank && user) {
      if (props.fish) {
        deleteFishInTank(props.fish.id).then(()=> queryClient.invalidateQueries('tankFish'));
      }
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
            <Button onPress={() => props.add ? addToTank() : removeFromTank()} mode="contained">
             { props.add ? 'Add': 'Remove'}
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

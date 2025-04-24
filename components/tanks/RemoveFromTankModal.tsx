import {
    deleteFishInTank,
    deletePlantInTank,
    updateFishInTank,
    updatePlantsInTank,
  } from "@/api/tanks";
  import { style } from "@/constants/Styles";
  import { fish, plant } from "@/constants/Types";
  import { useAuth } from "@/hooks/Auth";
  import React, { Dispatch, SetStateAction } from "react";
  import { View } from "react-native";
  import { Button, Modal, Portal, Text } from "react-native-paper";
  import { useQueryClient } from "react-query";
  
  export type RemoveFromTankProps = {
    setAdded: Dispatch<SetStateAction<boolean>>;
    fish_count: number;
    plant_count: number;
    fish_tank_id: string;
    name: string;
    tank: string;
    fish?: fish;
    plant?: plant;
    visible: boolean;
    hideModal: () => void;
  };
  
  export default function RemoveFromTankModal(props: RemoveFromTankProps) {
    const containerStyle = { backgroundColor: "white", margin: 24, padding: 20 };
    const ctx = useAuth();
    const { user } = React.useContext(ctx);
    const queryClient = useQueryClient();
    
  
    function removeFromTank() {
      if (props.tank && user) {
        if (props.fish) {
          deleteFishInTank(props.fish.id).then(() => updateFishInTank(props.tank, props.fish_count - 1))
          .finally(() => {
            queryClient.invalidateQueries("tankFish");
            queryClient.invalidateQueries("tankList");
            queryClient.invalidateQueries("tankProfile");
          });
        }
        else if (props.plant) {
            deletePlantInTank(props.plant.id).then(() => updatePlantsInTank(props.tank, props.plant_count - 1))
            .finally(() => {
              queryClient.invalidateQueries("tankFish");
              queryClient.invalidateQueries("tankList");
              queryClient.invalidateQueries("tankProfile");
            });
          }
        
        props.setAdded(false)
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
              Remove {props.fish?.name || props.plant?.name} from {props.name} tank
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
  
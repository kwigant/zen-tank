import { style } from "@/constants/Styles";
import { fish, plant, } from "@/constants/Types";
import { useAuth } from "@/hooks/Auth";
import { useProfile } from "@/hooks/Profile";
import { supabase } from "@/utils/supabase";
import React from "react";
import { View } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";

export type AddToTankProps = {
  fish?: fish;
  plant?: plant;
  visible: boolean;
  hideModal: () => void;
};

export default function AddToTankModal(props: AddToTankProps) {
  const containerStyle = { backgroundColor: "white", margin: 24, padding: 20 };
  const pctx = useProfile();
  const ctx = useAuth();
  const { user } = React.useContext(ctx);
  const { profile } = React.useContext(pctx);

  async function addFish(tank_id: string) {
    try {
      if (user && props.fish) {
        const { error } = await supabase
          .from("TankFish")
          .upsert({
            fish_id: props.fish.id,
            name: props.fish.name,
            user_id: user.id,
            img: props.fish.img,
            sizeAtMaturity: props.fish.sizeAtMaturity,
            waterTemperature: props.fish.waterTemperature,
            tankSize: props.fish.tankSize,
            temperament: props.fish.temperament,
            tank_id: tank_id,
            email: user.email,
          })
          .select();
        if (error) {
          throw error;
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }

  async function addPlant(tank_id: string) {
    try {
      if (user && props.plant) {
        const { error } = await supabase
          .from("TankPlants")
          .upsert({
            plant_id: props.plant.id,
            name: props.plant.name,
            user_id: user.id,
            tank_id: tank_id,
            email: user.email,
            img: props.plant.img,
            ph: props.plant.ph,
            temperature: props.plant.ph
          })
          .select();
        if (error) {
          throw error;
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }

  function addToTank() {
    if (profile) {
      if (props.fish) addFish(profile.current_tank_id);
      else if (props.plant) addPlant(profile.current_tank_id)
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
        {profile && (
          <View>
            <Text>
              Add {props.fish?.name || props.plant?.name} to
              {profile.current_tank_name}?
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
        )}
      </Modal>
    </Portal>
  );
}

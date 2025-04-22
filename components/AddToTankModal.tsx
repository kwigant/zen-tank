import { updateProfile } from "@/api/profile";
import { addFish, addPlant } from "@/api/tanks";
import { style } from "@/constants/Styles";
import { fish, plant, profile } from "@/constants/Types";
import { useAuth } from "@/hooks/Auth";
import { useProfile } from "@/hooks/Profile";
import { User } from "@supabase/supabase-js";
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
  const { profile, setProfile } = React.useContext(pctx);
 
 function updateCurrentProfile(profile: profile, user: User) {
    updateProfile({
      tanks: profile.tanks,
      current_tank_id: profile.current_tank_id,
      current_tank_name: profile.current_tank_name,
      current_tank_size: profile.current_tank_size,
      current_tank_description: profile.current_tank_description,
      current_tank_dgh: props.fish?.hardness || props.plant?.hardness || '',
      current_tank_temp: props.fish?.waterTemperature || props.plant?.temperature || '',
      current_tank_ph: props.fish?.pH || props.plant?.ph || '',
      user_id: user.id,
    }).then((data) => {
      if (data) setProfile(data[0]);
    }).catch((error) => console.error(error));
 }
  
  function addToTank() {
    if (profile && user) {

      if (props.fish) 
        addFish(profile.current_tank_id, user, props.fish).then(()=> updateCurrentProfile(profile, user));
      else if (props.plant)
        addPlant(profile.current_tank_id, user, props.plant).then(()=> updateCurrentProfile(profile, user));;
    
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

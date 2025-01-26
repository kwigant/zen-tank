import { style } from "@/constants/Styles";
import { useProfile } from "@/hooks/Profile";
import React from "react";
import { View } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";

export type DeleteTankProps = {
  visible: boolean;
  hideModal: () => void;
  delete: () => void;
};

export default function DeleteTankModal(props: DeleteTankProps) {
  const containerStyle = { backgroundColor: "white", margin: 24, padding: 20 };
  const pctx = useProfile();
  const { profile } = React.useContext(pctx);

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
              Are you sure you want to delete tank 
              {profile.current_tank_name}?
            </Text>

            <View style={style.row}>
              <Button mode="text" onPress={props.hideModal}>
                Cancel
              </Button>
              <Button onPress={props.delete} mode="contained">
                Delete
              </Button>
            </View>
          </View>
        )}
      </Modal>
    </Portal>
  );
}

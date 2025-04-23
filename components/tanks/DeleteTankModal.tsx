import { deleteTank } from "@/api/tanks";
import { style } from "@/constants/Styles";
import { tank } from "@/constants/Types";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";
import { useQueryClient } from "react-query";

export type DeleteTankProps = {
  visible: boolean;
  hideModal: () => void;
  tank: tank;
};

export default function DeleteTankModal(props: DeleteTankProps) {
  const containerStyle = { backgroundColor: "white", margin: 24, padding: 20 };
  const queryClient = useQueryClient();

  return (
    <Portal>
      <Modal
        visible={props.visible}
        onDismiss={props.hideModal}
        contentContainerStyle={containerStyle}
      >
        <View>
          <Text>
            Are you sure you want to delete tank
            {props.tank.name}?
          </Text>

          <View style={style.row}>
            <Button mode="text" onPress={props.hideModal}>
              Cancel
            </Button>
            <Button
              onPress={async () => {
                try {
                  await deleteTank(props.tank.tank_id).then(() =>
                    queryClient.invalidateQueries("tankList")
                  );
                  props.hideModal();
                  router.back();
                } catch (error) {
                  alert(error);
                }
              }}
              mode="contained"
            >
              Delete
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

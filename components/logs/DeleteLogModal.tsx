import { deleteLog } from "@/api/logs";
import { deleteTask } from "@/api/tasks";
import { style } from "@/constants/Styles";
import { Logs, Tasks } from "@/constants/Types";
import React from "react";
import { View } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";
import { useQueryClient } from "react-query";

export type DeleteLogProps = {
  visible: boolean;
  hideModal: () => void;
  log: Logs;
};

export default function DeleteLogModal(props: DeleteLogProps) {
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
            Are you sure you want to delete log
            {props.log.title}?
          </Text>

          <View style={style.row}>
            <Button mode="text" onPress={props.hideModal}>
              Cancel
            </Button>
            <Button
              onPress={async () => {
                try {
                  console.log(props.log.log_id)
                  await deleteLog(props.log.log_id).then(() =>
                    queryClient.invalidateQueries("logList")
                  );
                  props.hideModal();
                } catch (error) {
                  console.log(error);
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

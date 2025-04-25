import { deleteTask } from "@/api/tasks";
import { style } from "@/constants/Styles";
import { Tasks } from "@/constants/Types";
import React from "react";
import { View } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";
import { useQueryClient } from "react-query";

export type DeleteTaskProps = {
  visible: boolean;
  hideModal: () => void;
  task: Tasks;
};

export default function DeleteTaskModal(props: DeleteTaskProps) {
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
            Are you sure you want to delete task
            {props.task.name}?
          </Text>

          <View style={style.row}>
            <Button mode="text" onPress={props.hideModal}>
              Cancel
            </Button>
            <Button
              onPress={async () => {
                try {
                  await deleteTask(props.task.task_id).then(() =>
                    queryClient.invalidateQueries("taskList")
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

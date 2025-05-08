import { editLog } from "@/api/logs";
import { style } from "@/constants/Styles";
import { Logs } from "@/constants/Types";
import { useState } from "react";
import {
  Button,
  Card,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { useQueryClient } from "react-query";

type EditLogProps = {
  visible: boolean;
  hideModal: () => void;
  log: Logs;
};

export default function EditLogModal(props: EditLogProps) {
  const [name, setName] = useState(props.log.title ? props.log.title : "");
  const [description, setDescription] = useState(
    props.log.description ? props.log.description : ""
  );
  const queryClient = useQueryClient();

  function noChanges() {
    if (props.log.title !== name) return false;
    if (props.log.description !== description) return false;
    return true;
  }

  function resetStates() {
    setDescription("");
    setName("");
  }

  return (
    <Portal>
      <Modal visible={props.visible} onDismiss={() => props.hideModal()}>
        <Card style={{ margin: 24, padding: 24 }}>
          <Text>Edit {props.log.title}</Text>
          <TextInput
            label={"Name"}
            value={name}
            onChangeText={(e) => setName(e)}
          ></TextInput>

          <TextInput
            label={"Description"}
            value={description}
            onChangeText={(e) => setDescription(e)}
          ></TextInput>

          <Button
            style={[style.iconBtn, { padding: 2, minWidth: null }]}
            textColor="black"
            disabled={noChanges()}
            onPress={async () => {
              const updatedLog = {
                ...props.log,
                title: name,
                description: description,
              };
              try {
                const error = await editLog(props.log.log_id, updatedLog).then(
                  () => {
                    queryClient.invalidateQueries("logList");
                  }
                );
                resetStates();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <Text>Save</Text>
          </Button>
        </Card>
      </Modal>
    </Portal>
  );
}

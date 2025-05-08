import { listTanks } from "@/api/tanks";
import { style } from "@/constants/Styles";
import { Logs, Tasks } from "@/constants/Types";
import { useContext, useState } from "react";
import {
  Button,
  Card,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { useQuery, useQueryClient } from "react-query";
import uuid from "react-native-uuid";
import { useAuth } from "@/hooks/Auth";
import { createTask } from "@/api/tasks";
import { Dropdown, Option } from "react-native-paper-dropdown";
import { createLog } from "@/api/logs";

type NewLogProps = {
  visible: boolean;
  hideModal: () => void;
  tank_id: string;
};

export default function NewLogModal(props: NewLogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();
  const ctx = useAuth();
  const { user } = useContext(ctx);

  function checkInputs() {
    if (name.length < 3) return true;
    if (description.length < 3) return true;
    return false;
  }

  function resetStates() {
    setDescription("");
    setName("");
  }

  if (user) {


    return (
      <Portal>
        <Modal visible={props.visible} onDismiss={props.hideModal}>
          <Card style={{ margin: 24, padding: 24 }}>
            <Text variant="headlineMedium">Create a New Log</Text>
            <TextInput
              label={"Name"}
              value={name}
              mode="outlined"
              onChangeText={(e) => setName(e)}
            ></TextInput>

            <TextInput
              label={"Description"}
              mode="outlined"
              value={description}
              onChangeText={(e) => setDescription(e)}
            ></TextInput>
            
            <Button
              style={[style.iconBtn, { padding: 2, color: 'white' }]}
              textColor="black"
              disabled={checkInputs()}
              onPress={async () => {
               
                  const updatedLog: Logs = {
                    log_id: uuid.v4().toString(),
                    tank_id: props.tank_id,
                    title: name, 
                    description: description,
                    user_id: user.id, 
                    email: user.email || '', 
                    date_added: new Date().toLocaleDateString()
                  };
                  console.log(props.tank_id)
                  try {
                    await createLog(updatedLog).then(() =>
                      queryClient.invalidateQueries("logList")
                    );
                    resetStates();
                    props.hideModal();
                  } catch (error) {
                    console.log(error);
                  }
                
              }}
            >
              Save
            </Button>
          </Card>
        </Modal>
      </Portal>
    );
  }
}

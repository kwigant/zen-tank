import { editTank } from "@/api/tanks";
import { editTask } from "@/api/tasks";
import { style } from "@/constants/Styles";
import { tank, Tasks } from "@/constants/Types";
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

type EditTaskProps = {
  visible: boolean;
  hideModal: () => void;
  task: Tasks;
};

export default function EditTaskModal(props: EditTaskProps) {
  const [name, setName] = useState(props.task.name ? props.task.name : '');
  const [description, setDescription] = useState(props.task.description ? props.task.description : '');
  const queryClient = useQueryClient();

  function noChanges() {
    if (props.task.name !== name) return false;
    if (props.task.description !== description) return false;
    return true;
  }

  function resetStates() {
    setDescription('')
    setName('')
  }

  return (
    <Portal>
      <Modal visible={props.visible} onDismiss={()=>props.hideModal()}>
        <Card style={{ margin: 24, padding: 24 }}>
          <Text>Edit {props.task.name}</Text>
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
              const updatedTask = {
                ...props.task,
                name: name,
                description: description,
              };
              try {
                const error = await editTask(props.task.task_id, updatedTask).then(() =>{
                  queryClient.invalidateQueries("taskList")
                }
                );
                resetStates()
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

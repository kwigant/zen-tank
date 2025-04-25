import { listTanks } from "@/api/tanks";
import { style } from "@/constants/Styles";
import { Tasks } from "@/constants/Types";
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

type NewTaskProps = {
  visible: boolean;
  hideModal: () => void;
};

export default function NewTaskModal(props: NewTaskProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();
  const ctx = useAuth();
  const { user } = useContext(ctx);
  const [selectedTank, setSelectedTank] = useState<string>("");

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
    const { data: allTanks, isLoading } = useQuery({
      queryKey: "tankList",
      queryFn: () => listTanks(user.id),
    });
    let options = new Array<Option>();
    allTanks?.map((t) => options.push({ label: t.name, value: t.tank_id }));

    return (
      <Portal>
        <Modal visible={props.visible} onDismiss={props.hideModal}>
          <Card style={{ margin: 24, padding: 24 }}>
            <Text>Make a New Task</Text>
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
            <Dropdown
              label="Pick a Tank"
              placeholder="Pick a Tank"
              options={options}
              value={selectedTank}
              onSelect={(s) => {
                if (s) {setSelectedTank(s)};
              }}
            />
            <Button
              style={[style.iconBtn, { padding: 2, minWidth: null }]}
              textColor="black"
              disabled={checkInputs()}
              onPress={async () => {
                if (user) {
                  const updatedTask: Tasks = {
                    task_id: uuid.v4().toString(),
                    name: name,
                    tank_id: selectedTank,

                    user_id: user.id,
                    description: description,
                    checked: false,
                    email: user.email || "",
                  };
                  try {
                    await createTask(updatedTask).then(() =>
                      queryClient.invalidateQueries("taskList")
                    );
                    resetStates();
                    props.hideModal();
                  } catch (error) {
                    console.log(error);
                  }
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

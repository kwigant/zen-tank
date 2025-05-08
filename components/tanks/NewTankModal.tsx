import { createTank, editTank } from "@/api/tanks";
import { style } from "@/constants/Styles";
import { tank } from "@/constants/Types";
import { useContext, useState } from "react";
import {
  Button,
  Card,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { useQueryClient } from "react-query";
import uuid from "react-native-uuid";
import { useAuth } from "@/hooks/Auth";
import { Dropdown, Option } from "react-native-paper-dropdown";

type NewTankProps = {
  visible: boolean;
  hideModal: () => void;
};

export default function NewTankModal(props: NewTankProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [temp, setTemp] = useState("");
  const [selectedSub, setSelectedSub] = useState('')
  const substrates: Option[] = [{label: 'Sand', value: 'sand'}, {label: 'Aqua Soil', value: 'aqua-soil'}, {label: 'Gravel', value: 'gravel'}, {label: 'None', value: 'none'}]
  const queryClient = useQueryClient();
  const ctx = useAuth();
  const { user } = useContext(ctx);

  function checkInputs() {
    if (name.length < 3) return true;
    if (description.length < 3) return true;
    if (size === '') return true;
    return false;
  }

  function resetStates() {
    setSize('')
    setDescription('')
    setName('')
  }

  return (
    <Portal>
      <Modal visible={props.visible} onDismiss={props.hideModal}>
        <Card style={{ margin: 24, padding: 24 }}>
          <Text>Make a New Tank</Text>
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
          <TextInput
            inputMode="numeric"
            label={"Size (Gallons)"}
            value={size}
            onChangeText={(e) => setSize(e)}
          ></TextInput>
           <TextInput
            inputMode="numeric"
            label={"Temperature"}
            value={temp}
            onChangeText={(e) => setTemp(e)}></TextInput>
            <Dropdown
              label="Pick a Substrate"
              placeholder="Pick a Substrate"
              options={substrates}
              value={selectedSub}
              onSelect={(s) => {
                if (s) {setSelectedSub(s)};
              }}
            />
         
          <Button
            style={[style.iconBtn, { padding: 2, minWidth: null }]}
            textColor="black"
            disabled={checkInputs()}
            onPress={async () => {
              if (user) {
                const updatedTank: tank = {
                  tank_id: uuid.v4().toString(),
                  name: name,
                  user_id: user.id,
                  description: description,
                  size: parseInt(size),
                  email: user.email,
                  plant_count: 0,
                  fish_count: 0,
                  substrates: selectedSub,
                  temp: temp
                };
                try {
                  await createTank(updatedTank).then(() =>
                    queryClient.invalidateQueries("tankList")
                  );
                  resetStates()
                  props.hideModal()
                } catch (error) {
                  alert(error);
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

import { editTank } from "@/api/tanks";
import { style } from "@/constants/Styles";
import { tank } from "@/constants/Types";
import { useState } from "react";
import {
  Button,
  Card,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { Dropdown, Option } from "react-native-paper-dropdown";
import { useQueryClient } from "react-query";

type EditTankProps = {
  visible: boolean;
  hideModal: () => void;
  tank: tank;
};

export default function EditTankModal(props: EditTankProps) {
  const [name, setName] = useState(props.tank.name);
  const [description, setDescription] = useState(props.tank.description);
  const [size, setSize] = useState(props.tank.size.toString() || "0");
  const [temp, setTemp] = useState(props.tank.temp);
  const [selectedSub, setSelectedSub] = useState(props.tank.substrates);
  const substrates: Option[] = [
    { label: "Sand", value: "sand" },
    { label: "Aqua Soil", value: "aqua-soil" },
    { label: "Gravel", value: "gravel" },
    { label: "None", value: "none" },
  ];
  const queryClient = useQueryClient();

  function noChanges() {
    if (props.tank.name !== name) return false;
    if (props.tank.description !== description) return false;
    if (props.tank.size !== parseInt(size)) return false;
    if (props.tank.temp !== temp) return false;
    if (props.tank.temp !== selectedSub) return false
    return true;
  }

  function resetStates() {
    setSize("");
    setDescription("");
    setName("");
    setTemp("")
    setSelectedSub("")
  }
  return (
    <Portal>
      <Modal visible={props.visible} onDismiss={props.hideModal}>
        <Card style={{ margin: 24, padding: 24 }}>
          <Text>Edit {props.tank.name}</Text>
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
            onChangeText={(e) => setTemp(e)}
          ></TextInput>
          <Dropdown
            label="Edit Substrate"
            placeholder="Edit Substrate"
            options={substrates}
            value={selectedSub}
            onSelect={(s) => {
              if (s) {
                setSelectedSub(s);
              }
            }}
          />

          <Button
            style={[style.iconBtn, { padding: 2, minWidth: null }]}
            textColor="black"
            disabled={noChanges()}
            onPress={async () => {
              const updatedTank = {
                ...props.tank,
                name: name,
                description: description,
                size: parseInt(size),
                temp: temp,
                substrates: selectedSub ,
              };
              try {
                await editTank(props.tank.tank_id, updatedTank).then(() => {
                  queryClient.invalidateQueries("tankProfile");
                  queryClient.invalidateQueries("tankList");
                });
                resetStates();
                props.hideModal()
              } catch (error) {
                alert(error);
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

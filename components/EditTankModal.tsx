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
import { useQueryClient } from "react-query";

type EditTankProps = {
  visible: boolean;
  hideModal: () => void;
  tank: tank;
};

export default function EditTankModal(props: EditTankProps) {
  const [name, setName] = useState(props.tank.name);
  const [description, setDescription] = useState(props.tank.description);
  const [size, setSize] = useState(props.tank.size.toString());
  const queryClient = useQueryClient();

  function noChanges() {
    if (props.tank.name !== name) return false;
    if (props.tank.description !== description) return false;
    if (props.tank.size !== parseInt(size)) return false;
    return true;
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
              };
              try {
                await editTank(props.tank.tank_id, updatedTank).then(() =>
                  queryClient.invalidateQueries("tankProfile")
                );
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

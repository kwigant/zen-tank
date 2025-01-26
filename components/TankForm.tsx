import { style } from "@/constants/Styles";
import { Dispatch, SetStateAction, useState } from "react";
import { View } from "react-native";
import {
  Modal,
  Portal,
  TextInput,
  Text,
  IconButton,
  Button,
} from "react-native-paper";

type tankForm = {
    edit: boolean;
  onPress: Function;
  visible: boolean;
  size: number;
  setSize: Dispatch<SetStateAction<number>>;
  hideModal: () => void;
  tankName: string;
  setTankName: Dispatch<SetStateAction<string>>;
  tankDesc: string;
  setTankDesc: Dispatch<SetStateAction<string>>;
};

export default function TankForm({
edit,
  onPress,
  size,
  setSize,
  tankName,
  setTankName,
  tankDesc,
  setTankDesc,
  visible,
  hideModal,
}: tankForm) {
  // modal props
  const containerStyle = { backgroundColor: "white", margin: 24, padding: 20 };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <View>
          <TextInput
            label="Name"
            value={tankName}
            mode="outlined"
            onChangeText={(t) => setTankName(t)}
          ></TextInput>
          <TextInput
            label="Description"
            value={tankDesc}
            mode="outlined"
            onChangeText={(t) => setTankDesc(t)}
          ></TextInput>
          <View style={style.row}>
            <Text variant="bodyLarge">Size in Gallons: </Text>
            <IconButton icon={"minus"} onPress={() => setSize(size - 1)} />
            <Text variant="bodyMedium">{size}</Text>
            <IconButton icon={"plus"} onPress={() => setSize(size + 1)} />
          </View>
          <Button mode="contained" onPress={() => onPress()}>
            {edit ? 'Update Tank' : 'Create Tank'}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

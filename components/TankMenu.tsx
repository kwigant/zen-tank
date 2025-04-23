
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon, Menu } from "react-native-paper";

type TankMenuProps = {
    onPress: () => void,
    onDeletePress: () => void
}
export default function TankMenu({onPress, onDeletePress}: TankMenuProps) {
  const [mVisible, setMVisible] = useState(false);
  const openMenu = () => setMVisible(true);
  const closeMenu = () => setMVisible(false);

  function onEditClicked() {
    onPress()
    closeMenu()
  }

  function onDeleteClicked() {
    onDeletePress()
    closeMenu()
  }
  return (
    <View style={{ position: "relative" }}>
      <Menu
        visible={mVisible}
        onDismiss={closeMenu}
        anchorPosition="bottom"
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <Icon source="dots-horizontal" size={24} />
          </TouchableOpacity>
        }
      >
        <Menu.Item onPress={onEditClicked} title="Edit" />
        <Menu.Item onPress={onDeleteClicked} title="Delete" />
      </Menu>
    </View>
  );
}

import { useProfile } from "@/hooks/Profile";
import { signOutUser } from "@/utils/auth";
import { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Avatar, Divider, Menu } from "react-native-paper";

export default function UserMenu() {
  const profileCtx = useProfile();
  const { profile } = useContext(profileCtx);
  const [mVisible, setMVisible] = useState(false);
  const openMenu = () => setMVisible(true);
  const closeMenu = () => setMVisible(false);
  return (
    <Menu
      visible={mVisible}
      onDismiss={closeMenu}
      anchorPosition="bottom"
      anchor={
        <TouchableOpacity onPress={openMenu}>
          <Avatar.Text
            size={40}
            label={`${profile?.first_name.charAt(0)}${profile?.last_name.charAt(
              0
            )}`}
          />
        </TouchableOpacity>
      }
    >
      <Menu.Item title={`${profile?.first_name} ${profile?.last_name}`} />
      <Divider />
      <Menu.Item onPress={() => signOutUser()} title="Sign Out" />
    </Menu>
  );
}

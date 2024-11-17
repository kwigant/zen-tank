import { Link, router } from "expo-router";
import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, IconButton, Avatar, Menu } from "react-native-paper";
import { signOutUser } from "@/utils/auth";
import { useAuth } from "@/hooks/Auth";
import { useProfile } from "@/hooks/Profile";

export default function DashboardScreen() {
  // get context
  const ctx = useAuth();
  const { user } = React.useContext(ctx);
  const profileCtx = useProfile();
  const { profile } = React.useContext(profileCtx);

  // menu props
  const [mVisible, setMVisible] = React.useState(false);
  const openMenu = () => setMVisible(true);
  const closeMenu = () => setMVisible(false);

  function goToTanks() {
    router.push({
      pathname: "/fish-tanks",
      params: {
        name: profile?.first_name,
        tanks: profile?.tanks,
      },
    });
  }

  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <Menu
        visible={mVisible}
        onDismiss={closeMenu}
        style={{
          display: "flex",
          alignSelf: "flex-end",
          justifyContent: "flex-end",
        }}
        anchorPosition="bottom"
        anchor={
          <TouchableOpacity
            style={{
              display: "flex",
              alignSelf: "flex-end",
              justifyContent: "flex-end",
            }}
            onPress={openMenu}
          >
            <Avatar.Text
              size={48}
              label={"test"}
              style={{ margin: 24, alignSelf: "flex-start" }}
            />
          </TouchableOpacity>
        }
      >
        <Menu.Item title={user?.email} />
        <Menu.Item onPress={() => signOutUser()} title="Sign Out" />
      </Menu>

      <View style={styles.center}>
        <Text variant="headlineLarge">
          Welcome {profile?.first_name} {profile?.last_name}!
        </Text>
        <Text variant="headlineSmall">
          You have {profile?.tanks} tanks set up
        </Text>
        <Text variant="headlineSmall">
          Current tank {profile?.current_tank_name} 
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "50%",
          }}
        >
          <Link href="/fish-search">
            <IconButton
              icon="fish"
              size={48}
              style={[styles.iconBtn]}
              mode="outlined"
            />
          </Link>

          <IconButton
            icon="cube"
            size={48}
            onPress={() => goToTanks()}
            style={[styles.iconBtn]}
            mode="outlined"
          />

          <Link href="/plant-search">
            <IconButton
              icon="leaf"
              size={48}
              style={[styles.iconBtn]}
              mode="outlined"
            />
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconBtn: {
    backgroundColor: "#E8E8E8",
    padding: 5,
  },
  center: {
    marginTop: -24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

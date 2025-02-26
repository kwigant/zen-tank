import { Link, router } from "expo-router";
import * as React from "react";
import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import {
  Text,
  Avatar,
  Menu,
  Button,
  Badge,
  Chip,
  Divider,
} from "react-native-paper";
import { signOutUser } from "@/utils/auth";
import { useAuth } from "@/hooks/Auth";
import { useProfile } from "@/hooks/Profile";
import { getTank } from "@/api/tanks";
import { fish, plant, tank, TankFish, TankPlants } from "@/constants/Types";
import { getFishInTank } from "@/api/fish";
import { style } from "@/constants/Styles";
import { theme } from "@/constants/Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import TankCard from "@/components/TankCard";

export default function DashboardScreen() {
  // get context
  const ctx = useAuth();

  const { user } = React.useContext(ctx);
  const profileCtx = useProfile();
  const [currentTank, setCurrentTank] = React.useState({} as tank);
  const [currentPlants, setCurrentPlants] = React.useState([] as TankPlants[]);
  const [currentFish, setCurrentFish] = React.useState([] as TankFish[]);
  const { profile } = React.useContext(profileCtx);

  // menu props
  const [mVisible, setMVisible] = React.useState(false);
  const openMenu = () => setMVisible(true);
  const closeMenu = () => setMVisible(false);

  function navigateTo(dest: "fish" | "plant" | "tank") {
    switch (dest) {
      case "tank":
        router.push({
          pathname: "/fish-tanks",
          params: {
            name: profile?.first_name,
            tanks: profile?.tanks,
            id: profile?.current_tank_id,
          },
        });
        break;
      case "fish":
        router.push({
          pathname: "/fish-search",
        });
        break;
      case "plant":
        router.push({
          pathname: "/plant-search",
        });
        break;
      default:
        break;
    }
  }

  React.useEffect(() => {
    if (profile) {
      getTank(profile.current_tank_id)
        .then((data) => {
          if (data) {
           // console.log('current tank', data)
            setCurrentTank(data[0]);
          }
        })
        .catch((error) => {
          throw error;
        });
      getFishInTank(profile.current_tank_id).then((data) => {
        if (data) {
          console.log('fish', data)
          setCurrentFish(data);
        }
      });
    }
  }, [ profile]);

  if (currentTank) {

  
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", height: "100%" }}>
      <View style={[style.row, { marginHorizontal: 24 }]}>
        <View>
          <Text
            variant="headlineLarge"
            style={{ width: "84%", wordWrap: "wrap" }}
          >
            Welcome {profile?.first_name} {profile?.last_name}!
          </Text>
          <Text variant="bodyLarge">
            You have {profile?.tanks} tanks set up
          </Text>
        </View>
        <Menu
          visible={mVisible}
          onDismiss={closeMenu}
          anchorPosition="bottom"
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <Avatar.Text
                size={48}
                label={`${profile?.first_name.charAt(
                  0
                )}${profile?.last_name.charAt(0)}`}
                style={{ alignSelf: "flex-start" }}
              />
            </TouchableOpacity>
          }
        >
          <Menu.Item title={`${profile?.first_name} ${profile?.last_name}`} />
          <Divider />
          <Menu.Item onPress={() => signOutUser()} title="Sign Out" />
        </Menu>
      </View>
      <View style={styles.center}>
      <Text variant="bodyMedium" style={{color: 'gray', marginBottom: 12}}>
            Current Tank: 
          </Text>
        {profile && (
          <TankCard
            id={profile.current_tank_id}
            tank={currentTank}
            fish={currentFish}
            addToList={false}
          />
        )}
        <View
          style={{
            display: "flex",
            width: "100%",
            marginTop: 24,
            flexDirection: "column",
          }}
        >
          <Button
            onPress={() => navigateTo("tank")}
            style={[style.iconBtn, { width: "100%" }]}
            textColor="black"
          >
            View My Tanks
          </Button>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Button
              onPress={() => navigateTo("fish")}
              style={[style.iconBtn]}
              textColor="black"
            >
              Add Fish
            </Button>
            <Button
              onPress={() => navigateTo("plant")}
              style={[style.iconBtn]}
              textColor="black"
            >
              Add Plants
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
}

const styles = StyleSheet.create({
  iconBtn: {
    backgroundColor: "#E8E8E8",
    padding: 5,
  },
  center: {
    display: "flex",

    margin: 24,
    marginTop: 40,
  },
});

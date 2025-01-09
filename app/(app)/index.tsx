import { Link, router } from "expo-router";
import * as React from "react";
import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { Text,  Avatar, Menu, Button, Badge, Chip, Divider } from "react-native-paper";
import { signOutUser } from "@/utils/auth";
import { useAuth } from "@/hooks/Auth";
import { useProfile } from "@/hooks/Profile";
import { getTank } from "@/api/tanks";
import { fish, plant, tank } from "@/constants/Types";
import { getFishInTank } from "@/api/fish";
import { style } from "@/constants/Styles";
import { theme } from "@/constants/Theme";

export default function DashboardScreen() {
  // get context
  const ctx = useAuth();

  const { user } = React.useContext(ctx);
  const profileCtx = useProfile();
  const [currentTank, setCurrentTank] = React.useState({} as tank)
  const [currentPlants, setCurrentPlants] = React.useState([] as plant[])
  const [currentFish, setCurrentFish] = React.useState([] as fish[])
  const { profile } = React.useContext(profileCtx);

  // menu props
  const [mVisible, setMVisible] = React.useState(false);
  const openMenu = () => setMVisible(true);
  const closeMenu = () => setMVisible(false);

  function navigateTo(dest: 'fish' | 'plant' | 'tank') {
    switch (dest) {
      case 'tank': 
        router.push({
          pathname: "/fish-tanks",
          params: {
            name: profile?.first_name,
            tanks: profile?.tanks,
          },
        });
        break;
      case 'fish': 
        router.push({
          pathname: "/fish-search"
        });
        break;
      case 'plant': 
        router.push({
          pathname: "/plant-search"
        });
        break;
      default: break
    }
  }


  React.useEffect(()=> {
    if (profile) {
      getTank(profile.current_tank_id).then(data => {
        if (data) {
          console.log('data', data)
          setCurrentTank(data[0])}
      }).catch(error => { throw error })
      getFishInTank(profile.current_tank_id).then(data => {
        if (data) {
          console.log('fish', data)
          setCurrentFish(data)
        }
      })
    }
    
  }, [])

  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <View style={[style.row, {margin: 24, marginTop: 70}]}>
      <Text variant="headlineLarge" style={{width: '84%', wordWrap: 'wrap'}}>
            Welcome {profile?.first_name} {profile?.last_name}!
          </Text>
        <Menu
          visible={mVisible}
          onDismiss={closeMenu}
          anchorPosition="bottom"
          anchor={
            <TouchableOpacity
              onPress={openMenu}
            >
              <Avatar.Text
                size={60}
                label={`${profile?.first_name.charAt(0)}${profile?.last_name.charAt(0)}`}
                style={{ alignSelf: "flex-start" }}
              />
            </TouchableOpacity>
          }
        >
          <Menu.Item title={`${profile?.first_name} ${profile?.last_name}`}/>
          <Divider/>
       
          <Menu.Item title={`${profile?.tanks}`}/>
          <Divider/>
          <Menu.Item onPress={() => signOutUser()} title="Sign Out" />
        </Menu>
      
      </View>

      <View style={styles.center}>
        <Image source={require('../../assets/images/full-tank.png')}/>
        <Text variant="bodyLarge">
          You have {profile?.tanks} tanks set up
        </Text>

        <View style={{width: '100%', borderWidth: 1, borderRadius: 4, marginTop: 40, marginBottom: 20, padding: 20, alignItems: 'center'}}>
        <Text variant="headlineMedium">
          Current tank: {profile?.current_tank_name} 
        </Text>
        <View style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginVertical: 12}}>
          <Chip style={{backgroundColor: theme.colors.primary}}>Size: 5 gal.</Chip>
          <Chip style={{backgroundColor: theme.colors.primary}}>Fish: 3</Chip>
          <Chip style={{backgroundColor: theme.colors.primary}}>Plants: 4</Chip>
        </View>
        <Text> Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</Text>
        </View>

        
        <View style={{
          
          display: "flex", 
          width: "100%",
          flexDirection: 'column'
        }}>
        <Button
            onPress={() => navigateTo('tank')}
            style={[style.iconBtn]}
            textColor="black"
          >View My Tanks</Button>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: '100%'
          }}
        >
            <Button
              onPress={() => navigateTo('fish')}
              style={[style.iconBtn]}
              textColor="black"
            >Add Fish</Button>
            <Button
              onPress={() => navigateTo('plant')}
              style={[style.iconBtn]}
              textColor="black"
            >Add Plants</Button>
          
        </View>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    
    margin: 24, 
    marginTop: 40
  },
});

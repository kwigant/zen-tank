import { router } from "expo-router";
import * as React from "react";
import { TouchableOpacity, View, FlatList, Image } from "react-native";
import {
  Text,
  Avatar,
  Menu,
  Divider,
  Icon,
  Searchbar,
} from "react-native-paper";
import { signOutUser } from "@/utils/auth";
import { useAuth } from "@/hooks/Auth";
import { useProfile } from "@/hooks/Profile";
import { listTanks } from "@/api/tanks";
import { style } from "@/constants/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import TankCard from "@/components/TankCard";
import { useQuery } from "react-query";
import UserMenu from "@/components/UserMenu";

export default function DashboardScreen() {
  // get context
  const ctx = useAuth();

  const { user } = React.useContext(ctx);
  const profileCtx = useProfile();
  const { profile } = React.useContext(profileCtx);
  const [searchQuery, setSearchQuery] = React.useState('')
 

  if (user) {
    const { data: allTanks, isLoading } = useQuery({
      queryKey: "tankList",
      queryFn: () => listTanks(user.id),
    });

    if (isLoading) return <Text>Loading...</Text>;
    
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", height: "100%", alignItems: 'center' }}>
      <View style={ [style.justifiedRow, { margin: 24, paddingHorizontal: 24,  width: '100%' }]}>
      <Image style={{width: 50, height: 50}} source={require("@/assets/images/zen-tank.png")}/>
        <Searchbar style={{width: 250, marginHorizontal: 24}} value={searchQuery}/>
        <UserMenu/>
      </View>
      <View style={{alignItems: 'center'}}>
          <Text
            variant="headlineLarge"
            style={{ wordWrap: "wrap" }}
          >
            Welcome {profile?.first_name}!
          </Text>
          <Text variant="bodyLarge">
            You have {allTanks?.length} tanks set up
          </Text>
        </View>
      <FlatList
        data={allTanks}
        contentContainerStyle={{marginTop: 48, alignItems: 'center'}}
        renderItem={({ item }) => {
          return <TankCard tank={item}></TankCard>;
        }}
        keyExtractor={(item) => item.id}
      />

    </SafeAreaView>
  );
}

}

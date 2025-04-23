import * as React from "react";
import { View, FlatList } from "react-native";
import { Button, Text } from "react-native-paper";
import { useAuth } from "@/hooks/Auth";
import { useProfile } from "@/hooks/Profile";
import { listTanks } from "@/api/tanks";
import TankCard from "@/components/TankCard";
import { useQuery } from "react-query";
import { style } from "@/constants/Styles";

export default function DashboardScreen() {
  // get context
  const ctx = useAuth();

  const { user } = React.useContext(ctx);
  const profileCtx = useProfile();
  const { profile } = React.useContext(profileCtx);
function createNewTank() {

}
  if (user) {
    const { data: allTanks, isLoading } = useQuery({
      queryKey: "tankList",
      queryFn: () => listTanks(user.id),
    });

    if (isLoading) return <Text>Loading...</Text>;
    
    return (
      <View
        style={{
          backgroundColor: "#fff",
          height: "100%",
          alignItems: "center",
          padding: 24
        }}
      >
        
        <View style={{ alignItems: "center", marginTop: 24 }}>
          <Text variant="headlineLarge" style={{ wordWrap: "wrap" }}>
            Welcome {profile?.first_name}!
          </Text>
          <Text variant="bodyLarge">
            You have {allTanks?.length} tanks set up
          </Text>
        </View>
        <FlatList
          data={allTanks}
          contentContainerStyle={{ marginTop: 48, alignItems: "center" }}
          renderItem={({ item }) => {
            return <TankCard tank={item}></TankCard>;
          }}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<Button
            onPress={() => createNewTank()}
            style={[style.iconBtn, { padding: 2, minWidth: null }]}
            textColor="black"
          >
            Add a Tank
        </Button>}
        />
      </View>
    );
  }
}

import * as React from "react";
import { View, FlatList } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { useAuth } from "@/hooks/Auth";
import { useProfile } from "@/hooks/Profile";
import { listTanks } from "@/api/tanks";
import TankCard from "@/components/tanks/TankCard";
import { useQuery } from "react-query";
import { style } from "@/constants/Styles";
import NewTankModal from "@/components/tanks/NewTankModal";
import Loading from "@/components/layouts/Loading";

export default function DashboardScreen() {
  // get context
  const theme = useTheme()
  const ctx = useAuth();
  const { user } = React.useContext(ctx);
  const profileCtx = useProfile();
  const { profile } = React.useContext(profileCtx);
  const [visible, setVisible] = React.useState(false);
  const hideModal = () => setVisible(false);

  if (user) {
    const { data: allTanks, isLoading } = useQuery({
      queryKey: "tankList",
      queryFn: () => listTanks(user.id),
    });

    if (isLoading) return <Loading/>;

    return (
      <View
        style={{
          backgroundColor: theme.colors.background,
          height: "100%",
          
          padding: 24,
        }}
      >
        <View style={{ alignItems: "center", marginVertical: 12 }}>
          <Text variant="headlineLarge" style={{ wordWrap: "wrap" }}>
            Welcome {profile?.first_name}!
          </Text>
          <Text variant="bodyLarge">
            You have {allTanks?.length} tanks set up
          </Text>
        </View>

        <FlatList
          data={allTanks}
          contentContainerStyle={{ marginTop: 24, padding: 4 }}
          renderItem={({ item }) => {
            return <TankCard tank={item}></TankCard>;
          }}
          ListFooterComponent={ <Button
              onPress={() => setVisible(true)}
              style={[style.iconBtn, { padding: 2, minWidth: null }]}
              textColor="black"
            >
              Add a Tank
            </Button>}
          keyExtractor={(item) => item.id}
        />
        <NewTankModal visible={visible} hideModal={hideModal} />
      </View>
    );
  }
}

// app/(tabs)/tab_1/_layout.tsx
import UserMenu from "@/components/layouts/UserMenu";
import { Stack } from "expo-router";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

const StackLayout = () => {
   const theme = useTheme()
    return (
      <Stack
        screenOptions={() => ({
          title: "",
          headerShadowVisible: false,
          headerStyle: {backgroundColor: theme.colors.background},
          headerRight: () => <UserMenu />,
        })}
      />
    );
};

export default StackLayout;

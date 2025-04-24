// app/(tabs)/tab_1/_layout.tsx
import UserMenu from "@/components/layouts/UserMenu";
import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

const StackLayout = () => {
   const theme = useTheme()
    return (
      <Stack
        screenOptions={() => ({
          title: "",
          headerStyle: {backgroundColor: theme.colors.background},
          headerRight: () => <UserMenu />,
          headerShadowVisible: false,
        })}
      />
    );
};

export default StackLayout;

// app/(tabs)/tab_1/_layout.tsx
import UserMenu from "@/components/UserMenu";
import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack
      screenOptions={() => ({
        title: "",
        headerRight: () => <UserMenu />,
        headerShadowVisible: false,
      })}
    />
  );
};

export default StackLayout;

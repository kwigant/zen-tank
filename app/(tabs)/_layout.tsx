// app/(tabs)/_layout.tsx
import UserMenu from "@/components/UserMenu";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        options={() => ({
          headerShown: false,
        })}
        name="tanks"
      />
      <Tabs.Screen
        options={() => ({
          headerShown: false,
        })}
        name="search"
      />
    </Tabs>
  );
};

export default TabsLayout;

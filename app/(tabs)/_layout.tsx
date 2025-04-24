// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Icon, useTheme } from "react-native-paper";

const TabsLayout = () => {
  const theme = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 16 },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Tabs.Screen
        options={() => ({
          title: "Tools",
          tabBarIcon: ({ color, size }) => (
            <Icon source={"tools"} size={size} color={color} />
          ),
        })}
        name="tools"
      />
      <Tabs.Screen
        options={() => ({
          title: "Tanks",
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              source={focused ? "cube" : "cube-outline"}
              size={size}
              color={color}
            />
          ),
        })}
        name="tanks"
      />
      <Tabs.Screen
        options={() => ({
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <Icon source="magnify" size={size} color={color} />
          ),
        })}
        name="search"
      />
    </Tabs>
  );
};

export default TabsLayout;

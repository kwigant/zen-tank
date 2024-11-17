import React from "react";
import { Stack } from "expo-router";
import { ProfileProvider } from "@/hooks/Profile";

// Main app routes -- available after user login / register
export default function AppLayout() {
  return (
    <ProfileProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="fish-search/index"
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: "Add some fish!",
            headerTitleStyle: {
              fontFamily: "Poppins",
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="fish-search/[id]"
          options={{
            headerShown: false,
            headerShadowVisible: false,
            title: "",
            headerStyle: {
              backgroundColor: "transparent",
            },
          }}
        />
        <Stack.Screen
          name="fish-tanks/index"
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: "My Tank Settings",
            headerTitleStyle: {
              fontFamily: "Poppins",
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="plant-search/index"
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: "Add some plants!",
            headerTitleStyle: {
              fontFamily: "Poppins",
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="plant-search/[id]"
          options={{
            headerShown: false,
            headerShadowVisible: false,
            title: "",
            headerStyle: {
              backgroundColor: "transparent",
            },
          }}
        />
      </Stack>
    </ProfileProvider>
  );
}

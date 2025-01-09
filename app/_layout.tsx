import { theme } from "@/constants/Theme";
import { useFonts } from "expo-font";
import { Link, SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { Text, View } from "react-native";
import { AuthProvider, useAuth } from "@/hooks/Auth";

export default function RootLayout() {
  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Light.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }



  return (
    <AuthProvider>
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index"  /> 
      </Stack>
    </PaperProvider>
    </AuthProvider>
  );
}

import { theme } from "@/constants/Theme";
import { useFonts } from "expo-font";
import { Link, SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { Text, View } from "react-native";
import { AuthProvider, useAuth } from "@/hooks/Auth";
import { QueryClient, QueryClientProvider } from "react-query";

export default function RootLayout() {
  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Light.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
  });
  const queryClient = new QueryClient()
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
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index"  /> 
        </Stack>
      </QueryClientProvider>
    </PaperProvider>
    </AuthProvider>
  );
}

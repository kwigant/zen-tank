import { theme } from "@/constants/Theme";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { Text, View } from "react-native";
import { AuthProvider } from "@/hooks/Auth";
import { QueryClient, QueryClientProvider } from "react-query";
import { ProfileProvider } from "@/hooks/Profile";

export default function RootLayout() {
  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Light.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
  });
  const queryClient = new QueryClient();
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
          <ProfileProvider>
          <Stack
            screenOptions={() => ({
              headerShown: false,
              headerShadowVisible: false,
            })}
          >
            <Stack.Screen name="index" />
          </Stack>
          </ProfileProvider>
        </QueryClientProvider>
      </PaperProvider>
    </AuthProvider>
  );
}

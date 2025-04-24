import { theme } from "@/constants/Theme";
import { useFonts } from "expo-font";
import { Link, SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { Image, Text, useColorScheme, View } from "react-native";
import { AuthProvider } from "@/hooks/Auth";
import { QueryClient, QueryClientProvider } from "react-query";
import { ProfileProvider } from "@/hooks/Profile";
import { Colors } from "@/constants/Colors";
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, ThemeProvider } from "@react-navigation/native";
import merge from "deepmerge"

const customDarkTheme = {...MD3DarkTheme, colors: Colors.dark}
const customLightTheme = {...MD3LightTheme, colors: Colors.light}

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationDark: NavigationDarkTheme, 
  reactNavigationLight: NavigationDefaultTheme
})

const CombinedDefaultTheme = merge(LightTheme, customLightTheme)
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme)


export default function RootLayout() {
  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Light.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
  });
  const queryClient = new QueryClient();
  const colorScheme = useColorScheme()
  const paperTheme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme
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
      <PaperProvider theme={paperTheme}>
        <ThemeProvider value={paperTheme}>
        <QueryClientProvider client={queryClient}>
          <ProfileProvider>
          <Stack
            screenOptions={() => ({
              headerShown: false,
              headerShadowVisible: false,
            })}
          >
            <Stack.Screen name="(tabs)" />
          </Stack>
          </ProfileProvider>
        </QueryClientProvider>
        </ThemeProvider>
      </PaperProvider>
    </AuthProvider>
  );
}

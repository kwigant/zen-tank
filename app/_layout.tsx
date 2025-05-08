import { theme } from "@/constants/Theme";
import { useFonts } from "expo-font";
import { Link, SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { adaptNavigationTheme, configureFonts, MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { Image, Text, useColorScheme, View } from "react-native";
import { AuthProvider } from "@/hooks/Auth";
import { QueryClient, QueryClientProvider } from "react-query";
import { ProfileProvider } from "@/hooks/Profile";
import { Colors } from "@/constants/Colors";
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, ThemeProvider } from "@react-navigation/native";
import merge from "deepmerge"
import { NavigationContainer } from '@react-navigation/native';
import Loading from "@/components/layouts/Loading";

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
  let paperTheme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme
  
  paperTheme = {
    ...paperTheme, 
    fonts: configureFonts({
            config: {
              headlineSmall: {
                letterSpacing: 0.5,
                fontWeight: 'bold',
                lineHeight: 22,
                fontSize: 16,
                fontFamily: 'sans-serif'
              }, 
              headlineMedium: {
                letterSpacing: 0.5,
                fontWeight: '700',
                lineHeight: 22,
                fontSize: 20,
                fontFamily: 'Poppins'
              }, 
              headlineLarge: {
                letterSpacing: 0.5,
                fontWeight: 'normal',
                lineHeight: 32,
                fontSize: 28,
                fontFamily: 'Poppins'
              }, 
              bodyBold: {
                letterSpacing: 0.2,
                fontSize: 14,
                fontWeight: '700',
                fontFamily: 'Poppins', 
                lineHeight: 16
              },
              bodyMedium: {
                letterSpacing: 0.2,
                fontSize: 14,
                fontWeight: '200',
                fontFamily: 'Poppins', 
                lineHeight: 16
              }, 
              bodySmall: {
                letterSpacing: 0.2,
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Poppins', 
                lineHeight: 16
              },
            }
        }),
        roundness: 8,
  }
  
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return (
      <Loading/>
    );
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <ThemeProvider value={paperTheme}>
        <PaperProvider theme={paperTheme}>

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
        </PaperProvider>

        </ThemeProvider>
      </NavigationContainer>
    </AuthProvider>
  );
}

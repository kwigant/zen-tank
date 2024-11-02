import { theme } from "@/constants/Theme";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  const [loaded] = useFonts({
    Poppins: require('../assets/fonts/Poppins-Light.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }}/>
        <Stack.Screen 
            name="fish-search/index" 
            options={{ 
              headerShown: true, 
              headerShadowVisible: false, 
              title: 'Add some fish!', 
              headerTitleStyle: {
                fontFamily: 'Poppins', 
                fontWeight: 'bold'
              } 
            }}
          />
          <Stack.Screen 
            name="fish-search/[id]" 
            options={{ 
              headerShown: false, 
              headerShadowVisible: false, 
              title: '',
              headerStyle: {
                backgroundColor: 'transparent'
              }
            }}
          />
           <Stack.Screen 
            name="fish-tanks/index" 
            options={{ 
              headerShown: true, 
              headerShadowVisible: false, 
              title: 'Set up your tank',
              headerTitleStyle: {
                fontFamily: 'Poppins', 
                fontWeight: 'bold'
              } 
            }}
          />
      </Stack>
    </PaperProvider>
  );
}

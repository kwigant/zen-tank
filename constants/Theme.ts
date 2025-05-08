import { configureFonts, DefaultTheme } from 'react-native-paper';

export const theme = {
    ...DefaultTheme,
    // Specify custom property,
    fonts: configureFonts({
        config: {
          headlineSmall: {
            letterSpacing: 0.5,
            fontWeight: 'bold',
            lineHeight: 22,
            fontSize: 16,
            fontFamily: 'Poppins'
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
    // Specify custom property in nested object
    colors: {
      ...DefaultTheme.colors,
    },
  };
import { configureFonts, DefaultTheme } from 'react-native-paper';

export const theme = {
    ...DefaultTheme,
    // Specify custom property,
    fonts: configureFonts({
        config: {
          headerLarge: {
            letterSpacing: 0.5,
            fontWeight: 'bold',
            lineHeight: 22,
            fontSize: 20,
            fontFamily: 'Poppins'
          }, 
          bodyBold: {
            letterSpacing: 0.2,
            fontSize: 14,
            fontWeight: '700',
            fontFamily: 'Poppins', 
            lineHeight: 16
          },
          body: {
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
          bodyWhite: {
            letterSpacing: 0.2,
            fontSize: 14,
            fontWeight: '200',
            fontFamily: 'PoppinsBold', 
            lineHeight: 20,
            // color: 'white'
          }, 
        }
    }),
    // Specify custom property in nested object
    colors: {
      ...DefaultTheme.colors,
      primary: 'blue', 
      gray: '#D9D9D950'
    },
  };
import { StyleSheet } from "react-native";

export const homepageStyle = StyleSheet.create({
    container: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 70,
      
      mainLogo: {
        width: 300,
        height: 38
      },

      pressable: {
        padding: 20,
        backgroundColor: '#FC6100',
        borderRadius: 30,

        text: {
          color: 'white',
          textTransform: 'uppercase',
          fontWeight: 'bold'
        }
      },

      userView: {
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        alignItems: 'center',

        welcomeText: {
          textTransform: 'uppercase',
          fontSize: 20,
          fontWeight: 'bold'
        }
      }
    },
  });
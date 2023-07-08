import { Button, Image, Pressable, Text, Vibration, View } from "react-native";
import MainLogo from "./../../assets/main-logo.png";
import { homepageStyle } from "../styles/HomepageStyle";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { globals } from "../globals";
import { useEffect, useRef, useState } from "react";
import { _storeData, getStravaAccessToken, registerForPushNotificationsAsync, schedulePushNotification } from "../utils";
import * as Notifications from 'expo-notifications';

// Handle authentication
WebBrowser.maybeCompleteAuthSession();

// Handle notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function HomeScreen({ setUser }) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: globals.stravaClientId,
      clientSecret: globals.stravaClientSecret,
      scopes: [globals.stravaAuthScope],
      redirectUri: makeRedirectUri({
        native: globals.stravaAuthRedirectNative,
      })
    },
    globals.stravaAuthEndpoints
  );

  useEffect(() => {
    if (response?.type === 'success') {
      let { code } = response.params;

      Vibration.vibrate();
      
      getStravaAccessToken(code, setUser);

      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }
  }, [response]);

  return <View style={homepageStyle.container}>
    <Image
      source={MainLogo}
      style={homepageStyle.container.mainLogo}
    />
    <Pressable
      disabled={!request}
      style={homepageStyle.container.pressable}
      onPress={async () => {
        await schedulePushNotification({title: "Bienvenue sur Stravabien", body: "Ceci est une notification", data: "Test"});
        promptAsync();
      }}
    >
      <Text style={homepageStyle.container.pressable.text}>Se connecter avec Strava</Text>
    </Pressable>
  </View>
}
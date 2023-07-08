import {NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/components/HomeScreen";
import NewTrail from "./src/components/NewTrail";
import SearchTrails from "./src/components/SearchTrails";
import Stats from "./src/components/Stats";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { appStyle } from "./src/styles/AppStyle";
import { Image, View } from "react-native";
import { checkStoredToken } from "./src/utils";


export default function App() {
  const [user, setUser] = useState(null);
  const Tab = createBottomTabNavigator();
  const tabs = [
    {name: "Commencer", component: <NewTrail />},
    {name: "Parcours", component: <SearchTrails />},
    {name: "Profil", component: <Stats />}
  ];

  useEffect(() => {
    if (!checkStoredToken) {
      setUser(null);
    }
  }, [checkStoredToken]);
  
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      switch (route.name) {
        case "Accueil":
          iconName = focused ? "ios-home" : "ios-home-outline";
          break;
        case "Commencer":
          iconName = focused ? "ios-play" : "ios-play-outline";
          break;
        case "Parcours":
          iconName = focused ? "ios-map" : "ios-map-outline";
          break;
        case "Profil":
          if (user) {
            iconName = "profileAvatar";
          } else {
            iconName = focused ? "ios-person-circle" : "ios-person-circle-outline";
          }
          break;
        default:
          iconName = focused ? "alert-circle" : "alert-circle-outline";
          break;
      }

      if (iconName === "profileAvatar") {
        return <Image source={{ uri: user.profile }} style={appStyle.tabNavigator.profileIcon} />;
      } else {
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      }

    },
    tabBarActiveTintColor: "#FC6100",
    tabBarInactiveTintColor: "gray",
  });
  
  return (<NavigationContainer>
      {user && <Tab.Navigator
        screenOptions={screenOptions}
      >
        {tabs.map((tabInfos, key) => {
          return (
            <Tab.Screen 
              key={key}
              name={tabInfos.name}
              children={() => tabInfos.component}
              options={{
                headerTintColor: "white",
                headerStyle: { backgroundColor: "#FC6100" },
                headerMode: "screen",
              }}
            />
          );
        }) || <Tab.Screen 
          name={tabs[0].name}
          children={() => tabs[0].component}
          options={{
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#FC6100" },
            headerMode: "screen",
          }}
      />}
      </Tab.Navigator> || <HomeScreen setUser={setUser} />}
    </NavigationContainer> 
  );
};

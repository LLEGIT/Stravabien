import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { globals } from "./globals";

async function _storeData(key, value) {
    try {
        const valueString = JSON.stringify(value); // Convert value to a string
        await AsyncStorage.setItem(key, valueString);
    } catch (e) {
        // Error saving data
        console.error(e);
        return null;
    }
}

async function getData(key) {
    try {
        const value = await AsyncStorage.getItem(key);

        if (value !== null) {
            if (key === "stravaAccessToken") {
                // value previously stored
                return value.replace(/["\\]/g, '');
            } else {
                return value;
            }
        }
    } catch (e) {
        // error reading value
        console.error(e);
        return null;
    }
}

async function getStravaAccessToken(code, setUser) {
    let uri = globals.stravaAuthEndpoints.tokenEndpoint
        + "?client_id=" + globals.stravaClientId
        + "&client_secret=" + globals.stravaClientSecret
        + "&code=" + code
        + "&grant_type=" + globals.stravaAuthGrantType;

    try {
        const response = await fetch(uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();

            _storeData("stravaAccessToken", data.access_token);

            setUser(data?.athlete);

            return true;
        } else {
            let error = await response.json();
            throw new Error(response.status + " message: " + error.message + " field: " + error.errors[0]?.field);
        }
    } catch (e) {
        console.error(e);
        return null;
    }
}

async function checkStoredToken() {
    let uri = globals.stravaAthleteEndpoint;
    let token = await getData("stravaAccessToken");

    if (!token || token === "") {
        return false;
    }

    try {
        const response = await fetch(uri, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
            }
        });

        if (response.ok) {
            return true;
        } else {
            let error = await response.json();
            throw new Error(response.status + " message: " + error.message + " field: " + error.errors[0]?.field);
        }
    } catch (e) {
        console.error(e);
        return false;
    }
}

async function getAuthenticatedAthlete(setAuthenticatedAthlete) {
    let uri = globals.stravaAthleteEndpoint;
    let token = await getData("stravaAccessToken");

    try {
        const response = await fetch(uri, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
            }
        });

        if (response.ok) {

            const athlete = await response.json();

            setAuthenticatedAthlete(athlete);

            return athlete;
        } else {
            let error = await response.json();
            throw new Error(response.status + " message: " + error.message + " field: " + error.errors[0]?.field);
        }

    } catch (e) {
        console.error(e)
        return null;
    }
}

async function getAthleteStats(setStats, athleteId) {
    let uri = globals.stravatAthleteStatsEndpoint;
    uri = uri.replace("clientId", athleteId)
    let token = await getData("stravaAccessToken");

    if (!token || token === "") {
        return null;
    }

    try {
        const response = await fetch(uri, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "Authorization": "Bearer " + token
            }
        });

        if (response.ok) {
            const data = await response.json();

            setStats(data);

            return data;
        } else {
            return null;
        }

    } catch (e) {
        console.error(e);
        return null;
    }
}

async function schedulePushNotification(content) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: content.title ?? "Notification par defaut",
            body: content.body ?? "Pas de corps renseigne",
            data: { data: content.data ?? "Pas de donne renseigne" },
        },
        trigger: { seconds: 1 },
    });
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert("Must use physical device for Push Notifications");
    }

    return token;
}

function generateTimer(setTimer, setIntervalId) {
    let startTime = new Date().getTime();

    const id = setInterval(() => {
        let currentTime = new Date().getTime();
        let elapsedTime = currentTime - startTime;
        let hours = Math.floor(elapsedTime / 3600000);
        let minutes = Math.floor((elapsedTime % 3600000) / 60000);
        let seconds = Math.floor((elapsedTime % 60000) / 1000);
        let formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    
        setTimer(formattedTime);
    }, 1000);

    setIntervalId(id);
}

function padZero (number) {
    return number.toString().padStart(2, "0");
};

function getCenterCoordinates(coordinates) {
    var totalLatitude = 0;
    var totalLongitude = 0;
  
    for (var i = 0; i < coordinates.length; i++) {
      totalLatitude += coordinates[i].latitude;
      totalLongitude += coordinates[i].longitude;
    }
  
    var centerLatitude = totalLatitude / coordinates.length;
    var centerLongitude = totalLongitude / coordinates.length;
  
    return [centerLatitude, centerLongitude];
}

export {
    _storeData,
    getData,
    getStravaAccessToken,
    checkStoredToken,
    getAuthenticatedAthlete,
    getAthleteStats,
    schedulePushNotification,
    registerForPushNotificationsAsync,
    generateTimer,
    getCenterCoordinates
};

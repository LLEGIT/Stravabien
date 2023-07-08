import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { newTrailStyle } from "../styles/NewTrailStyle";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { statsPageStyle } from "../styles/StatsPageStyle";
import { generateTimer } from "../utils";

export default function NewTrail() {
    const [location, setLocation] = useState(null);
    const [fetchLocation, setFetchLocation] = useState(true);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(false);
    const [markerCoordinate, setMarkerCoordinate] = useState(null);
    const [trailStarted, setTrailStarted] = useState(false);
    const [timer, setTimer] = useState("00:00:00");
    const [speed, setSpeed] = useState("0 km/h")
    const [intervalId, setIntervalId] = useState(null);
 
    useEffect(() => {
        if (fetchLocation) {
            getLocation();
            setFetchLocation(false);
        }
    }, [fetchLocation]);

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
            
        if (status !== "granted") {
            setErrorMsg("Vous n'avez pas autorisé la localisation de l'appareil");
            return;
        }
        
        let location = await Location.getCurrentPositionAsync({});
        
        setMarkerCoordinate({ latitude: location?.coords.latitude, longitude: location?.coords.longitude });
        setLocation(location);
        setLoading(false);

    }

    const handleStartTrail = () => {
        generateTimer(setTimer, setIntervalId);
        setTimer("00:00:00");
        setTrailStarted(true);
    }

    const handleStopTrail = () => {
        clearInterval(intervalId);
        setSpeed("0 km/h");
        setTrailStarted(false);
    }

    return (<View style={newTrailStyle.container}>
        {loading && <View>
            <ActivityIndicator size={60} color="#FC6100" style={statsPageStyle.container.loaderContainer} />
        </View> || errorMsg && <View style={newTrailStyle.container.errorMsgContainer}>
            <Text style={newTrailStyle.container.errorMsgContainer.text}>Impossible d'afficher la carte pour le parcours</Text>
        </View>
            || <View>
                <MapView
                    style={newTrailStyle.container.mapView}
                    region={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003,
                    }}
                >
                    <Marker
                        coordinate={markerCoordinate}
                    />
                </MapView>
                {trailStarted && <View style={newTrailStyle.container.startBtnView}>
                    <Pressable
                        style={newTrailStyle.container.startBtnView.startBtn}
                        onPress={handleStopTrail}
                    >
                        <Ionicons name="ios-stop" size={40} color="white" />
                    </Pressable>
                </View>
                    || <View style={newTrailStyle.container.startBtnView}>
                        <Pressable
                            style={newTrailStyle.container.startBtnView.startBtn}
                            onPress={handleStartTrail}
                        >
                            <Ionicons name="ios-play" size={40} color="white" />
                        </Pressable>
                    </View>}
            </View>
            || <Text style={newTrailStyle.container.errorMsg}>{errorMsg}</Text>}
        {trailStarted && <View style={newTrailStyle.container.statsContainer}>
            <View style={newTrailStyle.container.statsContainer.statDiv}>
                <Ionicons name="ios-watch" size={20} color="white" />
                <Text>{timer}</Text>
            </View>
            <View style={newTrailStyle.container.statsContainer.statDiv}>
                <Ionicons name="ios-speedometer-outline" size={20} color="white" />
                <Text>{speed}</Text>
            </View>
        </View>}
    </View>);
}
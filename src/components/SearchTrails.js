import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { searchTrailsStyle } from "../styles/SearchTrailsStyle";
import { useEffect, useState } from "react";
import MapView, {Polyline} from 'react-native-maps';
import { getCenterCoordinates } from "../utils";

export default function SearchTrails() {
    // Test DATA TO BE REMOVED
    const [trails, setTrails] = useState([
        {
            name: "San Francisco",
            coordinates: [
              {latitude: 37.8025259, longitude: -122.4351431},
              {latitude: 37.7896386, longitude: -122.421646},
              {latitude: 37.7665248, longitude: -122.4161628},
              {latitude: 37.7734153, longitude: -122.4577787},
              {latitude: 37.7948605, longitude: -122.4596065},
              {latitude: 37.8025259, longitude: -122.4351431}
            ],
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        },
        {
            name: "Paris",
            coordinates: [
              {latitude: 48.8588443, longitude: 2.2943506},
              {latitude: 48.8591832, longitude: 2.3484872},
              {latitude: 48.862118, longitude: 2.3310799},
              {latitude: 48.8565795, longitude: 2.3150693},
              {latitude: 48.8588443, longitude: 2.2943506},
            ],
            latitudeDelta: 0.06,
            longitudeDelta: 0.06,
        },
        {
            name: "Grand Canyon",
            coordinates: [
              {latitude: 36.1069652, longitude: -112.1129978},
              {latitude: 36.0840208, longitude: -112.1164603},
              {latitude: 36.0550803, longitude: -112.1340179},
              {latitude: 36.0636462, longitude: -112.1652388},
              {latitude: 36.0800761, longitude: -112.1795722},
              {latitude: 36.1069652, longitude: -112.1129978}
            ],
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
        },
        {
            name: "Grande Muraille de Chine",
            coordinates: [
              {latitude: 40.4319077, longitude: 116.5682325},
              {latitude: 40.4310284, longitude: 116.5805811},
              {latitude: 40.4266414, longitude: 116.586128},
              {latitude: 40.422582, longitude: 116.588053},
              {latitude: 40.4163561, longitude: 116.5879946},
              {latitude: 40.4319077, longitude: 116.5682325}
            ],
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
        },
        {
            name: "Route 66",
            coordinates: [
              {latitude: 34.9875605, longitude: -90.7924103},
              {latitude: 35.0156821, longitude: -90.7834296},
              {latitude: 35.0299964, longitude: -90.7768032},
              {latitude: 35.0557671, longitude: -90.7624884},
              {latitude: 35.074924, longitude: -90.7556233},
              {latitude: 35.0878096, longitude: -90.7518977},
              {latitude: 35.1006031, longitude: -90.7496951},
              {latitude: 35.1127933, longitude: -90.7467482},
              {latitude: 35.1240797, longitude: -90.7435757},
              {latitude: 35.1340996, longitude: -90.7394691},
              {latitude: 35.1425354, longitude: -90.7335701},
              {latitude: 35.1491083, longitude: -90.7271627},
              {latitude: 35.1536001, longitude: -90.7213074},
              {latitude: 35.1604179, longitude: -90.7160248},
              {latitude: 35.1682689, longitude: -90.7113113},
              {latitude: 35.1757259, longitude: -90.7081362},
              {latitude: 35.1855468, longitude: -90.7064293},
              {latitude: 35.1957385, longitude: -90.7060957},
              {latitude: 35.2059042, longitude: -90.7072469},
              {latitude: 35.2151003, longitude: -90.7097387},
              {latitude: 35.2236054, longitude: -90.7133984},
              {latitude: 35.2316492, longitude: -90.7180261},
              {latitude: 35.2386305, longitude: -90.7233935},
              {latitude: 35.2450109, longitude: -90.729244},
              {latitude: 35.2503485, longitude: -90.735295},
              {latitude: 35.255277, longitude: -90.7412643},
              {latitude: 35.2605291, longitude: -90.7478609},
              {latitude: 35.2661191, longitude: -90.7547984},
              {latitude: 35.2716031, longitude: -90.7626472},
              {latitude: 35.2755474, longitude: -90.7709554},
              {latitude: 35.2786129, longitude: -90.7793371},
              {latitude: 35.2805715, longitude: -90.7873906},
              {latitude: 35.281283, longitude: -90.796704},
              {latitude: 35.2816567, longitude: -90.8058483},
              {latitude: 35.2816667, longitude: -90.8154044},
              {latitude: 35.2812991, longitude: -90.8259521},
              {latitude: 35.2805666, longitude: -90.8359746},
              {latitude: 35.2785584, longitude: -90.8460609},
              {latitude: 35.275421, longitude: -90.8557155},
              {latitude: 35.271246, longitude: -90.8645504},
              {latitude: 35.2661191, longitude: -90.8722016},
              {latitude: 35.2601337, longitude: -90.8783336}
            ],
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
        }
    ]);

    return <ScrollView style={searchTrailsStyle.container}>
        <View style={searchTrailsStyle.container.starredSegmentsContainer}>
            <Text style={searchTrailsStyle.container.starredSegmentsContainer.title}>Découvrir des parcours</Text>
            {trails && trails.map((trail, key) => {
                return <View key={key} style={searchTrailsStyle.container.starredSegmentsContainer.trailCard}>
                    <Text style={searchTrailsStyle.container.starredSegmentsContainer.trailCard.title}>{trail.name}</Text>
                    <View style={searchTrailsStyle.container.starredSegmentsContainer.trailCard.mapView}>
                        <MapView 
                            style={searchTrailsStyle.container.starredSegmentsContainer.trailCard.mapView.trailMap}
                            region={{
                                latitude: getCenterCoordinates(trail.coordinates)[0],
                                longitude: getCenterCoordinates(trail.coordinates)[1],
                                latitudeDelta: trail.latitudeDelta,
                                longitudeDelta: trail.longitudeDelta,
                            }}
                        >
                            <Polyline 
                                coordinates={trail.coordinates}
                                strokeColor="#FC6100"
                                strokeWidth={4}
                            />
                        </MapView>
                    </View>
                </View>
            })
            || <ActivityIndicator size={60} color="#FC6100" />}
        </View>
    </ScrollView>
}
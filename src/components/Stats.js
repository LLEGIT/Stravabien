import { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, Image, ScrollView } from "react-native";
import { getAthleteStats, getAuthenticatedAthlete } from "../utils";
import { statsPageStyle } from "../styles/StatsPageStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import { translations } from "../translations";

export default function Stats() {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [authenticatedAthlete, setAuthenticatedAthlete] = useState(null);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        if (!authenticatedAthlete && !stats) {
            getAuthenticatedAthlete(setAuthenticatedAthlete)
            .then((athlete) => {
                getAthleteStats(setStats, athlete.id);
                setLoading(false);
            }).catch((error) => setErrorMsg(error));
        }
    }, [authenticatedAthlete, stats]);

    return <ScrollView style={statsPageStyle.container}>
        {errorMsg && <View style={statsPageStyle.container.errorContainer}>
            <Ionicons name="ios-warning" size={80} color="#FC6100" />
            <Text style={statsPageStyle.container.errorContainer.text}>{errorMsg.message}</Text>
        </View>}
        {authenticatedAthlete && <View style={statsPageStyle.container.profileContainer}>
            <View style={statsPageStyle.container.profileContainer.headerRow}>
                <Text style={statsPageStyle.container.profileContainer.headerRow.title}>Mes infos perso</Text>
                <Image
                    source={{uri: authenticatedAthlete.profile}}
                    style={statsPageStyle.container.profileContainer.headerRow.avatar}
                />
            </View>
            <View style={statsPageStyle.container.profileContainer.infoRow}>
                <Text style={statsPageStyle.container.profileContainer.infoRow.infoLabel}>Prenom</Text>
                <Text>{authenticatedAthlete.firstname}</Text>
            </View>
            <View style={statsPageStyle.container.profileContainer.infoRow}>
                <Text style={statsPageStyle.container.profileContainer.infoRow.infoLabel}>Nom</Text>
                <Text>{authenticatedAthlete.lastname}</Text>
            </View>
            <View style={statsPageStyle.container.profileContainer.infoRowBio}>
                <Text style={statsPageStyle.container.profileContainer.infoRow.infoLabel}>Bio</Text>
                <Text style={statsPageStyle.container.profileContainer.infoRowBio.infoText}>{authenticatedAthlete.bio ?? "Vous n'avez pas de bio 😔"}</Text>
            </View>
            <View style={statsPageStyle.container.profileContainer.infoRow}>
                <Text style={statsPageStyle.container.profileContainer.infoRow.infoLabel}>Ville</Text>
                <Text>
                    <Ionicons name="ios-business-outline" size={18} style={statsPageStyle.container.profileContainer.infoRow.icon} />
                    {authenticatedAthlete.city}
                </Text>
            </View>
        </View> || loading && <View style={statsPageStyle.container.loaderContainer}>
            <ActivityIndicator size={60} color='#FC6100' />
        </View>}
        {stats && <View style={statsPageStyle.container.statsContainer}>
            <View style={statsPageStyle.container.profileContainer.headerRow}>
                <Text style={statsPageStyle.container.profileContainer.headerRow.title}>Mes statistiques</Text>
            </View>
            <Text style={statsPageStyle.container.statsContainer.statsView.subTitle}>Statistiques globales parcours terrestres</Text>
            <View style={statsPageStyle.container.statsContainer.statsView}>
            {Object.entries(stats?.all_ride_totals).map(([key, value]) => (
                <View key={key} style={statsPageStyle.container.statsContainer.statsView.statRow}>
                    <Text style={statsPageStyle.container.statsContainer.statsView.statRow.key}>{translations[key]}</Text>
                    <Text style={statsPageStyle.container.statsContainer.statsView.statRow.vqlue}>{value}</Text>
                </View>
            ))}
            </View>
            <Text style={statsPageStyle.container.statsContainer.statsView.subTitle}>Statistiques globales natation</Text>
            <View style={statsPageStyle.container.statsContainer.statsView}>
            {Object.entries(stats?.all_swim_totals).map(([key, value]) => (
                <View key={key} style={statsPageStyle.container.statsContainer.statsView.statRow}>
                    <Text style={statsPageStyle.container.statsContainer.statsView.statRow.key}>{translations[key]}</Text>
                    <Text style={statsPageStyle.container.statsContainer.statsView.statRow.vqlue}>{value}</Text>
                </View>
            ))}
            </View>
        </View> || loading && <View>
            <ActivityIndicator size={60} color="#FC6100" />
        </View>}
    </ScrollView>
}
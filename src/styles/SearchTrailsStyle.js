import { StyleSheet } from "react-native";

export const searchTrailsStyle = new StyleSheet.create({
    container: {
        padding: 10,

        starredSegmentsContainer: {
            display: "flex",
            flexDirection: "column",
            gap: 30,

            title: {
                fontSize: 25,
                textAlign: "center",
                textTransform: "uppercase",
                fontWeight: "bold",
                color: "#FC6100",
            },

            trailCard: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 15,

                title: {
                    fontSize: 18,
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    color: "#FC6100",
                },

                mapView: {
                    borderRadius: 20,
                    width: "100%",
                    height: 450,
                    overflow: "hidden",

                    trailMap: {
                        flex: 1,
                        width: "100%",
                        height: 450
                    }
                }
                
            }
        }
    }
});
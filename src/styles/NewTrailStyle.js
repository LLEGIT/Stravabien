import { StyleSheet } from "react-native";

export const newTrailStyle = new StyleSheet.create({
    container: {
        errorMsgContainer: {
            display: "flex",
            justifyContent: "center",
            padding: 15,

            text: {
                paddingTop: 20,
                textAlign: "center"
            }
        },

        mapView: {
            zIndex: 10,
            width: "100%", 
            height: "90%",
        },

        startBtnView: {
            zIndex: 10,
            height: "10%",
            backgroundColor: "#FC6100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            startBtn: {
                flexDirection: "row",
                alignItems: "center",
            }
        },

        statsContainer: {
            zIndex: 1,
            position: "absolute",
            bottom: 100,
            right: 10,
            padding: 10,
            borderRadius: 15,
            backgroundColor: "#FC6100",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,

            statDiv: {
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: 10
            }
        }
    }
})
import { StyleSheet } from "react-native"

export const statsPageStyle = new StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 15,

        errorContainer: {
            padding: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 15,
            
            text: {
                fontSize: 20,
                fontWeight: "bold"
            }
        },

        loaderContainer: {
            position: "absolute",
            top: 300,
            left: "42%"
        },

        profileContainer: {
            padding: 15,
            display: "flex",
            flexDirection: "column",
            gap: 15,
            
            headerRow: {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",

                title: {
                    fontSize: 30,
                    color: "#FC6100"
                },

                avatar: {
                    width: 70,
                    height: 70
                }
            },

            infoRow: {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",

                infoLabel: {
                    fontWeight: "bold",
                    textTransform: "uppercase"
                }
            },

            infoRowBio: {
                flexDirection: "column",

                infoText: {
                    textAlign: "justify"
                }
            }
        },

        statsContainer: {
            padding: 15,
            display: "flex",
            flexDirection: "column",
            gap: 15,
            
            statsView: {
                display: "flex",
                flexDirection: "column",
                gap: 5,

                subTitle: {
                    fontSize: 17,
                    fontStyle: "italic",
                    padding: 10,
                    textAlign: "center",
                    backgroundColor: "white",
                    borderRadius: 10
                },
                
                statRow: {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    
                    key: {
                        color: "#FC6100",
                        fontSize: 15,
                        fontWeight: "bold",
                        textTransform: "uppercase"
                    },

                    value: {
                        fontSize: 15,
                        fontWeight: "bold",
                    }
                }
            }
        }
    }
});
import { StyleSheet } from "react-native";
import { theme } from "./Theme";

export const style = StyleSheet.create({
    // global layout styles ---------------------
    mt20: {
        marginTop: 20,
    },
    row: {
        display: 'flex',
        flexDirection: 'row', 
        alignItems: 'center',
    },
    justifiedRow: {
        display: 'flex',
        flexDirection: 'row', 
        alignItems: 'center', 
        width: '100%',
        justifyContent: 'space-between'
    },
    column: {
        display: 'flex', 
        flexDirection: 'column'
    },
    tabActive: {
        fontWeight: 500,
        borderBottomWidth: 2, 
        borderRadius: 0,
        borderColor: 'black'
    }, 
    tabInactive: {
        color: '#d9d9d9',
        borderRadius: 0,
        fontWeight: 'normal'
        // borderBottomWidth: 1, 
        // borderBottomColor: 'transparent' 
    }, 
    container: {
        padding: 24, 
        paddingBottom: 0
    }, 
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: "stretch",
    },
    // List Item Styles --------------------
    listItem: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 12,
        width: '100%',
        height: 75,
        borderBottomColor: '#D9D9D970',
        borderBottomWidth: 1
    }, 
    // List Item Styles --------------------
    gridItem: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 8,
        width: 110,
        height: 110,
        margin: 4,
        borderStyle: 'solid',
        borderRadius: 12,
        borderColor: '#D9D9D9',
        borderWidth: 2, 
        justifyContent: 'center'
    }, 
    // Search Page Styles ----------------
    chipActive: {
        marginHorizontal: 4,
        borderRadius: 25,
        color: 'white',
        backgroundColor: 'lightblue'
    }, 
    chipInactive: {
        borderRadius: 25,
        marginHorizontal: 4,
        color: 'white',
        backgroundColor: '#d9d9d9'
    }, 
    searchBar: {
        backgroundColor: '#add8e650',
        height: 40,
        flexGrow: 1
    },
    // Tank Card Styles ----------------
   tankCard: {
    width: '100%', 
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: 8, 
    padding: 24, 
    borderWidth: 1,
    borderColor: "#00000030",
    display: 'flex', 
    flexDirection: 'column',
   },
    // Auth Page Styles ---------------------
    authContainer: {
        height: "100%",
        padding: 12,
        display: "flex",
        justifyContent: "center",
    },
    iconBtn: {
        backgroundColor: "#F5F5F5", 
        borderRadius: 8, 
        padding: 10, 
        margin: 4,
        color: 'black',
        minWidth: '50%',
        fontSize: 20
    }
})
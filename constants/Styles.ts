import { StyleSheet } from "react-native";
import { Colors } from "./Colors";
export const style = StyleSheet.create({
    // global layout styles ---------------------
    mt20: {
        marginTop: 20,
    },
    background: {
        padding: 24,
        height: '100%'
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
    height: 'auto',
    padding: 24, 
    marginVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#00000030",
    display: 'flex', 
    flexDirection: 'row',
   },
    // Auth Page Styles ---------------------
    authContainer: {
        height: "100%",
        padding: 12,
        display: "flex",
        justifyContent: "center",
    },
    iconBtn: {
        backgroundColor: Colors.light.primaryContainer, 
        borderRadius: 8, 
        padding: 10, 
        margin: 4,
        minWidth: '50%',
        fontSize: 20,
        color: 'white'
    }
})
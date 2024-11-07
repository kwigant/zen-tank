import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
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
    tabActive: {
        color: 'lightblue',
        borderBottomWidth: 1, 
        borderRadius: 0,
        borderBottomColor: 'lightblue' 
    }, 
    tabInactive: {
        color: '#d9d9d9',
        borderRadius: 0,
        borderBottomWidth: 1, 
        borderBottomColor: 'transparent' 
    }, 
    searchBar: {
        backgroundColor: '#D9D9D970', 
        height: 40,
        marginBottom: 8
    },
    container: {
        padding: 24, 
        paddingBottom: 0
    }, 
    accordionListText:  {
        marginHorizontal: 16, 
        marginVertical: 8
    }
})
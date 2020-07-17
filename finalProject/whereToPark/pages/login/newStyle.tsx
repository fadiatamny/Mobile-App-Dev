import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        opacity: 1
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: '#002e94',
        fontSize: 20
    },
    modalSubText: {
        marginBottom: 15,
        textAlign: "center",
        color: '#284994'
    },
    modalSubList: {
        marginBottom: 15,
        textAlign: "center",
        color: '#6986c9'
    },
    input:{
        width: Dimensions.get('window').width - 180,
    },
    inputText: {
        fontSize: 16
    },
    btn: {
        width: 120,
        marginTop: 7,
        marginBottom: 3,
        borderRadius: 12,
        backgroundColor: '#284994'
    },
    tinyText:{
        fontSize: 12,
        color: '#002e94',
        marginTop: 10
    }
});

export default styles;
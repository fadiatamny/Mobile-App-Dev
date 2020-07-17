
import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container:{
        height: Dimensions.get('window').height
    },
    nameText: {
        color: '#002e94',
        fontSize: 15
    },
    favText: {
        margin: 20,
        fontSize: 18,
        color: '#002e94'
    },
    logoutBtn: {
        position: 'absolute',
        right: 0,
        top: '1.5%'
    },
    infoBtn: {
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    profileView: {
        width: '80%'
    }
});

export default styles;

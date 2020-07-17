import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    locationBtn: {
        position: 'absolute',
        top: Dimensions.get('window').height - 70,
        left: Dimensions.get('window').width - 65
    },
    favBtn: {
        position: 'absolute',
        top: 20,
        left: 10
    },
    addBtn:{
        position: 'absolute',
        top: Dimensions.get('window').height - 70,
        left: 10
    },
    btn: {
        backgroundColor: '#002e94',
        borderRadius: 50,
    }
});

export default styles;
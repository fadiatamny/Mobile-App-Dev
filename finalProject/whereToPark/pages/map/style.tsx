import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  absoulte: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  indicator: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2 - 30,
    left: Dimensions.get('window').width / 2 - 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3
  }
});

export default styles;

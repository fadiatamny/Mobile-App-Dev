import React from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, Alert, Modal, TouchableHighlight } from 'react-native';
import MapView from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';

import Marker from './marker';
import Menu from './menu';
import ModalView from './modal';

import { initMap } from './actions';
import styles from './style';
import { SET_MARKERS } from '../../services/redux/types';

const Map = ({ navigation }: any) => {
  const loading: boolean = useSelector((state: any) => state.map.isLoading);
  const location: any = useSelector((state: any) => state.map.focus);
  const markers: any = useSelector((state: any) => state.map.markers);
  const dispatch: any = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selected, setSelected] = React.useState({});

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        navigation.navigate('Login');
      }
      dispatch(initMap());
    })();
  }, [])

  return (
    <SafeAreaView>
      <ModalView modalVisible={modalVisible} setModalVisible={setModalVisible} data={selected} location={location}/>
      <View style={{ ...styles.container, ...styles.absoulte }}>
        <View style={{ ...styles.absoulte }}>
          {location.latitude !== undefined ?
            <MapView style={styles.mapStyle} region={{ latitude: location.latitude, longitude: location.longitude, latitudeDelta: 0.005, longitudeDelta: 0.005 }}>
              {
                markers.map((element: any): any => <Marker key={element._id.toString()} data={element} setModalVisible={setModalVisible} setSelected={setSelected} />)
              }
            </MapView>
            :
            <Text>test</Text>
          }
        </View>
        {loading ?
          (
            <View style={styles.indicator}>
              <ActivityIndicator size={'large'} color={'#2fcccc'} />
            </View>
          ) :
          (
            <Menu navigation={navigation} />
          )
        }
      </View>
    </SafeAreaView >
  );
};

export default Map;

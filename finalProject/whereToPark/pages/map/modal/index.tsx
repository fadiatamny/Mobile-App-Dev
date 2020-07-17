import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Modal, Linking, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { addToFavs } from '../../login/actions';
import { removeMarker } from '../actions';
import styles from './style';

const exists = (item: any, array: any): boolean => {
  for (let index = 0; index < array.length; index++) {
    if (array[index].latitude === item.latitude && array[index].longitude === item.longitude)
      return true;
  }
  return false;
};

const ModalView = ({ modalVisible, setModalVisible, data, location }: any): any => {
  const dispatch = useDispatch();
  const username = useSelector((state: any) => state.user.username);
  const markers = useSelector((state: any) => state.map.markers);
  const pins = useSelector((state: any) => state.user.favs);
  const alreadyFav: boolean = exists(
    { longitude: location.longitude, latitude: location.latitude },
    pins
  );

  const openMaps = async (): Promise<void> => {
    const scheme =
      Platform.OS === 'ios'
        ? 'http://maps.apple.com/?daddr='
        : 'https://www.google.com/maps/search/?api=1&query=';
    const array = markers.filter((elem: any) => elem._id !== location._id);
    setModalVisible(!modalVisible);
    dispatch(removeMarker(location._id, array));
    Linking.openURL(`${scheme}${location.latitude},${location.longitude}`);
  };

  const addFavs = (): void => {
    const pin = {
      name: data[0].name,
      city: data[0].city,
      country: data[0].country,
      longitude: location.longitude,
      latitude: location.latitude
    };
    pins.push(pin);
    setModalVisible(!modalVisible);
    dispatch(addToFavs(username, pins));
  };

  return (
    <>
      {Object.keys(data).length !== 0 ? (
        <Modal animationType="slide" transparent visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{data[0].name}</Text>
              <Text style={styles.modalSubText}>
                {data[0].city} - {data[0].country}
              </Text>
              {!alreadyFav ? (
                <Button title="Add To Favorites" buttonStyle={styles.btn} onPress={addFavs} />
              ) : null}
              {location.available ? (
                <Button title="Navigate" buttonStyle={styles.btn} onPress={openMaps} />
              ) : null}
              <Button
                title="Close"
                buttonStyle={styles.btn}
                onPress={(): void => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </Modal>
      ) : null}
    </>
  );
};

export default ModalView;

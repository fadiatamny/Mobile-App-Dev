import React from 'react';
import { MarkerAnimated } from 'react-native-maps';
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';

import { setFocus } from '../actions';

const Marker = ({ data, setSelected, setModalVisible }: any): any => {
  const dispatch = useDispatch();

  const handleSelect = async (e: any): Promise<any> => {
    const y = await Location.reverseGeocodeAsync(e.nativeEvent.coordinate);
    setSelected(y);
    dispatch(setFocus(data));
    setTimeout((): void => setModalVisible(true), 500);
  };
  return (
    <MarkerAnimated
      coordinate={{ latitude: data.latitude, longitude: data.longitude }}
      title={data.name}
      description={`${data.city} - ${data.country}`}
      onSelect={handleSelect}
    />
  );
};

export default Marker;

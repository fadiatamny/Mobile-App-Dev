import Axios from 'axios';
import { SET_FOCUS, SET_MARKERS, LOADING, SET_STATE } from '../../services/redux/types';
import { API_KEY, ENDPOINT } from '../../constants';

import * as Location from 'expo-location';

export const fetchMarkers = async (): Promise<any> => {
  const res: any = await Axios.get(`${ENDPOINT}/pin/`, {
    headers: {
      'API-KEY': API_KEY
    }
  });
  return res.data;
};

export const fetchFocus = async (): Promise<any> => {
  const x = await Location.getCurrentPositionAsync({});
  const y = await Location.reverseGeocodeAsync(x.coords);

  return {
    name: y[0].name,
    city: y[0].city,
    country: y[0].country,
    longitude: x.coords.longitude,
    latitude: x.coords.latitude
  };
};

export const initMap = (): any => async (dispatch: any): Promise<void> => {
  dispatch({
    type: LOADING
  });

  let pinsData;
  let focusData;

  try {
    pinsData = await fetchMarkers();
    focusData = await fetchFocus();
  } catch (e) {
    console.log(e);
  }

  dispatch({
    type: SET_STATE,
    payload: { data: { pins: pinsData, focus: focusData } }
  });
};

export const refreshMarkers = (): any => async (dispatch: any): Promise<void> => {
  try {
    dispatch({
      type: LOADING
    });
    const markers = await fetchMarkers();
    dispatch({
      type: SET_MARKERS,
      payload: { data: markers }
    });
  } catch (e) {
    console.log(e);
  }
};

export const initFocus = (): any => async (dispatch: any): Promise<void> => {
  dispatch({
    type: LOADING
  });

  let focus;

  try {
    focus = await fetchFocus();
  } catch (e) {
    console.log(e);
  }

  dispatch({
    type: SET_FOCUS,
    payload: { data: focus }
  });
};

export const setFocus = (focus: any): any => async (dispatch: any): Promise<void> => {
  dispatch({
    type: LOADING
  });
  dispatch({
    type: SET_FOCUS,
    payload: { data: focus }
  });
};

export const removeMarker = (markerId: string, markers: any): any => async (
  dispatch: any
): Promise<void> => {
  dispatch({
    type: LOADING
  });
  try {
    await Axios.delete(`${ENDPOINT}/pin/${markerId}`, {
      headers: {
        'API-KEY': API_KEY
      }
    });
    dispatch({
      type: SET_MARKERS,
      payload: { data: markers }
    });
  } catch (e) {
    console.log(e);
  }
};

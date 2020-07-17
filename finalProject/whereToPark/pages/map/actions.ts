import Axios from 'axios';
import { SET_FOCUS, SET_MARKERS, LOADING, SET_STATE } from '../../services/redux/types';
import { API_KEY, ENDPOINT } from '../../constants';

import Pin from '../../models/pin.model';
import * as Location from 'expo-location';

const defaultLoc = {
  name: 'Negba 7',
  city: 'Tel Aviv',
  country: 'Israel',
  longitude: 34.781769,
  latitude: 32.0853
};

export const setLoading = (): any => async (dispatch: any): Promise<void> => {
  dispatch({
    type: LOADING
  });
};

const fetchMarkers = async (): Promise<Pin[]> => {
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

  let pins;
  let focus;

  try {
    pins = await fetchMarkers();
    focus = await fetchFocus();
  } catch (e) {
    console.log(e);
  }

  dispatch({
    type: SET_STATE,
    payload: { data: { pins: pins || [], focus: focus || defaultLoc } }
  });
};

export const refreshMarkers = (): any => async (dispatch: any): Promise<void> => {
  try {
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
  let focus;

  try {
    focus = await fetchFocus();
  } catch (e) {
    console.log(e);
  }

  dispatch({
    type: SET_FOCUS,
    payload: { data: focus || defaultLoc }
  });
};

export const setFocus = (focus: any): any => async (dispatch: any): Promise<void> => {
  dispatch({
    type: SET_FOCUS,
    payload: { data: focus || defaultLoc }
  });
};

export const removeMarker = (markerId: string, markers: any): any => async (
  dispatch: any
): Promise<void> => {
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

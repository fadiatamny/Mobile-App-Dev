import Axios from 'axios';
import { SET_USER, SET_ALL_FAVS } from '../../services/redux/types';
import { API_KEY, ENDPOINT } from '../../constants';

export const login = (username: string, name: string): any => async (
  dispatch: any
): Promise<void> => {
  dispatch({
    type: SET_USER,
    payload: { data: { username, name } }
  });
};

export const setFavs = (favs: any): any => async (dispatch: any): Promise<void> => {
  //had to parse some of the elements because of the database.
  const data = favs.map((element: any) => {
    try {
      return JSON.parse(element);
    } catch (e) {
      return element;
    }
  });
  dispatch({
    type: SET_ALL_FAVS,
    payload: { data }
  });
};

export const addToFavs = (userEmail: string, pins: any): any => async (
  dispatch: any
): Promise<void> => {
  try {
    await Axios.put(
      `${ENDPOINT}/user/${userEmail.toLowerCase()}`,
      { pins },
      {
        headers: {
          'API-KEY': API_KEY
        }
      }
    );
    dispatch({
      type: SET_ALL_FAVS,
      payload: { data: pins }
    });
  } catch (e) {
    console.log(e);
  }
};

export const removeFav = (userEmail: string, pins: any): any => async (
  dispatch: any
): Promise<void> => {
  try {
    await Axios.put(
      `${ENDPOINT}/user/${userEmail.toLowerCase()}`,
      { pins },
      {
        headers: {
          'API-KEY': API_KEY
        }
      }
    );
    dispatch({
      type: SET_ALL_FAVS,
      payload: { data: pins }
    });
  } catch (e) {
    console.log(e);
  }
};

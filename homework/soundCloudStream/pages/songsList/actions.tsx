import axios from 'axios';
import { SET_TRACKS, LOADING } from '../../services/redux/types';
import { API_KEY, ENDPOINT } from 'react-native-dotenv';
import songSearch from '../../models/songSearch';

const search = async (query: string): Promise<songSearch[]> => {
  const res: any = await axios({
    method: 'get',
    url: `${ENDPOINT}/tracks/?client_id=${API_KEY}&q=${query}`
  });
  return res.data;
};

export const setLoading = (): any => async (dispatch: any): Promise<void> => {
  dispatch({
    type: LOADING
  });
};

export const searchTracks = (query: string): any => async (dispatch: any): Promise<void> => {
  const res: songSearch[] = await search(query);
  dispatch({
    type: SET_TRACKS,
    payload: { data: res, q: query }
  });
};

export const noTracks = (): any => async (dispatch: any): Promise<void> => {
  dispatch({
    type: SET_TRACKS,
    payload: { data: [], q: '' }
  });
};

import { SET_TRACKS, LOADING } from '../../services/redux/types';

const initialState = {
  isLoading: false,
  tracks: [],
  queries: [],
  query: ''
};

export default (state = initialState, action: any): any => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true
      };
    case SET_TRACKS:
      return {
        ...state,
        isLoading: false,
        tracks: action.payload.data,
        queries:
          action.payload.q !== '' ? [...state.queries, action.payload.q] : [...state.queries],
        query: action.payload.q
      };
    default:
      return state;
  }
};

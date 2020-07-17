import { SET_FOCUS, SET_MARKERS, LOADING, LOGOUT, SET_STATE } from '../../services/redux/types';

const initialState = {
  isLoading: true,
  markers: [],
  focus: {
    name: 'Negba 7',
    city: 'Tel Aviv',
    country: 'Israel',
    longitude: 34.8233,
    latitude: 32.07059
  }
};

export default (state = initialState, action: any): any => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true
      };
    case SET_STATE:
      return {
        ...state,
        isLoading: false,
        markers: action.payload.data.pins,
        focus: action.payload.data.focus
      };
    case SET_FOCUS:
      return {
        ...state,
        isLoading: false,
        focus: action.payload.data
      };
    case SET_MARKERS:
      return {
        ...state,
        isLoading: false,
        markers: action.payload.data
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

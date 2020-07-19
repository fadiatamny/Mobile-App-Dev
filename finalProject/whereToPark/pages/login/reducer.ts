import { SET_USER, SET_ALL_FAVS, LOGOUT } from '../../services/redux/types';

const initialState = {
  username: '',
  name: '',
  favs: []
};

export default (state = initialState, action: any): any => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        username: action.payload.data.username,
        name: action.payload.data.name
      };
    case SET_ALL_FAVS:
      return {
        ...state,
        favs: action.payload.data
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

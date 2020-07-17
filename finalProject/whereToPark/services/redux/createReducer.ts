import { combineReducers } from 'redux';
import userReducer from '../../pages/login/reducer';
import mapReducer from '../../pages/map/reducer';

export default combineReducers({ user: userReducer, map: mapReducer });

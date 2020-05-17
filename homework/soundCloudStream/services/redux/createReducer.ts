import { combineReducers } from 'redux';
import songsReducer from '../../pages/songsList/reducer';
export default combineReducers({
  songs: songsReducer
});

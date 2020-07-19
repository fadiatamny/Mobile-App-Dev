import { createStore, applyMiddleware } from 'redux';
import rootReducer from './services/redux/createReducer';
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];
const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

export default store;

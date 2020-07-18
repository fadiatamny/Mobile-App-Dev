import mapReducer from '../pages/map/reducer';
import { LOADING, SET_STATE, SET_FOCUS, SET_MARKERS, LOGOUT } from '../services/redux/types';

describe('Map reducer tests', () => {
  test('has init state', () => {
    const initState = {
      isLoading: true,
      markers: [],
      focus: {}
    };
    const state = mapReducer(undefined, {});
    expect(state).toMatchObject(initState);
  });

  test('turn on Loading', () => {
    const state = mapReducer(undefined, { type: LOADING });
    expect(state.isLoading).toEqual(true);
  });

  test('sets focus and map markers', () => {
    const payload = { data: { pins: ['test'], focus: ['test'] } };
    const state = mapReducer(undefined, { type: SET_STATE, payload });
    expect(state.markers).toEqual(['test']);
    expect(state.focus).toEqual(['test']);
  });

  test('set focus point', () => {
    let state = {
      isLoading: true,
      markers: ['123', '1234'],
      focus: { name: ' not a valid test' }
    };
    const payload = { data: { name: 'valid test' } };
    state = mapReducer(undefined, { type: SET_FOCUS, payload });
    expect(state.focus).toEqual({ name: 'valid test' });
  });

  test('set markers point', () => {
    let state = {
      isLoading: true,
      markers: ['123', '1234'],
      focus: {}
    };
    const payload = { data: ['test'] };
    state = mapReducer(undefined, { type: SET_MARKERS, payload });
    expect(state.markers).toEqual(['test']);
  });

  test('Logout', () => {
    const initFocus = {
      name: 'Negba 7',
      city: 'Tel Aviv',
      country: 'Israel',
      longitude: 34.8233,
      latitude: 32.07059
    };
    const state = mapReducer(undefined, { type: LOGOUT });
    expect(state.markers).toEqual([]);
    expect(state.isLoading).toEqual(true);
    expect(state.focus).toEqual(initFocus);
  });
});

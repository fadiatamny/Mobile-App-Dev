import loginReducer from '../pages/login/reducer';
import { SET_USER, SET_ALL_FAVS, LOGOUT } from '../services/redux/types';

describe('Login reducer tests', () => {
  test('has init state', () => {
    const initState = {
      username: '',
      name: '',
      favs: []
    };
    const state = loginReducer(undefined, {});
    expect(state).toMatchObject(initState);
  });

  test('sets user details', () => {
    const payload = { data: { username: 'user', name: 'name' } };
    const state = loginReducer(undefined, { type: SET_USER, payload });
    expect(state.username).toEqual('user');
    expect(state.name).toEqual('name');
  });

  test('set favs point', () => {
    const payload = { data: ['test'] };
    const state = loginReducer(undefined, { type: SET_ALL_FAVS, payload });
    expect(state.favs).toEqual(['test']);
  });

  test('Logout state', () => {
    const state = loginReducer(undefined, { type: LOGOUT });
    expect(state.username).toEqual('');
    expect(state.name).toEqual('');
    expect(state.favs).toEqual([]);
  });
});

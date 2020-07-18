import { removeFav, addToFavs, setFavs, login } from '../pages/login/actions';
import { SET_ALL_FAVS, SET_USER } from '../services/redux/types';

describe('Map actions test', () => {
  test('setting user details', async () => {
    const myDispatch = jest.fn();
    await login('test', 'testing')(myDispatch);
    expect(myDispatch).toHaveBeenCalled();
    const payload = { data: { username: 'test', name: 'testing' } };
    expect(myDispatch).toHaveBeenCalledWith({ type: SET_USER, payload });
  });
  test('setting user favorites', async () => {
    const myDispatch = jest.fn();
    await setFavs(['test', 'testing'])(myDispatch);
    expect(myDispatch).toHaveBeenCalled();
    const payload = { data: ['test', 'testing'] };
    expect(myDispatch).toHaveBeenCalledWith({ type: SET_ALL_FAVS, payload });
  });
  test('adding a favorite', async () => {
    const myDispatch = jest.fn();
    await addToFavs('test@test.com', ['test', 'testing'])(myDispatch);
    expect(myDispatch).toHaveBeenCalled();
    const payload = { data: ['test', 'testing'] };
    expect(myDispatch).toHaveBeenCalledWith({ type: SET_ALL_FAVS, payload });
  });
  test('removing a favorite', async () => {
    const myDispatch = jest.fn();
    await removeFav('test@test.com', ['test', 'testing'])(myDispatch);
    expect(myDispatch).toHaveBeenCalled();
    const payload = { data: ['test', 'testing'] };
    expect(myDispatch).toHaveBeenCalledWith({ type: SET_ALL_FAVS, payload });
  });
});

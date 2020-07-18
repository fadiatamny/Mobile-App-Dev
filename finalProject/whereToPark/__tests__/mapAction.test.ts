import { initMap, setFocus, removeMarker, initFocus, refreshMarkers } from '../pages/map/actions';
import { SET_FOCUS, SET_STATE, LOADING, SET_MARKERS } from '../services/redux/types';

describe('Map actions test', () => {
  test('Initializing the map', async () => {
    const myDispatch = jest.fn();
    await initMap()(myDispatch);
    expect(myDispatch).toHaveBeenCalledTimes(2);

    expect(myDispatch).toHaveBeenNthCalledWith(1, { type: LOADING });

    const payload = {
      data: {
        pins: [],
        focus: {
          name: 'Negba Road 7',
          city: 'Ramat Gan',
          country: 'Israel',
          longitude: 34.82329083642053,
          latitude: 32.07068481041871
        }
      }
    };
    expect(myDispatch).toHaveBeenNthCalledWith(2, { type: SET_STATE, payload });
  });

  test('Initializing the focus', async () => {
    const myDispatch = jest.fn();
    await initFocus()(myDispatch);
    expect(myDispatch).toHaveBeenCalledTimes(2);

    expect(myDispatch).toHaveBeenNthCalledWith(1, { type: LOADING });

    const payload = {
      data: {
        name: 'Negba Road 7',
        city: 'Ramat Gan',
        country: 'Israel',
        longitude: 34.82329083642053,
        latitude: 32.07068481041871
      }
    };
    expect(myDispatch).toHaveBeenNthCalledWith(2, { type: SET_FOCUS, payload });
  });

  test('refreshing the markers', async () => {
    const myDispatch = jest.fn();
    await refreshMarkers()(myDispatch);
    expect(myDispatch).toHaveBeenCalledTimes(2);

    expect(myDispatch).toHaveBeenNthCalledWith(1, { type: LOADING });

    const payload = {
      data: []
    };
    expect(myDispatch).toHaveBeenNthCalledWith(2, { type: SET_MARKERS, payload });
  });

  test('set the focus', async () => {
    const focus = {
      name: 'Negba Road 7',
      city: 'Ramat Gan',
      country: 'Israel',
      longitude: 34.82329083642053,
      latitude: 32.07068481041871
    };
    const myDispatch = jest.fn();
    await setFocus(focus)(myDispatch);
    expect(myDispatch).toHaveBeenCalledTimes(2);

    expect(myDispatch).toHaveBeenNthCalledWith(1, { type: LOADING });
    const payload = {
      data: focus
    };

    expect(myDispatch).toHaveBeenNthCalledWith(2, { type: SET_FOCUS, payload });
  });

  test('remove a marker', async () => {
    const markers = ['124', '125'];
    const myDispatch = jest.fn();
    await removeMarker('123', markers)(myDispatch);
    expect(myDispatch).toHaveBeenNthCalledWith(1, { type: LOADING });
    expect(myDispatch).toHaveBeenCalledTimes(2);
    const payload = {
      data: markers
    };

    expect(myDispatch).toHaveBeenNthCalledWith(2, { type: SET_MARKERS, payload });
  });
});

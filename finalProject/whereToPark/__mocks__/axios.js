import { ENDPOINT } from '../constants';

class Axios {
  static async get(url) {
    if (url.includes(`${ENDPOINT}/user/`))
      return Promise.resolve({ data: { username: 'test', name: 'testing' } });
    if (url.includes(`${ENDPOINT}/pin/`)) return Promise.resolve({ data: [] });
  }
  static async delete() {
    return Promise.resolve({ data: 'Successfully deleted' });
  }
  static async put() {
    return Promise.resolve({ data: 'Successfully updated' });
  }
  static async post() {
    return Promise.resolve({ data: 'Successfully created' });
  }
}

export default Axios;

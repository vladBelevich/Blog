import axios from 'axios';

export default class Register {
  API = 'https://blog.kata.academy/api/';

  // eslint-disable-next-line consistent-return
  async registerUser(username, email, password) {
    try {
      return await axios({
        method: 'post',
        baseURL: this.API,
        url: 'users/',
        data: {
          user: {
            username,
            email,
            password,
          },
        },
      });
    } catch (e) {
      return e;
    }
  }
}

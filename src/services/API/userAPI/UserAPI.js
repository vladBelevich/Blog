import axios from 'axios';

export default class UserAPI {
  API = 'https://blog.kata.academy/api/';

  async loginUser(email, password) {
    try {
      return await axios({
        method: 'post',
        baseURL: this.API,
        url: 'users/login',
        data: {
          user: {
            email,
            password,
          },
        },
      });
    } catch (e) {
      return e;
    }
  }

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

  async editUser(username, email, password, image, token) {
    try {
      return await axios({
        method: 'put',
        baseURL: this.API,
        url: 'user/',
        headers: {
          Authorization: `Token ${token}`,
        },
        data: {
          user: {
            username,
            email,
            password,
            image,
          },
        },
      });
    } catch (e) {
      return e;
    }
  }
}

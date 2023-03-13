import axios from 'axios';

export default class ArticleAPI {
  API = 'https://blog.kata.academy/api/';

  async getArticles(offset) {
    const result = await axios.get(
      `${this.API}articles?offset=${offset}&limit=5`
    );
    return result.data;
  }

  async getArticle(slug) {
    const result = await axios.get(`${this.API}articles/${slug}`);
    return result.data;
  }

  async createArticle(title, description, body, tagList, token) {
    try {
      return await axios({
        method: 'post',
        baseURL: this.API,
        url: 'articles',
        headers: {
          Authorization: `Token ${token}`,
        },
        data: {
          article: {
            title,
            description,
            body,
            tagList,
          },
        },
      });
    } catch (e) {
      return e;
    }
  }
}

import axios from 'axios';

export default class ArticleGet {
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
}

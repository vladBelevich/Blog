import ArticleGet from '../../API/articleApi/ArticleAPI';

const ArticleApi = new ArticleGet();

export const setDataArticles = (data) => ({ type: 'SET_DATA_ARTICLES', data });
export const setDataArticle = (data) => ({
  type: 'SET_DATA_ARTICLE',
  data,
});

export const setUserData = (username, email, token) => {
  window.localStorage.setItem('username', username);
  window.localStorage.setItem('email', email);
  window.localStorage.setItem('token', token);
  window.localStorage.setItem('activeUser', 'true');
  return {
    type: 'SET_USER_DATA',
    username,
    email,
    token,
  };
};
export const setUserDataFromLocal = (username, email, token, image) => ({
  type: 'SET_USER_DATA_FROM_LOCAL',
  username,
  email,
  token,
  image,
});

export const editUserData = (username, email, token, image) => {
  window.localStorage.setItem('username', username);
  window.localStorage.setItem('email', email);
  window.localStorage.setItem('token', token);
  window.localStorage.setItem('image', image);
  window.localStorage.setItem('activeUser', 'true');
  return {
    type: 'EDIT_USER_DATA',
    username,
    email,
    token,
    image,
  };
};
export const clearUserData = () => {
  window.localStorage.clear();
  return {
    type: 'CLEAR_USER_DATA',
  };
};

export const setPage = (pageNumber) => {
  const offset = pageNumber * 5 - 5;
  return { type: 'SET_OFFSET_NUMBER', offset };
};

export const setLoadingArticle = () => ({ type: 'SET_LOADING_ARTICLE' });

export const getArticleData = (slug) => async (dispatch) => {
  try {
    const data = await ArticleApi.getArticle(slug);
    dispatch(setDataArticle(data.article));
  } catch (e) {
    // eslint-disable-next-line
    console.log('Cant load Data');
  }
};

export const getArticlesData = (offset) => async (dispatch) => {
  try {
    const data = await ArticleApi.getArticles(offset);
    dispatch(setDataArticles(data));
  } catch (e) {
    // eslint-disable-next-line
    console.log('Cant load Data');
  }
};

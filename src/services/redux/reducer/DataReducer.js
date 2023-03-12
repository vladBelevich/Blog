const defaultState = {
  articlesData: [],
  offset: 0,
  loadingArticles: true,
  loadingArticle: true,
  articlesCount: 0,
  articleData: { author: {}, tagList: [] },
};

// eslint-disable-next-line
const dataReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_DATA_ARTICLES':
      return {
        ...state,
        articlesData: action.data.articles,
        loadingArticles: false,
        articlesCount: action.data.articlesCount,
      };
    case 'SET_OFFSET_NUMBER': {
      return {
        ...state,
        loadingArticles: true,
        offset: action.offset,
      };
    }
    case 'SET_LOADING_ARTICLE': {
      return {
        ...state,
        loadingArticle: true,
      };
    }
    case 'SET_DATA_ARTICLE': {
      return {
        ...state,
        articleData: action.data,
        loadingArticle: false,
      };
    }
    default:
      return state;
  }
};

export default dataReducer;

import classes from './ArticleList.module.scss';
import ArticlePreview from '../articlePreview';
import PaginationForArticles from '../pagination';
import * as actions from '../../services/redux/actions/Actions';
import LoadingSpinner from '../loadingSpinner';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function ArticleList({
  articlesData,
  getArticlesData,
  loadingArticles,
  offset,
  articlesCount,
}) {
  useEffect(() => {
    getArticlesData(offset, loadingArticles);
    // eslint-disable-next-line
  }, [offset,loadingArticles]);

  const articles = articlesData.map((el) => (
    <ArticlePreview
      viewNumber={articlesData.indexOf(el)}
      data={el}
      key={uuidv4()}
    />
  ));
  const loadingView = loadingArticles ? <LoadingSpinner /> : null;
  return (
    <div className={classes.articleList_wrapper}>
      {articles}
      {loadingView}
      <PaginationForArticles articlesCount={articlesCount} />
    </div>
  );
}

const mapStateToProps = (state) => {
  const { articlesData, offset, loadingArticles, articlesCount } =
    state.dataReducer;
  return {
    articlesData,
    offset,
    loadingArticles,
    articlesCount,
  };
};

export default connect(mapStateToProps, actions)(ArticleList);

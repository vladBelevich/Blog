import LikeButton from './LikeButton';
import ArticleAPI from '../../services/API/articleApi/ArticleAPI';
import * as actions from '../../services/redux/actions/Actions';
import { connect } from 'react-redux';

function LikeButtonOnPreview({
  favorited,
  activeUser,
  favoritesCount,
  slug,
  token,
  viewNumber,
  setLikeOnPreview,
  articlesData,
}) {
  const ArticleNetwork = new ArticleAPI();

  const toLike = async (slugStr, tokenValue, isFavorited, viewNumberValue) => {
    const result = await ArticleNetwork.setLike(
      slugStr,
      tokenValue,
      isFavorited
    );
    if (result.status === 200) {
      const newArticle = result.data.article;
      const copyOfArticles = [...articlesData];
      copyOfArticles[viewNumberValue] = newArticle;
      setLikeOnPreview(copyOfArticles);
    } else {
      // eslint-disable-next-line
      console.log(result);
    }
  };

  return (
    <LikeButton
      favorited={favorited}
      activeUser={activeUser}
      favoritesCount={favoritesCount}
      onClickFunction={() => toLike(slug, token, favorited, viewNumber)}
    />
  );
}

const mapStateToProps = (state) => {
  const { articlesData } = state.dataReducer;
  return {
    articlesData,
  };
};

export default connect(mapStateToProps, actions)(LikeButtonOnPreview);

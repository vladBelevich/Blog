import LikeButton from './LikeButton';
import ArticleAPI from '../../services/API/articleApi/ArticleAPI';
import * as actions from '../../services/redux/actions/Actions';
import { connect } from 'react-redux';

function LikeButtonOnFull({
  favoritesCount,
  favorited,
  activeUser,
  slug,
  token,
  setLikeOnFull,
}) {
  const ArticleNetwork = new ArticleAPI();

  const toLike = async (slugStr, tokenValue, isFavorited) => {
    const result = await ArticleNetwork.setLike(
      slugStr,
      tokenValue,
      isFavorited
    );
    if (result.status === 200) {
      const newArticle = result.data.article;
      setLikeOnFull(newArticle);
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
      onClickFunction={() => toLike(slug, token, favorited)}
    />
  );
}

export default connect(null, actions)(LikeButtonOnFull);

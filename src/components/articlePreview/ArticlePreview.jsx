import classes from './ArticlePreview.module.scss';
import * as actions from '../../services/redux/actions/Actions';
import LikeButtonOnPreview from '../likeButton/LikeButtonOnPreview';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ArticlePreview({
  data,
  setLoadingArticle,
  activeUser,
  token,
  viewNumber,
}) {
  const [dataArticle, setDataArticle] = useState(data);
  const createdAt = format(new Date(dataArticle.createdAt), 'MMMM d, y');
  const { author, description, favorited, slug, title, favoritesCount } =
    dataArticle;
  const { image, username } = author;
  const tagListView = dataArticle.tagList.map((el) => (
    <div className={classes.tag_text} key={uuidv4()}>
      {el}
    </div>
  ));
  // eslint-disable-next-line
  useEffect(() => setDataArticle(data), [image]);
  return (
    <div className={classes.articlePreview_wrapper}>
      <div className={classes.label}>
        <div className={classes.title_wrapper}>
          <button
            type='button'
            onClick={() => setLoadingArticle()}
            className={classes.title_text}
          >
            <Link to={`articles/${slug}`}>{title}</Link>
          </button>
          <LikeButtonOnPreview
            favoritesCount={favoritesCount}
            favorited={favorited}
            activeUser={activeUser}
            slug={slug}
            token={token}
            viewNumber={viewNumber}
          />
        </div>
        <div className={classes.tag_wrapper}>{tagListView}</div>
        <div className={classes.description_wrapper}>{description}</div>
      </div>
      <div className={classes.profile}>
        <div className={classes.profile_data}>
          <p className={classes.profile_name}>{username}</p>
          <p className={classes.profile_date}>{createdAt}</p>
        </div>
        <div className={classes.profile_avatar}>
          <img src={image} className={classes.avatar_image} alt='avatar' />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { loadingArticle } = state.dataReducer;
  const { activeUser, token } = state.userReducer;
  return { loadingArticle, activeUser, token };
};

export default connect(mapStateToProps, actions)(ArticlePreview);

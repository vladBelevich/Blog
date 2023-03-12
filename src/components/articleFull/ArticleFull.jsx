import classes from './ArticleFull.module.scss';
import * as actions from '../../services/redux/actions/Actions';
import unliked from '../../services/style/Icons/Unliked.svg';
import liked from '../../services/style/Icons/Liked.svg';
import LoadingSpinner from '../loadingSpinner';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

function ArticleFull({ slug, loadingArticle, articleData, getArticleData }) {
  useEffect(
    () => {
      async function getData(id) {
        await getArticleData(id);
      }
      getData(slug);
    },
    // eslint-disable-next-line
    []
  );

  let createdAt;
  if (articleData.createdAt) {
    createdAt = format(new Date(articleData.createdAt), 'MMMM d, y');
  }

  // const updatedAt = format(new Date(articleData.updatedAt), 'MMMM d, y');
  const { author, description, favorited, favoritesCount, title, body } =
    articleData;
  const { image, username } = author;
  const tagListView = articleData.tagList.map((el) => (
    <div className={classes.tag_text} key={uuidv4()}>
      {el}
    </div>
  ));
  const likeSrc = favorited ? unliked : liked;
  const articleView = !loadingArticle ? (
    <div className={classes.articleFull_wrapper}>
      <div className={classes.label}>
        <div className={classes.title_wrapper}>
          <div className={classes.title_text}>{title}</div>
          <div className={classes.title_likes}>
            <img className={classes.title_like} src={likeSrc} alt='likes' />
            {favoritesCount}
          </div>
        </div>
        <div className={classes.tag_wrapper}>{tagListView}</div>
        <div className={classes.description_wrapper}>{description}</div>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
      <div className={classes.profile}>
        <div className={classes.profile_data}>
          <div className={classes.profile_name}>{username}</div>
          <div className={classes.profile_date}>{createdAt}</div>
        </div>
        <div className={classes.profile_avatar}>
          <img src={image} className={classes.avatar_image} alt='avatar' />
        </div>
      </div>
    </div>
  ) : null;
  const loadingView = loadingArticle ? <LoadingSpinner /> : null;
  return (
    <div>
      {loadingView}
      {articleView}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { articleData, loadingArticle } = state.dataReducer;
  return { articleData, loadingArticle };
};

export default connect(mapStateToProps, actions)(ArticleFull);

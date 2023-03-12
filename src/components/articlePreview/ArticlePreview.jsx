import classes from './ArticlePreview.module.scss';
import unliked from '../../services/style/Icons/Unliked.svg';
import liked from '../../services/style/Icons/Liked.svg';
import * as actions from '../../services/redux/actions/Actions';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function ArticlePreview({ data, setLoadingArticle }) {
  // console.log(data);
  const createdAt = format(new Date(data.createdAt), 'MMMM d, y');
  // const updatedAt = format(new Date(data.updatedAt), 'MMMM d, y');
  const { author, description, favorited, favoritesCount, slug, title } = data;
  const { image, username } = author;
  const tagListView = data.tagList.map((el) => (
    <div className={classes.tag_text} key={uuidv4()}>
      {el}
    </div>
  ));
  const likeSrc = favorited ? unliked : liked;

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
          <div className={classes.title_likes}>
            <img className={classes.title_like} src={likeSrc} alt='likes' />
            {favoritesCount}
          </div>
        </div>
        <div className={classes.tag_wrapper}>{tagListView}</div>
        <div className={classes.description_wrapper}>{description}</div>
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
  );
}

const mapStateToProps = (state) => {
  const { loadingArticle } = state.dataReducer;
  return { loadingArticle };
};

export default connect(mapStateToProps, actions)(ArticlePreview);

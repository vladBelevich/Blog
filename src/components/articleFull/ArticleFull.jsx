import classes from './ArticleFull.module.scss';
import * as actions from '../../services/redux/actions/Actions';
import unliked from '../../services/style/Icons/Unliked.svg';
import liked from '../../services/style/Icons/Liked.svg';
import LoadingSpinner from '../loadingSpinner';
import ArticleAPI from '../../services/API/articleApi/ArticleAPI';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { Button, Popconfirm } from 'antd';
import { useHistory } from 'react-router-dom';

function ArticleFull({
  username,
  slug,
  loadingArticle,
  articleData,
  getArticleData,
  token,
}) {
  useEffect(() => {
    async function getData(id) {
      await getArticleData(id);
    }
    getData(slug);
    // eslint-disable-next-line
  }, [slug]);

  const history = useHistory();

  const ArticleNet = new ArticleAPI();

  const editPanel = (
    <div className={classes.editPanelWrapper}>
      <Popconfirm
        title='Are you sure to delete this article?'
        placement='rightTop'
        onConfirm={async () => {
          const result = await ArticleNet.deleteArticle(slug, token);
          if (result.status === 204) {
            history.push('/articles');
          } else {
            // eslint-disable-next-line
            console.log(result);
          }
        }}
      >
        <Button danger>Delete</Button>
      </Popconfirm>

      <Button
        onClick={() => {
          history.push({
            pathname: `${slug}/edit`,
            state: { articleData, slug },
          });
        }}
        className={classes.edit}
        colorPrimaryActive='#ff4d4f'
      >
        Edit
      </Button>
    </div>
  );

  let createdAt;
  if (articleData.createdAt) {
    createdAt = format(new Date(articleData.createdAt), 'MMMM d, y');
  }
  const {
    author,
    description,
    favorited,
    favoritesCount,
    title,
    body,
    tagList,
  } = articleData;
  const { image, username: authorUsername } = author;
  const tagListView = tagList.map((el) => (
    <div className={classes.tag_text} key={uuidv4()}>
      {el}
    </div>
  ));
  const editPanelView = username === authorUsername ? editPanel : null;
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
        <div className={classes.profileWrapper}>
          <div className={classes.profile_data}>
            <div className={classes.profile_name}>{authorUsername}</div>
            <div className={classes.profile_date}>{createdAt}</div>
          </div>
          <div className={classes.profile_avatar}>
            <img src={image} className={classes.avatar_image} alt='avatar' />
          </div>
        </div>
        {editPanelView}
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
  const { username, token } = state.userReducer;
  return { username, articleData, loadingArticle, token };
};

export default connect(mapStateToProps, actions)(ArticleFull);

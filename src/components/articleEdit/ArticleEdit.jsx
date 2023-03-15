import ArticleChange from '../articleChange/ArticleChange';
import * as actions from '../../services/redux/actions/Actions';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';

function ArticleEdit({ location, token, activeUser }) {
  const { body, description, title } = location.state.articleData;
  const slug = location.state.slug;
  const tagList = location.state.articleData.tagList.map((el) => {
    const key = uuidv4();
    return { key, tag: el };
  });
  return (
    <ArticleChange
      title={title}
      shortDescription={description}
      text={body}
      editing
      token={token}
      activeUser={activeUser}
      tags={tagList}
      slug={slug}
    />
  );
}

const mapStateToProps = (state) => {
  const { token, activeUser } = state.userReducer;
  return { token, activeUser };
};

export default connect(mapStateToProps, actions)(ArticleEdit);

import * as actions from '../../services/redux/actions/Actions';
import ArticleChange from '../articleChange/ArticleChange';
import { connect } from 'react-redux';

function ArticleCreate({ token, activeUser }) {
  return (
    <ArticleChange
      title=''
      shortDescription=''
      text=''
      editing={false}
      token={token}
      activeUser={activeUser}
      tags={[]}
      slug=''
    />
  );
}

const mapStateToProps = (state) => {
  const { token, activeUser } = state.userReducer;
  return { token, activeUser };
};

export default connect(mapStateToProps, actions)(ArticleCreate);

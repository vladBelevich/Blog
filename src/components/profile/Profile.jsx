import classes from './Profile.module.scss';
import avatar from '../../services/style/Icons/Avatar.svg';
import * as actions from '../../services/redux/actions/Actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Profile({ username, clearUserData, image }) {
  const avatarSRC = image || avatar;
  return (
    <div className={classes.wrapper}>
      <Link to='/new-article'>
        <button className={classes.buttonCreate} type='button'>
          Create article
        </button>
      </Link>
      <Link to='/profile'>
        <div className={classes.profile}>
          <span>{username}</span>
          <img alt='avatar' src={avatarSRC} />
        </div>
      </Link>
      <button
        onClick={() => clearUserData()}
        className={classes.button}
        type='button'
      >
        Log Out
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { username, image } = state.userReducer;
  return {
    username,
    image,
  };
};

export default connect(mapStateToProps, actions)(Profile);

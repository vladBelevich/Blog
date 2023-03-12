import classes from './Header.module.scss';
import Logo from '../logo';
import AuthorizationPanel from '../authorizationPanel';
import Profile from '../profile';
import { connect } from 'react-redux';

function Header({ activeUser }) {
  const profileView = activeUser ? <Profile /> : <AuthorizationPanel />;
  return (
    <div className={classes.header_wrapper}>
      <Logo />
      {profileView}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { activeUser } = state.userReducer;
  return {
    activeUser,
  };
};

export default connect(mapStateToProps)(Header);

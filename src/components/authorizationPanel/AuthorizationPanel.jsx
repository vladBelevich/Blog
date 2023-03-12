import classes from './AuthorizationPanel.module.scss';
import { Link } from 'react-router-dom';

function AuthorizationPanel() {
  return (
    <div className={classes.authorizationPanel_wrapper}>
      <Link to='/sign-in'>
        <button className={classes.signInButton} type='button'>
          Sign In
        </button>
      </Link>
      <Link to='sign-up'>
        <button className={classes.signUpButton} type='button'>
          Sign up
        </button>
      </Link>
    </div>
  );
}

export default AuthorizationPanel;

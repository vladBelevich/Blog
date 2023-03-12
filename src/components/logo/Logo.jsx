import classes from './Logo.module.scss';
import * as actions from '../../services/redux/actions/Actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Logo({ setPage }) {
  return (
    <div className={classes.logo_wrapper}>
      <Link to='/'>
        <button type='button' onClick={() => setPage(1)}>
          Realworld Blog
        </button>
      </Link>
    </div>
  );
}

export default connect(null, actions)(Logo);

import classes from '../style/Account.module.scss';
import UserAPI from '../../../services/API/userAPI/UserAPI';
import * as actions from '../../../services/redux/actions/Actions';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

function AccountLogin({ setUserData }) {
  const [invalidData, setInvalidData] = useState(false);

  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
    watch,
  } = useForm({ mode: 'onBlur' });

  const LoginAPI = new UserAPI();

  const history = useHistory();

  const invalidDataMessage = invalidData ? (
    <p className={classes.errorMessage}>Email or password is invalid</p>
  ) : null;

  useEffect(() => {
    const subscription = watch(() => {
      setInvalidData(false);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line
  }, [watch, invalidData]);

  const onSubmit = async (data) => {
    const { email, password } = data;
    const result = await LoginAPI.loginUser(email, password);
    // eslint-disable-next-line
    console.log(result);
    if (result.status === 200) {
      const responseEmail = result.data.user.email;
      const responseUsername = result.data.user.username;
      const responseToken = result.data.user.token;
      setUserData(responseUsername, responseEmail, responseToken);
      history.push('/articles');
    } else if (result.response.status === 422) {
      setInvalidData(true);
    }
  };

  return (
    <div className={classes.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.block}>
          <div className={classes.titleWrapper}>
            <h3 className={classes.titleText}>Sign In</h3>
          </div>
          <div className={classes.wrapperInput}>
            <label>
              Edit Profile
              <input
                type='email'
                placeholder='Email Address'
                className={classNames({ [classes.error]: errors.email })}
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...register('email', {
                  required: 'Input must be filled',
                  pattern: {
                    value:
                      /([a-z0/d_-]+\.)*[a-z/d_-]+@[a-z/d_-]+(\.[a-z/d_-]+)*\.[a-z]{2,6}/,
                    message: 'Invalid mail address',
                  },
                })}
              />
              <div className={classes.errorMessage}>
                {errors?.email && <p>{errors?.email?.message || 'Error!'}</p>}
              </div>
            </label>
          </div>
          <div className={classes.wrapperInput}>
            <label>
              Password
              <input
                type='password'
                placeholder='Password'
                className={classNames({ [classes.error]: errors.password })}
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...register('password', {
                  required: 'Input must be filled',
                  minLength: {
                    value: 6,
                    message: 'At least 6 symbols',
                  },
                  maxLength: {
                    value: 40,
                    message: 'Max 60 symbols',
                  },
                  pattern: {
                    value: /(?=.*\d)(?=.*[a-z])/g,
                    message: 'Use only numbers and latin letters',
                  },
                })}
              />
              <div className={classes.errorMessage}>
                {errors?.password && (
                  <p>{errors?.password?.message || 'Error!'}</p>
                )}
              </div>
              {invalidDataMessage}
            </label>
          </div>
          <div className={classes.buttonWrapper}>
            <button
              disabled={!isValid}
              className={classes.button}
              type='submit'
            >
              Login
            </button>
          </div>
          <div className={classes.footer}>
            <span>
              Don’t have an account? <Link to='/sign-up'>Sign Up.</Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default connect(null, actions)(AccountLogin);

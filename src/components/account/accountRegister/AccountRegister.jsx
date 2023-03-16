import classes from '../style/Account.module.scss';
import * as actions from '../../../services/redux/actions/Actions';
import UserAPI from '../../../services/API/userAPI/UserAPI';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

function AccountRegister({ setUserData }) {
  const Register = new UserAPI();

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const history = useHistory();

  const usernameErrorView = usernameError ? (
    <p className={classes.errorMessage}>This name is already used</p>
  ) : null;
  const emailErrorView = emailError ? (
    <p className={classes.errorMessage}>This email is already used</p>
  ) : null;

  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
    watch,
  } = useForm({ mode: 'onBlur' });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'username' && type === 'change') {
        setUsernameError(false);
      }
      if (name === 'email' && type === 'change') {
        setEmailError(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, usernameError, emailError]);

  const onSubmit = async (data) => {
    const { username, email, password } = data;
    const result = await Register.registerUser(username, email, password);
    if (result.status === 200) {
      const responseEmail = result.data.user.email;
      const responseUsername = result.data.user.username;
      const responseToken = result.data.user.token;
      setUserData(responseUsername, responseEmail, responseToken);
      history.push('/articles');
    } else if (result.response.status === 422) {
      const responseErrors = result.response.data.errors;
      if (responseErrors.username) {
        setUsernameError(true);
      }
      if (responseErrors.email) {
        setEmailError(true);
      }
    }
  };

  return (
    <div className={classes.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.block}>
          <div className={classes.titleWrapper}>
            <h3 className={classes.titleText}>Create new account</h3>
          </div>
          <div className={classes.wrapperInput}>
            <label>
              Username
              <input
                className={classNames({ [classes.error]: errors.username })}
                type='text'
                placeholder='Username'
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...register('username', {
                  required: 'Input must be filled',
                  minLength: {
                    value: 3,
                    message: 'At least 3 symbols',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Max 20 symbols',
                  },
                  pattern: {
                    value: /[A-Za-z\d]{3}/,
                    message: 'Only English letters and numbers',
                  },
                })}
              />
              <div className={classes.errorMessage}>
                {usernameErrorView}
                {errors?.username && (
                  <p>{errors?.username?.message || 'Error!'}</p>
                )}
              </div>
            </label>
          </div>
          <div className={classes.wrapperInput}>
            <label>
              Email Address
              <input
                type='email'
                placeholder='Email Address'
                className={classNames({ [classes.error]: errors.email })}
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...register('email', {
                  required: 'Input must be filled',
                  pattern: {
                    value:
                      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                    message: 'Invalid mail address',
                  },
                })}
              />
              <div className={classes.errorMessage}>
                {emailErrorView}
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
            </label>
          </div>
          <div className={classes.wrapperInput}>
            <label>
              Repeat Password
              <input
                type='password'
                placeholder='Repeat Password'
                className={classNames({
                  [classes.error]: errors.repeatPassword,
                })}
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...register('repeatPassword', {
                  required: 'Input must be filled',
                  minLength: {
                    value: 6,
                    message: 'At least 6 symbols',
                  },
                  maxLength: {
                    value: 40,
                    message: 'Max 60 symbols',
                  },
                  // eslint-disable-next-line
                  validate: {
                    value: (value, formValues) =>
                      value === formValues.password || 'Passwords must match',
                  },
                })}
              />
              <div className={classes.errorMessage}>
                {errors?.repeatPassword && (
                  <p>{errors?.repeatPassword?.message}</p>
                )}
              </div>
            </label>
          </div>
          <div className={classes.checkboxWrapper}>
            <input
              className={classes.checkboxCustom}
              type='checkbox'
              id='agreePersInfo'
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...register('checkedPersonalInfo', {
                required: true,
              })}
            />
            <label htmlFor='agreePersInfo'>
              I agree to the processing of my personal information
            </label>
          </div>
          <div className={classes.buttonWrapper}>
            <button
              disabled={!isValid}
              className={classes.button}
              type='submit'
            >
              Create
            </button>
          </div>
          <div className={classes.footer}>
            <span>
              Already have an account? <Link to='/sign-in'>Sign In.</Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default connect(null, actions)(AccountRegister);

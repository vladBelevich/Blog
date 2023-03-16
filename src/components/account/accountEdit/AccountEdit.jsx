import classes from '../style/Account.module.scss';
import UserAPI from '../../../services/API/userAPI/UserAPI';
import * as actions from '../../../services/redux/actions/Actions';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

function AccountEdit({ token, editUserData }) {
  const Editing = new UserAPI();

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
    formState: { errors, isValid },
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
    const { username, email, password, image } = data;
    const result = await Editing.editUser(
      username,
      email,
      password,
      image,
      token
    );
    if (result.status === 200) {
      const responseEmail = result.data.user.email;
      const responseUsername = result.data.user.username;
      const responseToken = result.data.user.token;
      const responseImage = result.data.user.image;
      editUserData(
        responseUsername,
        responseEmail,
        responseToken,
        responseImage
      );
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
            <h3 className={classes.titleText}>Edit Profile</h3>
          </div>
          <div className={classes.wrapperInput}>
            <label>
              Username
              <input
                className={classNames({ [classes.error]: errors.username })}
                type='text'
                placeholder='New username'
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
                placeholder='New email address'
                className={classNames({ [classes.error]: errors.email })}
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...register('email', {
                  required: 'Email must be filled',
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
              New Password
              <input
                type='password'
                placeholder='New password'
                className={classNames({ [classes.error]: errors.password })}
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...register('password', {
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
              Avatar image (url)
              <input
                type='text'
                placeholder='Avatar image'
                className={classNames({
                  [classes.error]: errors.repeatPassword,
                })}
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...register('image', {
                  required: 'Image URL must be filled',
                  pattern: {
                    value:
                      /* eslint-disable-next-line */
                      /^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/,
                    message: 'URL is invalid',
                  },
                })}
              />
              <div className={classes.errorMessage}>
                {errors?.image && <p>{errors?.image?.message}</p>}
              </div>
            </label>
          </div>
          <div className={classes.buttonWrapper}>
            <button
              disabled={!isValid}
              className={classes.button}
              type='submit'
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { token } = state.userReducer;
  return {
    token,
  };
};

export default connect(mapStateToProps, actions)(AccountEdit);

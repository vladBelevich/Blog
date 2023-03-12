import classes from './ArticleCreate.module.scss';
import UserAPI from '../../services/API/registerAPI/Register';
import * as actions from '../../services/redux/actions/Actions';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

function ArticleCreate({ setUserData }) {
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

  const [tags, setTags] = useState([]);
  function deleteTag(key) {
    let newArr = [...tags];
    // eslint-disable-next-line
    console.log(key);
    newArr = newArr.filter((el) => {
      console.log(el.key);
      return el.key !== key;
    });
    // eslint-disable-next-line
    console.log(newArr);
    setTags(newArr);
  }
  function addTag() {
    let newArr = [...tags];
    const key = uuidv4();
    newArr = [
      <div
        key={key}
        className={classNames(classes.tagControl, classes.tagInputs)}
      >
        <input
          placeholder='Tag'
          className={classNames(classes.text, {
            // eslint-disable-next-line no-undef
            [classes.error]: errors.tag,
          })}
          /* eslint-disable-next-line react/jsx-props-no-spreading,no-undef */
          {...register('tag', {
            maxLength: {
              value: 50,
              message: 'Max 50 symbols',
            },
          })}
        />
        <button
          onClick={() => {
            deleteTag(key);
          }}
          className={classes.delete}
          type='button'
        >
          Delete
        </button>
      </div>,
      ...newArr,
    ];
    setTags(newArr);
  }

  // const deleteItem = (id, array) => array.filter((el) => el.key !== id);

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
            <h3 className={classes.titleText}>Create new article</h3>
          </div>
          <div className={classes.wrapperInput}>
            <label>
              Title
              <input
                className={classNames({ [classes.error]: errors.username })}
                type='text'
                placeholder='Title'
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...register('title', {
                  required: 'Input must be filled',
                  maxLength: {
                    value: 100,
                    message: 'Max 100 symbols',
                  },
                })}
              />
              <div className={classes.errorMessage}>
                {usernameErrorView}
                {errors?.title && <p>{errors?.title?.message || 'Error!'}</p>}
              </div>
            </label>
          </div>
          <div className={classes.wrapperInput}>
            <label>
              Short description
              <input
                type='text'
                placeholder='Title'
                className={classNames({ [classes.error]: errors.email })}
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...register('shortDescription', {
                  required: 'Input must be filled',
                  maxLength: {
                    value: 700,
                    message: 'Max 700 symbols',
                  },
                })}
              />
              <div className={classes.errorMessage}>
                {emailErrorView}
                {errors?.shortDescription && (
                  <p>{errors?.shortDescription?.message || 'Error!'}</p>
                )}
              </div>
            </label>
          </div>
          <div className={classes.wrapperInput}>
            <label>
              Text
              <textarea
                placeholder='Text'
                className={classNames(classes.text, {
                  [classes.error]: errors.text,
                })}
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...register('text', {
                  required: 'Input must be filled',
                  maxLength: {
                    value: 5000,
                    message: 'Max 5000 symbols',
                  },
                })}
              />
              <div className={classes.errorMessage}>
                {errors?.text && <p>{errors?.text?.message || 'Error!'}</p>}
              </div>
            </label>
          </div>

          <div className={classes.tagCreation}>
            <label>
              Tags
              <div className={classes.tagInputs}>
                {tags}
                <button onClick={addTag} className={classes.add} type='button'>
                  Add tag
                </button>
              </div>
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

export default connect(null, actions)(ArticleCreate);

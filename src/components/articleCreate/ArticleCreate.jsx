import classes from './ArticleCreate.module.scss';
import ArticleAPI from '../../services/API/articleApi/ArticleAPI';
import * as actions from '../../services/redux/actions/Actions';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

function ArticleCreate({ token, activeUser }) {
  const ArticleCreator = new ArticleAPI();

  const [tagKeys, setTagKeys] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (!activeUser) {
      history.push('/sign-in');
    }
    // eslint-disable-next-line
  }, [activeUser]);

  const {
    register,
    resetField,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur' });

  const handleClick = (name) => resetField(name);
  function deleteTag(key) {
    setTagKeys((prevState) => {
      const copyTagsKeys = [...prevState];
      handleClick(`tag${key}`);
      return copyTagsKeys.filter((el) => el !== key);
    });
  }

  const tagList = tagKeys.map((el) => (
    <div key={el} className={classNames(classes.tagControl)}>
      <div className={classes.tagInputs}>
        <input
          placeholder='Tag'
          className={classNames(classes.text, {
            [classes.error]: errors[`tag${el}`],
          })}
          /* eslint-disable-next-line react/jsx-props-no-spreading,no-undef */
          {...register(`tag${el}`, {})}
        />
        <button
          onClick={() => {
            deleteTag(el);
          }}
          className={classes.delete}
          type='button'
        >
          Delete
        </button>
      </div>
    </div>
  ));

  function addTag() {
    const newKey = uuidv4();
    setTagKeys([newKey, ...tagKeys]);
  }

  const onSubmit = async (data) => {
    const { title, shortDescription, text, ...tagsData } = data;
    const tags = Object.values(tagsData).filter((el) => el !== undefined);
    const result = await ArticleCreator.createArticle(
      title,
      shortDescription,
      text,
      tags,
      token
    );
    if (result.status === 200) {
      history.push('/articles');
    } else if (result.response.status !== 200) {
      const responseErrors = result.response.data.errors;
      // eslint-disable-next-line
      console.log(responseErrors);
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
                className={classNames({ [classes.error]: errors.title })}
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
                className={classNames({
                  [classes.error]: errors.shortDescription,
                })}
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
            <p>Tags</p>
            <div className={classes.tagInputs}>
              {tagList}
              <button
                onClick={() => addTag()}
                className={classes.add}
                type='button'
              >
                Add tag
              </button>
            </div>
          </div>
          <div className={classes.buttonWrapper}>
            <button disabled={!isValid} type='submit'>
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { token, activeUser } = state.userReducer;
  return { token, activeUser };
};

export default connect(mapStateToProps, actions)(ArticleCreate);

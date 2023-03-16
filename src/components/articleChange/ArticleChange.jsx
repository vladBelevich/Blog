import classes from './ArticleChange.module.scss';
import ArticleAPI from '../../services/API/articleApi/ArticleAPI';
import * as actions from '../../services/redux/actions/Actions';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

function ArticleChange({
  title,
  shortDescription,
  text,
  editing,
  token,
  slug,
  activeUser,
  tags,
}) {
  const ArticleCreator = new ArticleAPI();

  const [tagList, setTagList] = useState(tags);
  const history = useHistory();
  const {
    register,
    resetField,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      titleForm: title,
      shortDescriptionForm: shortDescription,
      textForm: text,
    },
  });

  useEffect(() => {
    if (!activeUser) {
      history.push('/sign-in');
    }
    // eslint-disable-next-line
  }, [activeUser]);

  const resetFieldData = (name) => resetField(name);

  function deleteTag(key) {
    setTagList((prevState) => {
      const copyTags = [...prevState];
      resetFieldData(`tag${key}`);
      return copyTags.filter((el) => el.key !== key);
    });
  }

  function addTag() {
    const newTag = { key: uuidv4(), tag: '' };
    setTagList([newTag, ...tagList]);
  }

  const tagListView = tagList.map((el) => (
    <div key={el.key} className={classNames(classes.tagControl)}>
      <div className={classes.tagInputs}>
        <input
          placeholder='Tag'
          className={classNames(classes.text, {
            [classes.error]: errors[`tag${el.key}`],
          })}
          /* eslint-disable-next-line react/jsx-props-no-spreading,no-undef */
          {...register(`tag${el.key}`, {
            value: el.tag,
          })}
        />
        <button
          onClick={() => {
            deleteTag(el.key);
          }}
          className={classes.delete}
          type='button'
        >
          Delete
        </button>
      </div>
    </div>
  ));

  const onSubmit = async (data) => {
    const { titleForm, shortDescriptionForm, textForm, ...tagsData } = data;
    const tagsArr = Object.values(tagsData).filter((el) => el !== undefined);
    if (editing) {
      const resultEditing = await ArticleCreator.editArticle(
        titleForm,
        shortDescriptionForm,
        textForm,
        tagsArr,
        slug,
        token
      );
      if (resultEditing.status === 200) {
        history.push('/articles');
      } else if (resultEditing.response.status !== 200) {
        // eslint-disable-next-line
        console.log(resultEditing);
      }
    } else {
      const resultCreating = await ArticleCreator.createArticle(
        titleForm,
        shortDescriptionForm,
        textForm,
        tagsArr,
        token
      );
      if (resultCreating.status === 200) {
        history.push('/articles');
      } else if (resultCreating.response.status !== 200) {
        // eslint-disable-next-line
        console.log(resultCreating);
      }
    }
  };

  const titleName = editing ? 'Edit article' : 'Create new article';

  return (
    <div className={classes.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.block}>
          <div className={classes.titleWrapper}>
            <h3 className={classes.titleText}>{titleName}</h3>
          </div>
          <div className={classes.wrapperInput}>
            <label>
              Title
              <input
                className={classNames({ [classes.error]: errors.title })}
                type='text'
                placeholder='Title'
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...register('titleForm', {
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
                {...register('shortDescriptionForm', {
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
                {...register('textForm', {
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
              {tagListView}
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

export default connect(null, actions)(ArticleChange);

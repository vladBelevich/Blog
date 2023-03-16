import classes from './LikeButton.module.scss';
import unliked from '../../services/style/Icons/Unliked.svg';
import liked from '../../services/style/Icons/Liked.svg';

function LikeButton({
  favorited,
  activeUser,
  favoritesCount,
  onClickFunction,
}) {
  const likeSrc = favorited ? unliked : liked;
  return (
    <div className={classes.title_likes}>
      <button disabled={!activeUser} type='button' onClick={onClickFunction}>
        <img className={classes.title_like} src={likeSrc} alt='likes' />
      </button>
      {favoritesCount}
    </div>
  );
}

export default LikeButton;

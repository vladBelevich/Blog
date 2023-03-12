import classes from './LoadingSpinner.module.scss';
import { Spin } from 'antd';

function LoadingSpinner() {
  return (
    <div className={classes.loadingSpinner_wrapper}>
      <Spin size='large' />
    </div>
  );
}

export default LoadingSpinner;

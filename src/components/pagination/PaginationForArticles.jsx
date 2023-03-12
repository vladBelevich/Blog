import classes from './PaginationForArticles.module.scss';
import * as actions from '../../services/redux/actions/Actions';
import { Pagination } from 'antd';
import { connect } from 'react-redux';

function PaginationForArticles({ offset, articlesCount, setPage }) {
  const show = true;
  const page = offset / 5 + 1;
  return (
    <div className={classes.paginationForArticles_wrapper}>
      <Pagination
        current={page}
        total={articlesCount}
        defaultPageSize='5'
        showQuickJumper={!show}
        hideOnSinglePage
        showSizeChanger={!show}
        onChange={(number) => setPage(number)}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  const { offset } = state.dataReducer;
  return {
    offset,
  };
};

export default connect(mapStateToProps, actions)(PaginationForArticles);

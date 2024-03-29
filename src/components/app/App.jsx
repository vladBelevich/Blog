import Header from '../header';
import ArticleList from '../articleList';
import ArticleFull from '../articleFull';
import AccountRegister from '../account/accountRegister';
import AccountLogin from '../account/accountLogin';
import AccountEdit from '../account/accountEdit';
import * as actions from '../../services/redux/actions/Actions';
import ArticleCreate from '../articleCreate';
import ArticleEdit from '../articleEdit';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useEffect } from 'react';
import { connect } from 'react-redux';

function App({ setUserDataFromLocal }) {
  useEffect(() => {
    const localStore = window.localStorage;
    const hasActiveUser = localStore.getItem('activeUser');
    if (hasActiveUser) {
      const username = localStore.getItem('username');
      const email = localStore.getItem('email');
      const token = localStore.getItem('token');
      const image = localStore.getItem('image');
      setUserDataFromLocal(username, email, token, image);
    }
  });
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/' component={ArticleList} exact />
          <Route path='/articles/' component={ArticleList} exact />
          <Route
            path='/articles/:slug'
            render={({ match }) => {
              const { slug } = match.params;
              return <ArticleFull slug={slug} />;
            }}
            exact
          />
          <Route path='/sign-in' component={AccountLogin} />
          <Route path='/sign-up' component={AccountRegister} />
          <Route path='/profile' component={AccountEdit} />
          <Route path='/new-article' component={ArticleCreate} exact />
          <Route path='/articles/:slug/edit' component={ArticleEdit} />
          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  );
}

export default connect(null, actions)(App);

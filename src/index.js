import './index.scss';
import App from './components/app';
import store from './services/redux';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

const container = document.getElementById('container');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

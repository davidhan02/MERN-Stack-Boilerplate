import './utils/moment';
import './styles/style.css';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './utils/store';
import { Provider } from 'react-redux';
import { SET_USER } from './actions/types';
import AppContainer from './components/App/Container';
import * as serviceWorker from './utils/serviceWorker';

let hasRendered = false;

const jsx = (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
};

axios.get('/api/current_user').then(res => {
  store.dispatch({ type: SET_USER, payload: res.data });
  renderApp();
});

serviceWorker.unregister();

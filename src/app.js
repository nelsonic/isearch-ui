import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import configureStore from './store/configure-store.js';
import Root from './containers/root/index.js';

const store = configureStore();
const rootElement = document.getElementById('container');

ReactDOM.render(
  <Root store={store} />,
  rootElement
);

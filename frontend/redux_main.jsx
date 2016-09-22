//React
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
//store
import configureStore from './react/redux_store/store.js';
//Components
import { Root } from './react/redux_components/root';
import { postData } from './react/redux_util/data_api_util';
let store;
window.store = store = configureStore();
window.postData = postData;

document.addEventListener("DOMContentLoaded", () => {
  Modal.setAppElement(document.body);
  const root = document.getElementById("content");
  ReactDOM.render(<Root store={store}/>, root);
});

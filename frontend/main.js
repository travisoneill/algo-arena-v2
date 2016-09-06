import ReactDOM from 'react-dom';
import React from 'react';
import App from './main'

document.addEventListener('DOMContentLoaded', () =>{
  const content = document.getElementById('content');
  ReactDOM.render(<App />, content);
});

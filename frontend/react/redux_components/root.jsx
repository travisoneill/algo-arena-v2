import React from 'react';
import { Provider } from 'react-redux';
import { AppRouter } from './router';

export const Root = ({store}) => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

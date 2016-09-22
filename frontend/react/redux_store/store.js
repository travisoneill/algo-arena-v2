import { createStore } from 'redux';
import RootReducer from '../redux_reducers/root_reducer.js';
import RootMiddleware from '../redux_middlewares/root_middleware.js';



const configureStore = (preloadedState = {}) => (
  createStore(
    RootReducer,
    preloadedState,
    RootMiddleware
  )
);

export default configureStore;

import { applyMiddleware } from 'redux';
import DataMiddleware from './data_middleware';

const RootMiddleware = applyMiddleware(
  DataMiddleware
);


export default RootMiddleware;

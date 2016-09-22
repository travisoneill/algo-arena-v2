import { combineReducers } from 'redux';

import DataReducer from './data_reducer';


const RootReducer = combineReducers({
  data: DataReducer
});


export default RootReducer;

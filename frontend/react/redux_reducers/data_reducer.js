import { DataConstants } from '../redux_actions/data_actions';
import merge from 'lodash/merge';


const DataReducer = (state = {data: {}, errors: []}, action) => {
  switch (action.type) {
    case DataConstants.RECEIVE_DATA:
      console.log(action.data)
      return merge({}, state, {data: {
                                      1: action.data["data1"],
                                      2: action.data["data2"]
                                      }
                              });
    case DataConstants.RECEIVE_ERRORS:
      const newErrors = action.errors;
      return merge({}, state, {errors: newErrors});
    default:
      return state;
  }
};

export default DataReducer;

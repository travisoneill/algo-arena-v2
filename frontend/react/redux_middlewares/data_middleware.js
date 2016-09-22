// Data API Util
import { postData
} from '../redux_util/data_api_util';
// Data Actions
import { sendData,
         receiveData,
         receiveErrors,
         DataConstants
       } from '../redux_actions/data_actions';


export default ({getState, dispatch}) => next => action => {
  const dataSuccess = data => dispatch(receiveData(data));
  const errorSuccess = data => dispatch(receiveErrors(data));
  const result = next(action);

  switch (action.type) {
    case DataConstants.SEND_DATA:
      postData(action.data, dataSuccess, errorSuccess);
      break;
    default:
      break;
  }
  return result;
};

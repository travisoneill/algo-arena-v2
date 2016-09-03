import * as ApiCalls from '../util/api_calls';
import * as ServerActions from './server_actions';

module.exports = {

  sendMethods(data){
    ApiCalls.sendMethods(data, ServerActions.storeData, ServerActions.storeError);
  }

};

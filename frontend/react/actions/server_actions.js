import AppDispatcher from '../dispatcher/dispatcher';

module.exports = {

  storeData(resp){
    AppDispatcher.dispatch({
      actionType: "STORE_RESPONSE",
      data: resp,
    });
  },

  storeError(resp){
    AppDispatcher.dispatch({
      actionType: "ERROR",
      data: resp
    });
  }
};

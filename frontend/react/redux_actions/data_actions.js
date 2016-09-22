export const DataConstants = {
  SEND_DATA: "SEND_DATA",
  RECEIVE_DATA: "RECEIVE_DATA",
  RECEIVE_ERRORS: "RECEIVE_ERRORS"
};

export const sendData = (data) => ({
    type: DataConstants.SEND_DATA,
    data
});

export const receiveData = (data) => ({
    type: DataConstants.RECEIVE_DATA,
    data
});

export const receiveErrors = (errors) => ({
    type: DataConstants.RECEIVE_ERRORS,
    errors
});

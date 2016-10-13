const checkData = (res1, res2) => {
    let results = [];
    let promise = new Promise((resolve, reject) => {
    if([res1, res2].every((res) => typeof res !== 'undefined')){
      resolve([res1, res2]);
    } else {
      results.push(res1);
      results.push(res2);
    }
  });
  promise.then(data => sendToFrontend(data));
};
const sendToFrontend = (data) => {
  // some callback that will take the data
  //  from the and send it to the front
};

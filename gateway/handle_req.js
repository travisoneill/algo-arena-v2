const Promise = require('promise');
const request = require('request');

module.exports = {
  getData(req) {
  req.json.timestamps.push({gateway_send: new Date()});
  // return new pending Promise
  return new Promise((resolve, reject) => {
    const res = request(req, (error, response, body) => {
      if (body) {
        resolve(body);
      } else {
        reject(error);
      }
      });
    });
  },

  compile(p1, p2, res) {
    Promise.all([p1, p2]).then((values) => {
      console.log('COMPILING');
      // return 'COMPILED RESPONSE'
      const finalResponse = {
        data1: values[0],
        data2: values[1]
      };
      console.log(finalResponse);
      res(finalResponse);
    }).catch(err => {console.error(err);});
  }
};

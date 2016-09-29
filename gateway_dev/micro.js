const http = require('http');
const Promise = require('promise');

module.exports = {
  sendData(testParams, data, sendResponseCallback) {

    console.log('###IN SEND DATA###');

    let promise = new Promise(function(resolve, reject) {
      //send call to iterateThroughData(async http requests)
      let finalResult = this.iterateThroughData(testParams, data);

      if (finalResult) {
        resolve("Stuff worked!");
      }
      else {
        reject(Error("It broke"));
      }
    });

    promise.then(function(result) {
      console.log(result); // "Stuff worked!"
      sendResponseCallback(result);
    }, function(err) {
      console.log(err); // Error: "It broke"
    });
  },


  //iterates through the data, sending HTTP requests to microservers to run code.
  iterateThroughData(testParams, data) {
    const ports = {
        'node': "8001",
        'flask': "8002"
    };
    const services = {
        'javascript': 'node',
        'python': 'flask'
    };

    let finalData = {};

    for (let key in data){
      if (key === 'lengthArr'){
        continue;
      }
      else{
        let language = data[key]['language'];
        let server = services[language];

        console.log('http request start');

        let postData = {'lengthArr': testParams, 'request_data': data[key]};
        let postOptions = {
          hostname: 'http://localhost',
          port: ports[server],
          path: '/api/algos',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        };

        let req = http.request(postOptions, (res) => {
          let str = '';

          console.log(`STATUS: ${res.statusCode}`);
          console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

          res.setEncoding('utf8'); //necessary?

          res.on('data', (chunk) => {
            str += chunk;
            console.log(`BODY: ${chunk}`);
          });

          res.on('end', () => {
            console.log(`No more data in response, assigning to finaldata[${key}]`);
            finalData[key] = JSON.stringify(str);
          });
        });

        req.on('error', (e) => {
          console.log(`problem with request: ${e.message}`);
        });
        req.end();

      } //else ends here, sigh
    } //for ends here
    if (finalData.length > 1) {
      return finalData;
    }
  } //iterateThroughData ends here
};//method end




// sendResponseCallback({data1: {
//                               xAxis: testParams,
//                               rawData: [{x:1000, y:1000}, {x:3000, y:3000}, {x: 10000, y: 10000}],
//                               name: data.name},
//                       data2: {
//                               xAxis: testParams,
//                               rawData: [{x:1000, y:1000}, {x:3000, y:3000}, {x: 10000, y: 10000}],
//                               name: data.name
//                               }
// });

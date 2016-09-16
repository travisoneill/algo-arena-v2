'use strict';

const Express = require('express');
const Path = require('path');
const BodyParser = require('body-parser');
const http = require('http');
const Server = Express();

const ports = {
    'node': "8001",
    'flask': "8002",
    'static': "8003"
};

const services = {
    'javascript': 'node',
    'python': 'flask'
};

const staticServerURL = 'http://localhost:8003';


Server.use(BodyParser.urlencoded({
  extended: true,
  parameterLimit: 10000,
  limit: 1024 * 1024 * 10
}));

Server.use(BodyParser.json());

Server.get('/', function(req, res){
  console.log("Hello from Root /");
  let str = '';
  const httpCallback = function(response){
    // console.log("Got response: " + response.statusCode);
    response.on('data', function (chunk) {
      str += chunk;
    });
    response.on('end', function () {
      res.send(str);
    });
  };


  http.get(staticServerURL, httpCallback);
});

Server.get('/bundle*', function(req, res){
  res.redirect(staticServerURL + '/bundle.js');
});

Server.get('/style*', function(req, res){
  res.redirect(staticServerURL + '/style.css');
});

Server.post('/api/algos', function(req, res){
  console.log('###API ALGO ROUTE###');
  let data = req.body;
  let testParams = data.lengthArr;

  const sendResponseCallback = function(finalData) {
    res.send(finalData);
  };
  sendData(testParams, data, sendResponseCallback);
});

const sendData = function(testParams, data, sendResponseCallback) {
  console.log('###IN SEND DATA###');
  let finalData = {};
  let options = {
    host: "http://localhost",
    path: ports['static']
  };

  for (let key in data){
    if (key === 'lengthArr'){
      continue;
    }
    else{
      console.log('else in key loop');
      let language = data[key]['language'];
      let server = services[language];
      switch (server) {
        case 'node':
          options['path'] = ports['node'];
          break;
        case 'flask':
          options['path'] = ports['flask'];
          break;
        // default:
        // console.log('wtf default');
        //   return {body: 'server routing error'};
      }
      // let requestUrl = req.params[0];
      let outgoingData = {'lengthArr': testParams, 'request_data': data[key]};
      let headers = {'Content-Type' : 'application/json'};

      // let response = //this is where the http request to the node server goes
      // finalData[key] = response;
    }
  }
  console.log('####FINALDATA####');
  console.log(finalData);
  sendResponseCallback({data1: {
                                xAxis: testParams,
                                rawData: [{x:1000, y:1000}, {x:3000, y:3000}, {x: 10000, y: 10000}],
                                name: data.name},
                        data2: {
                                xAxis: testParams,
                                rawData: [{x:1000, y:1000}, {x:3000, y:3000}, {x: 10000, y: 10000}],
                                name: data.name
                                }
  });
};

if (module === require.main) {
  var server = Server.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log('Node Server listening on port %s', port);
  });
}

module.exports = server;

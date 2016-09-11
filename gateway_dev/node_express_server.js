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
  res.redirect(staticServerURL + 'bundle.js');
});

Server.get('/style*', function(req, res){
  res.redirect(staticServerURL + 'style.css');
});

Server.post('/api/algos', function(req, res){
  console.log('###API ALGO ROUTE###');
  let data = req.body;
  let testParams = data.lengthArr;
  let finalData = {};

  const sendResponseCallback = function() {
    res.send(finalData);
  };

  for (let key in data){
    if (key === 'lengthArr'){
      continue;
    }
    else{
      //TO-DO make this work. go through it from the start the below is a very roughg shell that is crap
      console.log(data);
      let language = data[key]['language'];
      let server = services[language];
      let request_url = req.params[0];
      let outgoingData = {'lengthArr': testParams, 'request_data': data[key]};
      let headers = {'Content-Type' : 'application/json'};
      let response = sendData(server, outgoingData, sendResponseCallback);
      finalData[key] = response;
    }
  }


});

const sendData = function(server, data, sendResponseCallback) {
  console.log('###IN SEND DATA###');
  let options = {
    host: "http://localhost",
    path: ports['static']
  };
  if(server === 'node') {
    options['path'] = ports['node'];
  }
  else if (server === 'flask') {
    options['path'] = ports['flask'];
  }
  else {
    return {body: 'server routing error'};
  }
  // return http.request(options, httpCallback).end();
};

if (module === require.main) {
  var server = Server.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log('Node Server listening on port %s', port);
  });
}

module.exports = server;

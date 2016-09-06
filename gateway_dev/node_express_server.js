'use strict';

const Express = require('express');
const Path = require('path');
const BodyParser = require('body-parser');
const Controller = require('./');
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

Server.use(BodyParser.urlencoded({
  extended: true,
  parameterLimit: 10000,
  limit: 1024 * 1024 * 10
}));

Server.get('/', function(req, res){
  console.log("Hello from Root /");
  res.send();
});

Server.post('/api/algos', function(req, res){
  let data = req.body;
  let testParams = data['lengthArr'];

  let finalData = {};
  for (let key in data){
    if (key !== 'data'){
      continue;
    }
    else{
      let language = data[key]['language'];
      let server = services[language];
      let request_url = req.params[0];
      let outgoing_data = {'lengthArr': testParams, 'request_data': data[key]};
      let headers = {'Content-Type' : 'application/json'};
      let response = sendData(server);
      finalData[key] = response.body;
    }
  }

  res.send(finalData);
});

const sendData = function(server) {
  if(server === 'node') {

  }
  else if (server === 'flask') {
    
  }
  else {
    return {body: 'server routing error'};
  }
};

if (module === require.main) {
  var server = Server.listen(process.env.PORT || 8001, function () {
    var port = server.address().port;
    console.log('Node Server listening on port %s', port);
  });
}

module.exports = server;

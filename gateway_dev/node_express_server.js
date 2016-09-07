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



Server.use(BodyParser.urlencoded({
  extended: true,
  parameterLimit: 10000,
  limit: 1024 * 1024 * 10
}));

Server.get('/', function(req, res){
  console.log("Hello from Root /");
  let str = '';
  const httpCallback = function(response){

    console.log("Got response: " + response.statusCode);

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      res.send(str);
    });
  };
  // let options = {
  //   host: "",
  //   path: ports['static']
  // };
  let staticServerURL = 'http://localhost:8003';

  http.get(staticServerURL, httpCallback);
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
      let outgoingData = {'lengthArr': testParams, 'request_data': data[key]};
      let headers = {'Content-Type' : 'application/json'};
      let response = sendData(server, outgoingData);
      finalData[key] = response.body;
    }
  }

  res.send(finalData);
});

const sendData = function(server, data) {
  let options = {
    host: "http://localhost:",
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
  return http.request(options, httpCallback).end();
};

if (module === require.main) {
  var server = Server.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log('Node Server listening on port %s', port);
  });
}

module.exports = server;

'use strict';

const Express = require('express');
const Path = require('path');
const BodyParser = require('body-parser');
const http = require('http');
const Server = Express();
const Micro = require('./micro.js');
const Promise = require('promise');

const staticServerURL = 'http://localhost:8003';

Server.use(BodyParser.urlencoded({
  extended: true,
  parameterLimit: 10000,
  limit: 1024 * 1024 * 10
}));
Server.use(BodyParser.json());

Server.get('/bundle*', function(req, res){
  res.redirect(staticServerURL + '/bundle.js');
});

Server.get('/style*', function(req, res){
  res.redirect(staticServerURL + '/style.css');
});
Server.get('/', function(req, res){
  console.log("Hello from Root /");
  let str = '';
  const httpCallback = function(response){
    // console.log("Got response: " + response.statusCode);
    response.on('data', function (chunk) {
      str += chunk;
      console.log(str);
    });
    response.on('end', function () {
      res.send(str);
    });
  };
  http.get(staticServerURL, httpCallback);
});



Server.post('/api/algos', function(req, res){
  console.log('###API ALGO ROUTE###');
  let data = req.body;
  let testParams = data.lengthArr;

  const sendResponseCallback = function(finalData) {
    res.send(finalData);
  };

  let promise = new Promise(function(resolve, reject) {
    //send call to sendData(async http request goes out there)
    let result = Micro.sendData(testParams, data, sendResponseCallback);

    if (result) {
      resolve("Stuff worked!");
    }
    else {
      reject(Error("It broke"));
    }
  });

  promise.then(function(result) {
    sendResponseCallback(result);
    console.log(result); // "Stuff worked!"
  }, function(err) {
    console.log(err); // Error: "It broke"
  });


});


if (module === require.main) {
  var server = Server.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log('Node Server listening on port %s', port);
  });
}

module.exports = server;

'use strict';

const Express = require('express');
const Server = Express();
const Path = require('path');
const Controller = require('./controller');
const BodyParser = require('body-parser');

Server.use(BodyParser.json());

// Server.get('/', function(req, res){
//   console.log("Hello.  Node Server is running");
//   res.send("Hello.  Node Server is running");
// });
//
// Server.get('/test', function(req, res){
//   console.log("Hello.  Node Server is running");
//   res.send("Hello.  Node Server is running");
// });

Server.post('/api/algos', function(req, res){
  // console.log("REQUEST BODY")
  // console.log(req.body);
  let data = Controller.receiveCode(req.body);
  // console.log("BENCHMARK RESULTS")
  // console.log(data);
  res.send(data);
});

// FOR LIVE SERVER
if (module === require.main) {
  var server = Server.listen(process.env.PORT || 8001, function () {
    var port = server.address().port;
    console.log('Node Server listening on port %s', port);
  });
}

module.exports = server;

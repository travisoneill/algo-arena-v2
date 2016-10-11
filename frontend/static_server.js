'use strict';

const Express = require('express');
const Server = Express();
const Path = require('path');
const BodyParser = require('body-parser');

Server.use(Express.static(Path.join(__dirname + '/assets')));

Server.use(BodyParser.urlencoded({
  extended: true,
  parameterLimit: 10000,
  limit: 1024 * 1024 * 10
}));

// Server.use(BodyParser.json({
//   extended: false,
//   parameterLimit: 10000,
//   limit: 1024 * 1024 * 10
// }));

Server.get('/*', function(req, res){
  res.sendFile(Path.join(__dirname + '/index.html'));
});

if (module === require.main) {
  var server = Server.listen(process.env.PORT || 8003, function () {
    var port = server.address().port;
    console.log('Node Server listening on port %s', port);
  });
}

module.exports = server;

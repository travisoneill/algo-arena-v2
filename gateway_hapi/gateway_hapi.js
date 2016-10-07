'use strict';
const Hapi = require('hapi');
const server = new Hapi.Server();
const Setup = require('./services_config.js');

const port = process.env.PORT || 5000;
server.connection({ port: port });

// const environment = process.env.NODE_ENV || 'production'; //for production mode test
const environment = process.env.NODE_ENV || 'development';
const serviceMap = Setup.mapServices(environment);
console.log(serviceMap);

server.route({
  method: 'GET',
  path: '/',
  handler(req, res){
    res('Hello World');
  }
});

server.route({
  method: 'GET',
  path: '/env',
  handler(req, res){
    res(process.env);
  }
});

server.route({
  method: 'POST',
  path: '/api/algos',
  handler(req, res){
    //TODO Make this work!!!
  }
});

if(module === require.main){
  server.start ( (err) => {
    if(err){ throw err; }
    console.log(`Server running at ${server.info.uri}`);
  });
}

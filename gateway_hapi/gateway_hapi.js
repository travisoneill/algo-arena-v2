'use strict';
const Hapi = require('hapi');
const request = require('request');
const server = new Hapi.Server();
const Setup = require('./services_config.js');
// const prom = require('./handle_req.js');
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
    const reqData = req.payload;
    const testParams = reqData.lengthArr;
    const data1 = reqData.data1;
    const data2 = reqData.data2;
    const req1 = { url: serviceMap[data1.language], outgoing_data: { lengthArr: testParams, request_data: data1 } };
    const req2 = { url: serviceMap[data2.language], outgoing_data: { lengthArr: testParams, request_data: data2 } };
    // prom.then((data) => console.log(data));
    console.log(req1);
    console.log(req2);
    res('DONE');
  }
});

if(module === require.main){
  server.start ( (err) => {
    if(err){ throw err; }
    console.log(`Server running at ${server.info.uri}`);
  });
}

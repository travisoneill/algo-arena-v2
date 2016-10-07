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
    const req1 = {
      uri: serviceMap[data1.language],
      method: 'POST',
      json: { lengthArr: testParams, request_data: data1 }
    };
    const req2 = {
      url: serviceMap[data2.language],
      method: 'POST',
      json: { lengthArr: testParams, request_data: data2 }
    };
    let responses = [];
    const resHandler = (error, response, body) => {
      responses.push(response);
      if(responses.length === 2){
        compile(responses);
      } else {
        console.log('waiting');
      }
    }
    const compile = (array) => {
      console.log('COMPILING');
      return 'COMPILED RESPONSE'
    }
    request(req1, resHandler);
    request(req2, resHandler);  
  }
});

if(module === require.main){
  server.start ( (err) => {
    if(err){ throw err; }
    console.log(`Server running at ${server.info.uri}`);
  });
}

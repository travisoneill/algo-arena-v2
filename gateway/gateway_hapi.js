'use strict';
const Hapi = require('hapi');
const request = require('request');
const server = new Hapi.Server();
const Setup = require('./services_config.js');
// const prom = require('./handle_req.js');
const port = process.env.PORT || 8000;
server.connection({ port: port });

// const environment = process.env.NODE_ENV || 'production'; //for production mode test
const environment = process.env.NODE_ENV || 'development';
const serviceMap = Setup.mapServices(environment);
console.log(serviceMap);


server.route({
  method: 'GET',
  path: '/',
  handler(req, res){
    // console.log('GET /');
    const handleRes = (e, resp, body) => { res(body); }
    const url = serviceMap['static'];
    request(url, handleRes);
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
  method: 'GET',
  path: '/{staticFile}',
  handler(req, res){
    const fileType = req.params.staticFile.match(/\w*$/);
    const mimeType = {
      css: 'text/css',
      js: 'application/javascript'
    }
    const ContentType = mimeType[fileType];
    const handleRes = (e, resp, body) => { res(body).type(ContentType); }
    const url = serviceMap['static'] + '/' + req.params.staticFile;
    console.log(url);
    request(url, handleRes);
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
      uri: serviceMap[data1.language] + '/api/algos',
      method: 'POST',
      json: { lengthArr: testParams, request_data: data1 }
    };
    const req2 = {
      url: serviceMap[data2.language] + '/api/algos',
      method: 'POST',
      json: { lengthArr: testParams, request_data: data2 }
    };
    console.log({req1: req1, req2: req2});
    let responses = [];
    const resHandler = (error, response, body) => {
      console.log(body);
      responses.push(body);
      console.log(responses.length);
      if(responses.length === 2){
        console.log('compiling');
        compile(responses);
      } else {
        console.log('waiting');
      }
    }
    const compile = (array) => {
      console.log('COMPILING');
      // return 'COMPILED RESPONSE'
      const finalResponse = {
        data1: responses[0],
        data2: responses[1]
      }
      console.log(finalResponse);
      res(finalResponse);
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
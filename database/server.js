const Hapi = require('hapi');
const request = require('request');
const mongojs = require('mongojs');

const server = new Hapi.Server();
const port = process.env.PORT || 8005;

server.connection({port: port});

server.route({
  method: 'GET',
  path: '/',
  handler(req, res){
    res('ROOT');
  }
});

if(module === require.main){
  server.start ( (err) => {
    if(err){ throw err; }
    console.log(`Server running at ${server.info.uri}`);
  });
}

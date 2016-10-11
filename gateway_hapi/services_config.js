PORTS = {
  'javascript': 8001,
  'python': 8002,
  'static': 8003,
  'ruby': 8004
}

SERVICES = {
  'static': 'static'
  'javascript': 'express',
  'python': 'flask',
  'ruby': 'rack'
}

module.exports = {
  mapServices(environment){
    let map = {};
    if(environment === 'development'){
      Object.keys(PORTS).forEach( (service) => {
        map[service] = localURL(PORTS[service]);
      });
    }
    if(environment === 'production'){
      Object.keys(SERVICES).forEach( (service) => {
        map[service] = productionURL(SERVICES[service]);
      });
    }
    map.env = environment;
    return map;
  },
};

function  productionURL(serviceName){
  projectID = process.env.GAE_LONG_APP_ID || 'algorithm-arena';
  projectURL = projectID + '.appspot.com';
  if(serviceName === 'default'){
    return 'https://' + projectURL;
  } else if(serviceName === 'static'){
    return 'https://storage.googleapis.com/algorithm-arena-static/index.html'
  } else {
    return 'https://' + serviceName + '-dot-' + projectURL;
  }
}

function localURL(port){
  return `http://localhost:${port}`
}

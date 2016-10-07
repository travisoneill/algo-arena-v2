PORTS = {
  'javascript': 8001,
  'python': 8002,
  'static': 8003,
  'ruby': 8004
}

SERVICES = {
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
    return map;
  },
};

function  productionURL(serviceName){
  projectID = process.env.GAE_LONG_APP_ID || 'algorithm-arena';
  projectURL = projectID + '.appspot.com';
  if(serviceName === 'default'){
    return 'https://' + projectURL;
  } else {
    return 'https://' + serviceName + '-dot-' + projectURL;
  }
}

function localURL(port){
  return `http://localhost:${port}`
}

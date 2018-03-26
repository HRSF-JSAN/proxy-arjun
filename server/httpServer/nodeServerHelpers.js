const fs = require('fs');
const path = require('path');
const axios = require('axios');

const { redisClient } = require('../../redisIndex');
const serviceConfig = require('./serviceRoutes.json');
const services = require('./serverHelpers.js')(serviceConfig);

const React = require('react');
const ReactDom = require('react-dom/server');
const Layout = require('../../templates/layout');
const App = require('../../templates/app');
const Scripts = require('../../templates/scripts');


const renderComponents = (components, props = {}) => {
  return Object.keys(components).map((item) => {
    const component = React.createElement(components[item], props);
    return ReactDom.renderToString(component);
  });
};

module.exports.serveHTML = (request, response) => {
  const components = renderComponents(services);
  response.end(Layout(
    'Reviews', App(...components),
    Scripts(Object.keys(services)),
  ));
};

module.exports.serveCSS = (request, response) => {
  const cssPath = path.join(__dirname, '../../public/reviews/', request.url);
  const fileStream = fs.createReadStream(cssPath, 'UTF-8');
  response.writeHead(200, { 'Content-Type': 'text/css' });
  fileStream.pipe(response);
};

module.exports.serveClientBundle = (request, response) => {
  const bundlePath = path.join(__dirname, '../../public/reviews/', request.url);
  const fileStream = fs.createReadStream(bundlePath, 'UTF-8');
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  fileStream.pipe(response);
};

module.exports.serveRestaurant = (request, response) => {
  const reqId = request.url.split('/')[2];
  const redisId = `3800${reqId}`;
  redisClient.get(redisId, (err, reply) => {
    if (err) {
      throw err;
    } else if (reply !== null) {
      // console.log("got from redis", redisId);
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(reply);
    } else {
      axios.get(`http://localhost:8080/restaurants/${reqId}/reviews`)
        .then((res) => {
          redisClient.setex(redisId, 60, JSON.stringify(res.data));
          // console.log("wrote to redis", redisId);
          response.setHeader('Content-Type', 'application/json');
          response.end(JSON.stringify(res.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
};

const fs = require('fs');
const fetch = require('node-fetch');
const Promise = require('bluebird');
const path = require('path');

const exists = Promise.promisify(fs.stat);

const loadBundle = (services, fileName) => {
  setTimeout(() => {
    console.log('loading', fileName);
    services['ReviewApp'] = require(path.join(__dirname, '../../public/reviews/server-bundle.js')).default;
  }, 0);
};

const fetchReviewsBundleClient = (services) => {
  const clientFileName = path.join(__dirname, '../../public/reviews/bundle.js');
  exists(clientFileName)
    .catch((err) => {
      if (err.code === 'ENOENT') {
        const url = 'http://localhost:8080/bundle.js';
        console.log(`fetching ${url}`);
        fetch(url)
          .then((res) => {
            const dest = fs.createWriteStream(clientFileName);
            res.body.pipe(dest);
            // res.body.on('end', () => {
            //   loadBundle(services, clientFileName);
            // });
          });
      }
    });
};

const fetchReviewsCSS = (services) => {
  const clientFileName = path.join(__dirname, '../../public/reviews/style.css');
  exists(clientFileName)
    .then(() => {
      // loadBundle(clientFileName);
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        const url = 'http://localhost:8080/style.css';
        console.log(`fetching ${url}`);
        fetch(url)
          .then((res) => {
            const dest = fs.createWriteStream(clientFileName);
            res.body.pipe(dest);
          });
      }
    });
};

const fetchReviewsBundleServer = (services) => {
  const serverFileName = path.join(__dirname, '../../public/reviews/server-bundle.js');
  exists(serverFileName)
    .then(() => {
      loadBundle(services, serverFileName);
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        const url = 'http://localhost:8080/server-bundle.js';
        console.log(`fetching ${url}`);
        fetch(url)
          .then((res) => {
            const dest = fs.createWriteStream(serverFileName);
            res.body.pipe(dest);
            res.body.on('end', () => {
              loadBundle(services, serverFileName);
            });
          });
      }
    });
};

module.exports = (services) => {
  fetchReviewsBundleServer(services);
  fetchReviewsBundleClient(services);
  fetchReviewsCSS();
  return services;
};

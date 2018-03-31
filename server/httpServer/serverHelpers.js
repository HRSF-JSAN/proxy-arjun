const fs = require('fs');
const fetch = require('node-fetch');
const Promise = require('bluebird');
const path = require('path');

const exists = Promise.promisify(fs.stat);

const fetchReviewsBundleClient = () => {
  const clientFileName = path.join(__dirname, '../../public/reviews/bundle.js');
  exists(clientFileName)
    .catch((err) => {
      if (err.code === 'ENOENT') {
        const url = 'http://ec2-54-193-64-165.us-west-1.compute.amazonaws.com/bundle.js';
        console.log(`fetching ${url}`);
        fetch(url)
          .then((res) => {
            const dest = fs.createWriteStream(clientFileName);
            res.body.pipe(dest);
          });
      }
    });
};

const fetchReviewsCSS = () => {
  const clientFileName = path.join(__dirname, '../../public/reviews/style.css');
  exists(clientFileName)
    .then(() => {
      // loadBundle(clientFileName);
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        const url = 'http://ec2-54-193-64-165.us-west-1.compute.amazonaws.com/style.css';
        console.log(`fetching ${url}`);
        fetch(url)
          .then((res) => {
            const dest = fs.createWriteStream(clientFileName);
            res.body.pipe(dest);
          });
      }
    });
};

const fetchReviewsBundleServer = () => {
  const serverFileName = path.join(__dirname, '../../public/reviews/server-bundle.js');
  exists(serverFileName)
    .then(() => {
      // loadBundle(services, serverFileName);
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        const url = 'http://ec2-54-193-64-165.us-west-1.compute.amazonaws.com/server-bundle.js';
        console.log(`fetching ${url}`);
        fetch(url)
          .then((res) => {
            const dest = fs.createWriteStream(serverFileName);
            res.body.pipe(dest);
            res.body.on('end', () => {
              // loadBundle(services, serverFileName);
            });
          });
      }
    });
};

const fetchPhotosBundleClient = () => {
  const clientFileName = path.join(__dirname, '../../public/photos/bundle.js');
  exists(clientFileName)
    .catch((err) => {
      if (err.code === 'ENOENT') {
        const url = 'http://ec2-54-67-87-237.us-west-1.compute.amazonaws.com/bundle.js';
        console.log(`fetching ${url}`);
        fetch(url)
          .then((res) => {
            const dest = fs.createWriteStream(clientFileName);
            res.body.pipe(dest);
          });
      }
    });
};

const fetchPhotosCSS = () => {
  const clientFileName = path.join(__dirname, '../../public/photos/style.css');
  exists(clientFileName)
    .then(() => {
      // loadBundle(clientFileName);
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        const url = 'http://ec2-54-67-87-237.us-west-1.compute.amazonaws.com/style.css';
        console.log(`fetching ${url}`);
        fetch(url)
          .then((res) => {
            const dest = fs.createWriteStream(clientFileName);
            res.body.pipe(dest);
          });
      }
    });
};

const fetchPhotosBundleServer = () => {
  const serverFileName = path.join(__dirname, '../../public/photos/server-bundle.js');
  exists(serverFileName)
    .then(() => {
      // loadBundle(services, serverFileName);
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        const url = 'http://ec2-54-67-87-237.us-west-1.compute.amazonaws.com/server-bundle.js';
        console.log(`fetching ${url}`);
        fetch(url)
          .then((res) => {
            const dest = fs.createWriteStream(serverFileName);
            res.body.pipe(dest);
            res.body.on('end', () => {
              // loadBundle(services, serverFileName);
            });
          });
      }
    });
};

fetchReviewsBundleServer();
fetchReviewsBundleClient();
fetchReviewsCSS();
fetchPhotosBundleServer();
fetchPhotosBundleClient();
fetchPhotosCSS();

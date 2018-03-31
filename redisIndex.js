const redis = require('redis');

const redisClient = redis.createClient('redis://ec2-54-219-170-220.us-west-1.compute.amazonaws.com');

redisClient.on('error', (err) => {
  console.log('Something went wrong ', err);
});

redisClient.on('connect', () => {
  console.log('connected to redis');
});

module.exports.redisClient = redisClient;

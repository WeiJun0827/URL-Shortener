const { promisify } = require('util');
const redis = require('redis');
const redisClient = redis.createClient({ host: 'localhost', port: 6379 });

redisClient.on('ready', function() {
    console.log('Redis is ready!');
});

redisClient.on('error', function() {
    console.log('Redis goes wrong!');
});

const get = promisify(redisClient.get).bind(redisClient);
const set = promisify(redisClient.set).bind(redisClient);
const expire = promisify(redisClient.expire).bind(redisClient);

module.exports = {
    client: redisClient,
    get,
    set,
    expire
};
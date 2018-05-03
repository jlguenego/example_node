const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


const redisClient = redis.createClient({
    host: '127.0.0.1',
    port: 6379
});

async function configure() {
    redisClient.on('error', function (err) {
        console.log('Error ' + err);
        throw new Error(err);
    });
    await redisClient.setAsync('next_id', '0');
    console.log('configured with success');
}

module.exports = { configure, redisClient };
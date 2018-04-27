const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379
});

async function configure() {
    client.on('error', function (err) {
        console.log('Error ' + err);
        throw new Error(err);
    });
    await client.setAsync('next_id', '0');
    console.log('configured with success');
}

module.exports = { configure, client };
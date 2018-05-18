const promisifyAll = require('./promisifyAll');

const obj = {
    setTimeout: setTimeout,
    sleep: function (time, callback) {
        setTimeout(() => {
            callback(null);
        }, time);
    },
    // sleep max 1000 or reject.
    sleepMax1000: function (time, callback) {
        if (time > 1000) {
            callback(new Error('cannot sleep too long'));
            return;
        }
        setTimeout(() => {
            callback(null);
        }, time);
    }
};

console.log(Object.keys(obj));
promisifyAll(obj, ['setTimeout']);
console.log(Object.keys(obj));

obj.sleepPromise(2000).then(() => {
    console.log('wakeup after 2000');
    return obj.sleepMax1000Promise(200);
}).then(() => {
    console.log('wakeup after 200');
    return obj.sleepMax1000Promise(2000);
}).then(() => {
    console.log('You should not see this.');
}).catch(e => {
    console.log('error', e.message);
});

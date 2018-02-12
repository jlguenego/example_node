console.time('app');

console.log('Start require');

const m = require('./mod.js');
console.log('m', m);

console.timeEnd('app');
const fs = require('fs');
const http = require('http');

const options = {
	host: 'www.stackoverflow.com',
	port: 80,
	path: '/index.html'
};


console.log('Start');
setTimeout(() => console.log('TO1'), 0);
setImmediate(() => console.log('IM1'));
process.nextTick(() => console.log('NT1'));
setImmediate(() => console.log('IM2'));
process.nextTick(() => console.log('NT2'));
http.get(options, () => console.log('IO1'));
fs.readdir(process.cwd(), () => console.log('IO2'));
setImmediate(() => console.log('IM3'));
process.nextTick(() => console.log('NT3'));
setImmediate(() => console.log('IM4'));
fs.readdir(process.cwd(), () => console.log('IO3'));
console.log('Done');

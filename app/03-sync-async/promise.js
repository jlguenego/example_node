const fs = require('fs');
const Promise = require('bluebird');
Promise.promisifyAll(fs);

fs.appendFileAsync('kiki.txt', 'hello1\n').then(r =>
	fs.appendFileAsync('kiki.txt', 'hello2\n')).then(r =>
	fs.appendFileAsync('kiki.txt', 'hello3\n')).then(r =>
	fs.appendFileAsync('kiki.txt', 'hello4\n')).catch(e =>
	console.log('error', e)
);

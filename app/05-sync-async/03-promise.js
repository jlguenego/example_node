const fs = require('fs');
const util = require('util');
const appendFileAsync = util.promisify(fs.appendFile);

appendFileAsync('kiki.txt', 'promise1\n').then(r =>
	appendFileAsync('kiki.txt', 'promise2\n')).then(r =>
	appendFileAsync('kiki.txt', 'promise3\n')).then(r =>
	appendFileAsync('kiki.txt', 'promise4\n')).catch(e =>
	console.log('error', e)
);

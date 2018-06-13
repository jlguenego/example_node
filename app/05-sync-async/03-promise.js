const fs = require('fs');

function appendFileAsync(filename, data) {
    return new Promise((resolve, reject) => {
        fs.appendFile(filename, data, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

appendFileAsync('kiki.txt', 'promise1\n').then(r =>
	appendFileAsync('kiki.txt', 'promise2\n')).then(r =>
	appendFileAsync('kiki.txt', 'promise3\n')).then(r =>
	appendFileAsync('kiki.txt', 'promise4\n')).catch(e =>
	console.log('error', e)
);

const fs = require('fs');

function appendFile(filename, data) {
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

async function main() {
    try {
        await appendFile('kiki.txt', 'await1\n');
        await appendFile('kiki.txt', 'await2\n');
        await appendFile('kiki.txt', 'await3\n');
        await appendFile('kiki.txt', 'await4\n');
    } catch(e) {
        console.log('error', e);
    }
}

main();



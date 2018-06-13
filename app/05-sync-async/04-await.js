const fs = require('fs');
const util = require('util');

const appendFile = util.promisify(fs.appendFile);

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



const fs = require('fs');
const path = require('path');

const files = process.argv.slice(2);

files.forEach((file) => {
    try {
        const stream = fs.createReadStream(path.resolve(__dirname, file));
        stream.pipe(process.stdout);
    } catch (e) {
        console.log('error', e);
    }
});




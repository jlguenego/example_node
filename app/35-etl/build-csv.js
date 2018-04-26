const fs = require('fs');

const csvFilename = 'input.csv';

const writeStream = fs.createWriteStream(csvFilename);

for (let i = 0; i < 1000000; i++) {

}
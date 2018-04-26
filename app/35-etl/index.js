// load from a csv file to ElasticSearch

const fs = require('fs');
const csvFilename = 'input.csv';

var readStream = fs.createReadStream(csvFilename);

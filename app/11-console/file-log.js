const fs = require('fs');
const { Console } = require('console');

const output = fs.createWriteStream('./stdout.log'); // erase a previous file.
const errorOutput = fs.createWriteStream('./stderr.log');
const logger = new Console(output, errorOutput);

module.exports = logger;

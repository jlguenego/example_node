console.log('coucou');
console.log('here is an object', { coucou: 'hello', '#$%^': 123 });

const myLog = require('./file-log.js');
myLog.debug('I log in a file', { '1asd': 12345 });
myLog.warn('Warning...', [1, 2, 'coucou']);

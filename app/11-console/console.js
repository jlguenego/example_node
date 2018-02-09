console.clear();

// print nothing, but start a timer 
console.time('my-app');

console.log('coucou');
console.log('here is an object', { coucou: 'hello', '#$%^': 123 });

const myLog = require('./file-log.js');
myLog.debug('I log in a file', { '1asd': 12345 });
myLog.warn('Warning...', [1, 2, 'coucou']);

// do nothing. (will not truncate the file like you could expect.)
myLog.clear();
myLog.trace('this will be printed on stderr:', { coucou: 123 });
console.timeEnd('my-app'); // print the timer associated with this label.

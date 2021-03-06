const myLog = require('./file-log.js');

const chalk = require('chalk');

console.clear();

// print nothing, but start a timer 
console.time('my-app');

console.log('coucou');
console.log('here is an object', { coucou: 'hello', '#$%^': 123 });
console.dir({ coucou: 'hello', '#$%^': 123 }, { colors: true });

myLog.debug('I log in a file', { '1asd': 12345 });
myLog.warn('Warning...', [1, 2, 'coucou']);

try {
	myLog.assert(1 == '1', 'this is correct');
	myLog.assert(1 === '1', 'this is an error...');
} catch (e) {
	myLog.error('catched an error: ', e);
}

console.log(chalk.blue('Oh I am in blue ;O)'));

// do nothing. (will not truncate the file like you could expect.)
myLog.clear();
myLog.trace('this will be printed on stderr:', { coucou: 123 });

console.timeEnd('my-app'); // print the timer associated with this label.

const fork = require('child_process').fork;
const path = require('path');
const program = path.resolve('child.js');
console.log('program', program);
const child = fork(program, [], {
	stdio: ['pipe', 'pipe', 'pipe', 'ipc']
});

child.on('message', message => {
	console.log('message from child:', message);
	child.send('Hi');
});

// child.stdout.on('data', data => {
// 	console.log(`child.stdout: ${data}`);
// });

child.stdout.pipe(process.stdout);


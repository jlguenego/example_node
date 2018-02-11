const fork = require('child_process').fork;
const path = require('path');
const os = require('os');
const program = path.resolve('child.js');
console.log('program', program);
const child = fork(program, [], {
	stdio: ['pipe', 'pipe', 'pipe', 'ipc']
});

console.log('cpus', os.cpus().length);

child.on('message', message => {
	console.log('message from child:', message);
	child.send('Hi');
});

child.stdout.pipe(process.stdout);


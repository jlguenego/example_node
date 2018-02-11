const { spawn } = require('child_process');

console.log(`hello, I am master process id ${process.pid}`);


console.log('about to run "node hello.js"');

const childProcess = spawn('node', ['hello.js']);

childProcess.stdout.on('data', (data) => {
	console.log(`stdout--------------------->
${data}`);
});

childProcess.stderr.on('data', (data) => {
	console.log(`stderr--------------------->
${data}`);
});

childProcess.on('close', (code) => {
	console.log(`--------------------->child process exited with code ${code}`);
});

process.on('beforeExit', (...args) => {
    // called when the program has nothing to do except to finish.
	console.log('beforeExit: ', args);
});

process.on('exit', (code) => {
	console.log(`About to exit with code: ${code}`);
});


process.on('disconnect', (...args) => {
	console.log('disconnect: ', args);
});

// If you explicitely tell the process to exit, then no 'beforExit' event is emitted.
// process.exit();

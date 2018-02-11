const { spawn } = require('child_process');

console.log(`hello, I am master process id ${process.pid}`);


console.log('about to run "node hello.js"');

// the master process will wait that all children finished before exiting.
const childProcess = spawn('node', ['hello.js', 'coucou']);

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

// called when the program has nothing to do except to finish.
process.on('beforeExit', (...args) => {
	console.log('beforeExit: ', args);
});

// called when the program has to finish in all case.
process.on('exit', (code) => {
	console.log(`About to exit with code: ${code}`);
});

// will work only if there is a IPC between master and children.
process.on('disconnect', (...args) => {
	console.log('disconnect: ', args);
});

// If you explicitely tell the process to exit, then no 'beforeExit' event is emitted.
// process.exit(1337);

// to retrieve the exit code 1337, just do on cmd "echo %ERRORLEVEL%", or "echo $?" in bash.

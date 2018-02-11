console.log(`hello, I am process id ${process.pid} 
and running on architecture ${process.arch},
on platform ${process.platform}`);
console.log(`hello, I am running in current dir: ${process.cwd()}`);
console.log(`I have been run with the following argv: ${process.argv}`);
console.log(`I have access to all environment variable, for instance, the USERNAME is: ${process.env.USERNAME}`);
console.log(`process.channel: ${process.channel}`);
console.log('is the process connected to an IPC channel ?', (process.connected) ? 'Yes.' : 'No.');
console.log(`The parent process is pid ${process.ppid}`);

function wait(delay) {
	console.log('wait starts.');
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('wait finished.');
			resolve();
		}, delay);
	});
}

// when no catch in synchrone stuff.
process.on('uncaughtException', (err) => {
	console.log('exception not properly caught:', err);
	console.log('I keep going.');
});

// when no catch in promise (asynchrone) stuff.
process.on('unhandledRejection', (err) => {
	console.log('unhandledRejection:', err);
	console.log('I keep going also.');
});

wait(300).then(() => {
	throw 'aie !!!'; // yes, this will fail.
}); // no catch.

setTimeout(() => {
	console.log('Inside setTimeout: This will run.');
	process.exit(1905);
}, 500);

process.emitWarning('A funny warning');

throw 'Hello I am an nasty exception...';

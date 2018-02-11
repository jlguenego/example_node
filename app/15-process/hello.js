console.log(`hello, I am process id ${process.pid}`);

function wait(delay) {
	console.log('wait starts.');
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('wait finished.');
			resolve();
		}, delay);
	});
}

process.on('uncaughtException', (err) => {
	console.log('exception not properly caught:', err);
	console.log('I keep going.');
});

process.on('unhandledRejection', (err) => {
	console.log('unhandledRejection:', err);
	console.log('I keep going also.');
});

wait(300).then(() => {
	unknownFunction(); // yes, this will fail.
}); // no catch.

setTimeout(() => {
	console.log('Inside setTimeout: This will run.');
	asdfafsd();
	process.exit(1905);
}, 500);

throw 'Hello I am an nasty exception...';

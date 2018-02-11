console.log(`hello, I am process id ${process.pid}`);



process.on('uncaughtException', (err) => {
	console.log('exception not properly caught:', err);
	process.exit(1905);
});



throw 'Hello I am an nasty exception...';
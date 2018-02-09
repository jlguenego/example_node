function write(c, delay) {
	return new Promise((resolve, reject) => {
		process.stdout.clearLine(); // clear current text
		process.stdout.cursorTo(0); // move cursor to beginning of line
		process.stdout.write(c); // write text
		setTimeout(() => {
			resolve();
		}, delay);
	});
}

async function spin(time) {
	const delay = 100;
	const n = time / (delay * 4);
	for (let i = 0; i < n; i++) {
		await write('-', delay);
		await write('\\', delay);
		await write('|', delay);
		await write('/', delay);
	}
	await write('done.', delay);
}

spin(4000);

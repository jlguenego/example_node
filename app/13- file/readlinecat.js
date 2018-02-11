const fs = require('fs');
const path = require('path');
const es = require('event-stream');

const files = process.argv.slice(2);

files.forEach((file) => {
	try {
		let lineNbr = 0;
		const stream = fs.createReadStream(path.resolve(__dirname, file));
		stream.on('error', (...args) => {
			console.log('Error: probably the file does not exist', args);
		});
		stream
			.pipe(es.split('\n'))
			.pipe(es.map(function(line, cb) {
				// pause the readstream
				stream.pause();
				// work (synchronous in this example)
				lineNbr++;
				const nbr = `${lineNbr}`.padStart(3);

				setTimeout(() => {
					const parsedLine = `${nbr}:\t${line}\n`;

					// if you do this, you will not be sure to print in the right order.
					// process.stdout.write(parsedLine);

					// resume the readstream when you are finished to process the line.
					stream.resume();
					cb(null, parsedLine);
				}, 1000 / lineNbr);
			}))
			.pipe(process.stdout);
	} catch (e) {
		console.log('error', e);
	}
});

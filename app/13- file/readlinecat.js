const fs = require('fs');
const path = require('path');
const es = require('event-stream');

const files = process.argv.slice(2);

files.forEach((file) => {
	try {
		let lineNbr = 0;
		const stream = fs.createReadStream(path.resolve(__dirname, file));
		stream
			.pipe(es.split())
			.pipe(es.mapSync(function(line) {
				console.log('line', line);
				// pause the readstream
				stream.pause();
				// work (synchronous in this example)
                lineNbr++;
                const nbr = `${lineNbr}`.padStart(3);
				const parsedLine = `${nbr}:\t${line}`;
				process.stdout.write(parsedLine);

				// resume the readstream, possibly from a callback
				stream.resume();
			}));
	} catch (e) {
		console.log('error', e);
	}
});

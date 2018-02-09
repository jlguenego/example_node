const fs = require('fs');
const path = require('path');

const files = process.argv.slice(2);

files.forEach((file) => {
	const content = fs.readFileSync(path.resolve(__dirname, file));
	process.stdout.write(content);
});

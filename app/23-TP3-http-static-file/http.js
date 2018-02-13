const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 9000;

const server = http.createServer((req, res) => {
	const { url } = req;
	console.log('url', url);
	
	const filename = path.resolve(__dirname, '.' + url);
	console.log('filename', filename);
	
	try {
		const content = fs.readFileSync(filename);
		res.end(content, 'utf8');
	} catch (e) {
		res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
		res.end('Not found.', 'utf8');
	}
});

server.listen(port, () => {
	console.log('Server started on port', port);
});

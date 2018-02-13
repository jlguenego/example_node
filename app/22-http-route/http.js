const http = require('http');
const fs = require('fs');

const ws = require('./ws.js');

const port = 9000;

const server = http.createServer((req, res) => {
	const { method, url, headers } = req;

	const userAgent = (headers['user-agent'].match(/Chrome/)) ? 'Chrome' : 'Not Chrome';

	switch (method) {
		case 'GET':
			if (url.match(/\/hello.*/)) {
				setTimeout(() => {
					const content = fs.readFileSync('./hello.html');
					res.end(content, 'utf8');
				}, 500);
			} else if (url.match(/\/world.*/)) {
				const content = fs.readFileSync('./world.html');
				res.end(content, 'utf8');
			} else {
				let content = fs.readFileSync('./index.html');
				content = content.toString().replace(/\*\*\*USER_AGENT\*\*\*/g, userAgent);
				res.end(content, 'utf8');
			}
			break;
		case 'POST':
			if (url.startsWith('/ws')) {
                ws.manageWebService(req, res);
                break;
            }
            // no break here.
		default:
			res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
			res.end('Not found.', 'utf8');
	}
});

server.listen(port, () => {
	console.log('Server started on port', port);
});

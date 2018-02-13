const http = require('http');
const fs = require('fs');

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
			if (url.match(/\/hello.*/)) {
				res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
				res.end('Your POST url starts with hello', 'utf8');
				return;
			} else if (url.match(/\/world.*/)) {
				res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
				res.end('Your POST url starts with world', 'utf8');
				return;
			} else {
				res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
				res.end('Your POST url is generic.', 'utf8');
			}
			break;
		default:
			res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
			res.end('Your url is generic.', 'utf8');
	}
});

server.listen(port, () => {
	console.log('Server started on port', port);
});

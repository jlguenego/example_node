const http = require('http');

const port = 9000;

const server = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
	res.end('Guénégo', 'UTF-8');
});

server.listen(port, () => {
	console.log('Server started on port', port);
});

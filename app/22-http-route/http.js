const http = require('http');

const port = 9000;

const server = http.createServer((req, res) => {
	console.log('req.url', req.url);
	console.log('req.method', req.method);

    const { method, url, headers } = req;
    
    console.log('req.headers', headers);

    const userAgent = (headers['user-agent'].match(/Chrome/)) ? 'Chrome': 'Not Chrome';

	if (method === 'GET') {
		if (url.match(/\/hello.*/)) {
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            setTimeout(() => {
                res.end(`Your GET url starts with hello and take 2s. User agent: ${userAgent}`, 'utf8');
            }, 2000);
			
			return;
		}
		if (url.match(/\/world.*/)) {
			res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
			res.end(`Your GET url starts with world. User agent: ${userAgent}`, 'utf8');
			return;
		}
		res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
		res.end(`Your GET url is generic. User agent: ${userAgent}`, 'utf8');
		return;
	}

	if (method === 'POST') {
		if (url.match(/\/titi.*/)) {
			res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
			res.end('Your POST url starts with hello', 'utf8');
			return;
		}
		if (url.match(/\/world.*/)) {
			res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
			res.end('Your POST url starts with world', 'utf8');
			return;
		}
		res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
		res.end('Your POST url is generic.', 'utf8');
		return;
	}
	res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
	res.end('Your url is generic.', 'utf8');

});

server.listen(port, () => {
	console.log('Server started on port', port);
});

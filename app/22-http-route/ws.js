class WebServiceManager {
	manageWebService(req, res) {
		const { url } = req;

		if (url.match(/\/ws\/date/)) {
			res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
			res.end(JSON.stringify({ date: new Date().toString() }), 'utf8');
			return;
		}
		if (url.match(/\/ws\/hello/)) {
			let body = 'x ';
			req.on('data', function(data) {
				body += data;
				console.log('Partial body: ' + body);
			});
			req.on('end', function() {
				console.log('Body: ' + body);
				res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
				res.end(JSON.stringify({ hello: body }), 'utf8');
			});

			return;
		}
		res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
		res.end('WebServiceManager Not found.', 'utf8');
	}
}


module.exports = new WebServiceManager();

const express = require('express');
const serveIndex = require('serve-index');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.post('/ws/hello', (req, res, next) => {
	console.log('req.body', req.body);
	if (!req.body.name) {
		res.status(500).send('/ws/hello webservice failed: name missing.');
		return;
	}
	res.json({ hello: req.body.name });
});

app.post('/ws/hello2', (req, res, next) => {
	console.log('hello2 req.body', req.body);
	if (!req.body.name) {
		res.status(500).send('/ws/hello2 webservice failed: name missing.');
		return;
	}
	// let content = fs.readFileSync(path.resolve('./hello-result-ejs.html'));
	// content = ejs.render(content.toString(), req.body);
	// res.send(content);
	ejs.renderFile(path.resolve('./hello-result-ejs.html'), req.body, (err, str) => {
		if (err) {
			res.status(500).send('/ws/hello2 webservice failed: EJS Failed.');
			return;
		}
		res.send(str);
	});
	
});

app.use(express.static('.'));
app.use(serveIndex('.', { icons: true }));

app.use((req, res) => {
	console.log('req.url', req.url);
	res.status(404).sendFile('404.html', { root: __dirname });
});

app.listen(8000, function() {
	console.log('HTTP server started on port 8000');
});

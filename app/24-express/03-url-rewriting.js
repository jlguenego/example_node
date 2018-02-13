const express = require('express');
const serveIndex = require('serve-index');

const app = express();

app.use(express.static('.'));
app.use(serveIndex('.', { icons: true }));

app.use((req, res) => {
	res.sendFile('404.html', { root: __dirname });
});

app.listen(8000, function() {
	console.log('HTTP server started on port 8000');
});

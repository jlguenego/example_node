const express = require('express');
const serveIndex = require('serve-index');

const app = express();

app.use(express.static('.'));
app.use(serveIndex('.', { icons: true }));

app.listen(8000, function() {
	console.log('HTTP server started on port 8000');
});

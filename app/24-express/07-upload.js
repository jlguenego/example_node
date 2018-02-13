const express = require('express');
const serveIndex = require('serve-index');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');

mkdirp(path.resolve('./files'));

const app = express();

app.post('/ws/upload', upload.single('my-image'), function(req, res, next) {
	// req.file is the `avatar` file
	// req.body will hold the text fields, if there were any
	console.log('req.file', req.file);
	console.log('req.body', req.body);
	const orig = path.resolve(req.file.path);
	const dest = path.resolve('./files', req.file.originalname);
	fs.renameSync(orig, dest);
	res.send('File loaded');
});

app.use(express.static('.'));
app.use(serveIndex('.', { icons: true }));

app.listen(8000, function() {
	console.log('HTTP server started on port 8000');
});

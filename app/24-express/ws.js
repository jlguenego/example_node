const express = require('express');
const app = express.Router();
module.exports = app;

console.log('ws loading');

app.use((req, res, next) => {
	console.log('ws call', req.url);
	next();
});

app.get('/date', (req, res) => {
	console.log('date POST');
	res.json({ method: 'get', date: new Date() });
});

// Call this with POSTMAN.
app.post('/date', (req, res) => {
	console.log('date POST');
	res.json({  method: 'post', date: new Date() });
});

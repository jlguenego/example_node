const express = require('express');
const rest = require('./rest.js');
const app = express.Router();
module.exports = app;

app.use((req, res, next) => {
	console.log('ws call', req.url);
	next();
});

const resources = ['vehicle'];

resources.forEach((resource) => {
	app.use(`/${resource}`, rest.resource(resource));
});

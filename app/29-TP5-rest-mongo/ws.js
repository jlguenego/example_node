const express = require('express');
const mongoose = require('mongoose');
const rest = require('./rest.js');
const app = express.Router();
module.exports = app;

app.use((req, res, next) => {
	console.log('ws call', req.url);
	next();
});

const Ticket = mongoose.model('Ticket',
	new mongoose.Schema({
		number: { type: String, required: true, unique: true, index: true },
		category: String,
		movie: String
	}, {
		strict: false, // allow other field to be saved in MongoDB.
	}));

const User = mongoose.model('User',
	new mongoose.Schema({
		lastname: { type: String, required: true },
		firstname: { type: String, required: true },
	}, {
		strict: false, // allow other field to be saved in MongoDB.
	}));

mongoose.connect('mongodb://localhost/TP5');

const resources = [{ model: Ticket, rest: 'tickets' }, { model: User, rest: 'users' }];

resources.forEach((resource) => {
	app.use(`/${resource.rest}`, rest.resource(resource.model));
});

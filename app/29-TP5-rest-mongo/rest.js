const express = require('express');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');

class Rest {
	resource(model) {
		const app = express.Router();
		app.use(bodyParser.json());

		// create
		app.post('/', async (req, res, next) => {
			console.log('create req.url', req.url);
			try {
				const object = new model(req.body);
				await object.save();
				res.status(201).json({ content: object });
			} catch (e) {
				res.status(400).json({ error: e.message });
			}

		});

		// retrieve all
		app.get('/', async (req, res, next) => {
			console.log('retrieve all req.url', req.url);
			try {
				const resources = await model.find({});
				res.json({ content: resources });
			} catch (e) {
				res.status(400).json({ error: e.message });
			}
		});

		// retrieve one
		app.get('/:id', async (req, res, next) => {
			console.log('retrieve one req.url', req.url);
			try {
				const id = mongoose.Types.ObjectId(req.params.id);
				const resource = await model.findById(id);
				if (resource === null) {
					res.status(404).json({ error: 'Object not found' });
					return;
				}
				res.json({ content: resource });
			} catch (e) {
				res.status(400).json({ error: e.message });
			}
		});

		// update (strong rewrite)
		app.put('/:id', async (req, res, next) => {
			console.log('update put req.url', req.url);
			try {
				const id = mongoose.Types.ObjectId(req.params.id);
				let resource = await model.findById(id);
				if (resource === null) {
					res.status(404).json({ error: 'Object not found' });
					return;
				}
				await resource.update(req.body, {
					overwrite: true
				});
				resource = await model.findById(id);
				res.json({ content: resource });
			} catch (e) {
				res.status(400).json({ error: e.message });
			}
		});

		// update (small update with diff)
		app.patch('/:id', async (req, res, next) => {
			console.log('update put req.url', req.url);
			try {
				const id = mongoose.Types.ObjectId(req.params.id);
				let resource = await model.findById(id);
				if (resource === null) {
					res.status(404).json({ error: 'Object not found' });
					return;
				}
				await resource.update(req.body, {
					// PATCH want an overwrite set to false
					overwrite: false
				});
				resource = await model.findById(id);
				res.json({ content: resource });
			} catch (e) {
				res.status(400).json({ error: e.message });
			}
		});

		// delete one
		app.delete('/:id', async (req, res, next) => {
			console.log('delete one req.url', req.url);
			try {
				const id = mongoose.Types.ObjectId(req.params.id);
				let resource = await model.findById(id);
				if (resource === null) {
					res.status(404).json({ error: 'Object not found' });
					return;
				}
				await model.deleteOne({_id: req.params.id});
				res.json({ content: resource });
			} catch (e) {
				res.status(400).json({ error: e.message });
			}
		});

		// delete all
		app.delete('/', async (req, res, next) => {
			console.log('delete all req.url', req.url);
			try {
				await model.deleteMany({});
				res.status(204).end();
			} catch (e) {
				res.status(400).json({ error: e.message });
			}
		});

		return app;
	}
}

module.exports = new Rest();

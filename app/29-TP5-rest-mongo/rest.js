const express = require('express');
const bodyParser = require('body-parser');

class Rest {
	resource(name) {
		const app = express.Router();
		app.use(bodyParser.json());

		const resources = [];
		let id = 0;

		// create
		app.post('/', (req, res, next) => {
			console.log('create req.url', req.url);
			const resource = req.body;
			id++;
			resource.id = id;
			resources.push(resource);
			res.status(201).json({ content: resource });
		});

		// retrieve all
		app.get('/', (req, res, next) => {
			console.log('retrieve all req.url', req.url);
			res.json({ content: resources });
		});

		// retrieve one
		app.get('/:id', (req, res, next) => {
			console.log('retrieve one req.url', req.url);
			const resource = resources.find((r) => {
				console.log('req.params.id', req.params.id);
				return r.id === +req.params.id;
			});
			if (!resource) {
				res.status(404).send({ error: `resource ${name} not found for id ${req.params.id}` });
				return;
			}
			res.json({ content: resource });
		});

		// update (strong rewrite)
		app.put('/:id', (req, res, next) => {
			console.log('update put req.url', req.url);
			const resource = resources.find((r) => {
				return r.id === +req.params.id;
			});
			if (!resource) {
				res.status(404).send({ error: `resource ${name} not found for id ${req.params.id}` });
				return;
			}
			// remove the old resource
			const index = resources.findIndex((r) => {
				return r.id === +req.params.id;
			});
			resources.splice(index, 1);

			// create a new one with the old id.
			const newResource = req.body;
			newResource.id = +req.params.id;
			resources.push(newResource);
			resources.sort((a, b) => {
				return Math.sign(a.id - b.id);
			});

			res.json({ content: newResource });
		});

		// update (small update with diff)
		app.patch('/:id', (req, res, next) => {
			console.log('update patch req.url', req.url);
			let resource = resources.find((r) => {
				return r.id === +req.params.id;
			});
			if (!resource) {
				res.status(404).send({ error: `resource ${name} not found for id ${req.params.id}` });
				return;
			}
			// remove the old resource from the array
			const index = resources.findIndex((r) => {
				return r.id === +req.params.id;
			});
			resources.splice(index, 1);

			const newResource = Object.assign(resource, req.body);
			newResource.id = +req.params.id;
			resources.push(newResource);
			resources.sort((a, b) => {
				return Math.sign(a.id - b.id);
			});

			res.json({ content: newResource });
		});

		// delete one
		app.delete('/:id', (req, res, next) => {
			console.log('delete one req.url', req.url);
			const resource = resources.find((r) => {
				return r.id === +req.params.id;
			});
			if (!resource) {
				res.status(404).send({ error: `resource ${name} not found for id ${req.params.id}` });
				return;
			}
			// remove the old resource
			const index = resources.findIndex((r) => {
				return r.id === +req.params.id;
			});
			resources.splice(index, 1);

			res.json({ content: resource });
		});

		// delete all
		app.delete('/', (req, res, next) => {
			console.log('delete all req.url', req.url);

			// remove all
			resources.length = 0;
			res.status(204).json({ message: `all ${name} successfully deleted.` });
		});

		return app;
	}
}

module.exports = new Rest();

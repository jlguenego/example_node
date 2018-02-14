const express = require('express');


class Rest {
	resource(name) {
		const app = express.Router();
		app.use((req, res, next) => {
			console.log('rest req.url', req.url);
			res.send(`Resource ${name}`);
		});
		return app;
	}
}

module.exports = new Rest();
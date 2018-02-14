const MongoClient = require('mongodb').MongoClient;

// Use connect method to connect to the server
MongoClient.connect('mongodb://localhost:27017').then(client => {
	console.log('Connected successfully to server');
	client.close();
}).catch(e => {
	console.error(e.message);
	process.exit(1);
});

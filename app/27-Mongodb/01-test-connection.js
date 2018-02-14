const MongoClient = require('mongodb').MongoClient;

let client;

// Use connect method to connect to the server
MongoClient.connect('mongodb://localhost:27017').then(c => {
	console.log('Connected successfully to server');
	client = c;
}).then(() => {		
	client.close();
	console.log('Disconnected.');
}).catch(e => {
	console.error(e.message);
	process.exit(1);
});

const MongoClient = require('mongodb').MongoClient;

let client;
let db;
let collection;


// Use connect method to connect to the server
MongoClient.connect('mongodb://localhost:27017').then(c => {
	console.log('Connected successfully to server');
	client = c;
	db = client.db('MyFirstDatabase');
	collection = db.collection('documents');
}).then(() => {
	// select * from documents
	return collection.find({}).toArray();
}).then((docs) => {
	console.log('Documents successfully retrieved.', docs);	
	client.close();
	console.log('Disconnected.');
}).catch(e => {
	console.error(e.message);
	process.exit(1);
});

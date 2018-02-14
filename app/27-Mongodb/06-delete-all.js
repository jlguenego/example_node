const MongoClient = require('mongodb').MongoClient;

// Use connect method to connect to the server
async function main() {
	try {
		const client = await MongoClient.connect('mongodb://localhost:27017');
		console.log('Connected successfully to server');
		const db = client.db('MyFirstDatabase');
		const collection = db.collection('documents');
		const result = await collection.deleteMany({});
		console.log('Documents successfully deleted.', result.deletedCount);
		const docs = await collection.find().toArray();
		console.log('Documents successfully retrieved.', docs);
		client.close();
		console.log('Disconnected.');
	} catch (e) {
		console.error(e.message);
		process.exit(1);
	}
}

main();

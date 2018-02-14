const MongoClient = require('mongodb').MongoClient;

// Use connect method to connect to the server
MongoClient.connect('mongodb://localhost:27017').then(client => {
	console.log('Connected successfully to server');
	client.close();
	return client;
}).then(e => {
}).catch(e => {
	console.error(e.message);
	process.exit(1);
});

const insertDocuments = function(db, callback) {
	// Get the documents collection
	const collection = db.collection('documents');
	// Insert some documents
	collection.insertMany([
	  {a : 1}, {a : 2}, {a : 3}
	], function(err, result) {
	  assert.equal(err, null);
	  assert.equal(3, result.result.n);
	  assert.equal(3, result.ops.length);
	  console.log("Inserted 3 documents into the collection");
	  callback(result);
	});
  }
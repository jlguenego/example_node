const MongoClient = require('mongodb').MongoClient;
const axios = require('axios');
const async = require('async');
const util = require('util');
const asyncEach = util.promisify(async.each);

async function resetDB() {
	try {
		const client = await MongoClient.connect('mongodb://localhost:27017');
		const db = client.db('TP5');
		let list = await db.listCollections().toArray();
		list.forEach(async c => {
			await db.dropCollection(c.name);
		});
		list = await db.listCollections().toArray();
		await client.close();
	} catch (e) {
		console.error(e.message);
		process.exit(1);
	}
}

async function createUser(user) {
	const response = await axios.post('http://localhost:8000/ws/users', user);
	return response;
}

async function getDBState() {
	try {
		const client = await MongoClient.connect('mongodb://localhost:27017');
		const db = client.db('TP5');
        let list = await db.listCollections().toArray();
		const result = {
			TP5: {},
		};

		await asyncEach(list, async c => {
			const collection = db.collection(c.name);
			const array = await collection.find({}).toArray();
			array.forEach(d => {
				d._id = d._id.toString();
				delete d.__v;
			});
			result.TP5[c.name] = array;
        });
		await client.close();
		return result;
	} catch (e) {
		process.exit(1);
	}
}

module.exports = {
	resetDB,
	createUser,
	getDBState
};

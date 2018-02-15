const MongoClient = require('mongodb').MongoClient;
const axios = require('axios');

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

}

module.exports = {
	resetDB,
	createUser,
	getDBState
};

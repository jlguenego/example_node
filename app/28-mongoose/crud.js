const mongoose = require('mongoose');

async function main() {
	try {
		await mongoose.connect('mongodb://localhost/MyFirstDatabase');

		const Cat = mongoose.model('Cat',
			new mongoose.Schema({
				name: { type: String, required: true, unique: true },
				age: Number,
			}, {
				strict: false, // allow other field to be saved in MongoDB.
			}));

		let result = await Cat.remove({});
		console.log(`${result.n} cats have been deleted.`);
		const garfield = new Cat({ name: 'Garfield', toto: 123 });
		await garfield.save();
		const azrael = new Cat({ name: 'Azrael', age: 1 });
		await azrael.save();
		const cat = await Cat.findOne({ name: 'Azrael' });
		await garfield.update({ name: 'Garfield', age: 3 }, {
			// PUT or PATCH update.
			overwrite: false
		});

		console.log('cat.name', cat.name);
		await mongoose.connection.close();
		console.log('connection closed.');
	} catch (e) {
		console.error('error', e.message);
		process.exit(1);
	}

}

main();

const mongoose = require('mongoose');

async function main() {
	try {
		mongoose.connect('mongodb://localhost/MyFirstDatabase');

		const Cat = mongoose.model('Cat',
			new mongoose.Schema({
				name: {
					type: String,
					required: true,
					unique: true
				}
			}));

		let result = await Cat.remove({});
		console.log(`${result.n} cats have been deleted.`);
		const kitty = new Cat({ name: 'Garfield' });
		await kitty.save();
		const azrael = new Cat({ name: 'Azrael', age: 1 });
		await azrael.save();
		const cat = await Cat.findOne({ name: 'Azrael' });

		console.log('cat.name', cat.name);
		await mongoose.connection.close();
		console.log('connection closed.');
	} catch (e) {
		console.error('error', e.message);
		process.exit(1);
	}

}

main();

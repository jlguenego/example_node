const mongoose = require('mongoose');

async function main() {
	try {


		mongoose.connect('mongodb://localhost/MyFirstDatabase');

		const Cat = mongoose.model('Cat', { name: String });

		const kitty = new Cat({ name: 'Zildjian' });
		await kitty.save();
		const garfield = new Cat({ toto: 'Garfield' });
		await garfield.save();
		console.log('meow');
		mongoose.connection.close();
	} catch (e) {
        console.error('error', e);
        process.exit(1);
	}

}

main();

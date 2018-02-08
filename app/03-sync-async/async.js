const fs = require('fs');

fs.appendFile('kiki.txt', 'hello1\n', () => {
	fs.appendFile('kiki.txt', 'hello2\n', () => {
		fs.appendFile('kiki.txt', 'hello3\n', () => {
			fs.appendFile('kiki.txt', 'hello4\n', () => {
			});
		});
	});
});

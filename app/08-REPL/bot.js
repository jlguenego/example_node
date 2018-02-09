const repl = require('repl');

const replServer = repl.start('javascript> ');

// when invoking the command, prefix it with dot (.): .sayhello 
replServer.defineCommand('sayhello', {
	help: 'Say hello',
	action(name) {
		console.log(`Hello, ${name}!`);
		this.displayPrompt();
	}
});

const net = require('net');
const readline = require('readline');

// writing on a socket stream needs to know the encoding.
const c2sEncoding = 'utf16le';
const s2cEncoding = 'utf8';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const client = new net.Socket();

function sendMessage() {
    rl.question('> ', (answer) => {
		if (answer === 'bye') {
			rl.close();
            client.destroy(); // kill nicely client after server's response
            return;
        }
		client.write(answer, c2sEncoding);
	});
}

client.connect(1234, '127.0.0.1', function() {
	console.log('Connected');
	sendMessage();
});

client.on('data', function(data) {
	const string = data.toString(s2cEncoding);
    console.log('Received: ' + string);
    sendMessage();
});

client.on('close', function() {
	console.log('Connection closed');
});

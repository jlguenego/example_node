const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const client = new net.Socket();

function sendMessage() {
    rl.question('> ', (answer) => {
		if (answer === 'bye') {
			rl.close();
            client.destroy(); // kill client after server's response
            return;
        }
		client.write(answer);
	});
}

client.connect(1234, '127.0.0.1', function() {
	console.log('Connected');
	sendMessage();
});

client.on('data', function(data) {
    console.log('Received: ' + data);
    sendMessage();
});

client.on('close', function() {
	console.log('Connection closed');
});

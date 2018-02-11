const net = require('net');
const readline = require('readline');

// writing on a socket stream needs to know the encoding.
const c2sEncoding = 'utf16le';
const s2cEncoding = 'utf8';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const socket = new net.Socket();

function sendMessage() {
    rl.question('> ', (answer) => {
		if (answer === 'bye') {
			rl.close();
            socket.destroy(); // kill nicely client after server's response
            return;
        }
		socket.write(answer, c2sEncoding);
	});
}

socket.connect(1234, '127.0.0.1');

// once connected, the connects event is emitted.
socket.on('connect', () => {
	console.log('Connected');
	sendMessage();
});

// each time the socket receives data, the data event is emitted.
socket.on('data', function(data) {
	const string = data.toString(s2cEncoding);
    console.log('Received: ' + string);
    sendMessage();
});

socket.on('close', function() {
	console.log('Connection closed');
});

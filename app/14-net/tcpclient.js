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

// encoding when reading data from server. (not writing)
socket.setEncoding(s2cEncoding);

function sendMessage() {
    rl.question('> ', (answer) => {
		if (socket.destroyed) {
			rl.close();
			console.log('exit.');
			return;
		}
		if (answer === 'bye') {
			rl.close();
            socket.destroy('titi'); // kill nicely client after server's response
            return;
        }
		socket.write(answer, c2sEncoding);
	});
}

socket.connect(1234, '127.0.0.1');

// once connected, the connects event is emitted.
socket.on('connect', () => {
	console.log('Connected from:', socket.localAddress, socket.localPort);
	console.log('buffer size: ', socket.bufferSize);
	sendMessage();
});

// each time the socket receives data, the data event is emitted.
socket.on('data', function(data) {
	const string = data.toString(s2cEncoding);
    console.log('Received: ' + string);
    console.log('Byte readed: ' + socket.bytesRead);
    sendMessage();
});

socket.on('close', (...args) => {
	console.log('Connection closed', args);
});

socket.on('drain', (...args) => {
	console.log('written', args);
});

socket.on('error', (...args) => {
	console.log('error', args);
	rl.close();
});


socket.setTimeout(10000, (...args) => {
	console.log('socket timeout', args);
	rl.close();
    socket.destroy();
});

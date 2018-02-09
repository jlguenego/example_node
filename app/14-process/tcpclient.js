const net = require('net');

const client = new net.Socket();
client.connect(1234, '127.0.0.1', function() {
	console.log('Connected');
	client.write('BEGIN');
});

client.on('data', function(data) {
    console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});

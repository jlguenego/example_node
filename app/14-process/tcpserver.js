const net = require('net');

const server = net.createServer((socket) => {
    console.log('new connection', socket);
    socket.on('data', function(data) {
        const string = `${data}`;
        console.log('string', string);
        if (string === 'QUIT') {
            socket.end('Bye!');
            return;
        }
        socket.write(`Echo: ${data}\n`);
    });

    socket.on('error', (e) => {
        console.log('client socket error', e);
    });
    
}).on('error', (err) => {
	console.log('TCP server error', err);
	throw err;
});

server.listen(1234, () => {
	console.log('opened server on', server.address());
});

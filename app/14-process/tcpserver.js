const net = require('net');

const c2sEncoding = 'utf16le';
const s2cEncoding = 'utf8';

const server = net.createServer((socket) => {
    console.log('new connection', socket);
    socket.on('data', function(data) {
        const string = data.toString(c2sEncoding);
        console.log('string', string);
        if (string === 'QUIT') {
            socket.end('Bye!', s2cEncoding);
            return;
        }
        socket.write(`Echo: ${string}\n`, s2cEncoding);
    });

    socket.on('close', (hasError) => {
        // if the client is brutally killed (ex: with CTRL+C), then hasError is true.
        // if the client socket is stopped with socket.destroy() then hasError is false.
        console.log('client socket close', hasError);
    });

    socket.on('error', (e) => {
        console.log('client socket error', e);

    });
    
}).on('error', (e) => {
	console.log('TCP server error', e);
	throw e;
});

server.listen(1234, () => {
	console.log('opened server on', server.address());
});

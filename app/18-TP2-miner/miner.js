const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const crypto = require('crypto');
const fs = require('fs');

const difficulty = 5;
const zeroes = new Array(difficulty + 1).join('0');

const workerNbr = numCPUs;

if (process.argv.length < 3) {
	console.log('Syntax: node miner.js <filename>');
	process.exit(1);
}

const filename = process.argv[2];

const transaction = fs.readFileSync(filename).toString();

function mine(id) {
	let nonce = id;
	// eslint-disable-next-line
	while (true) {
		const hash = crypto.createHash('sha256');
		hash.update(transaction + nonce);
		const output = hash.digest('hex');
		if (output.startsWith(zeroes)) {
			const result = { output, nonce };
			console.log('result', result);
			return result;
		}
		nonce += workerNbr;
	}
}

if (cluster.isMaster) {
	console.log(`Master ${process.pid} is running`);

	// Fork workers.
	const workers = [];
	for (let i = 0; i < workerNbr; i++) {
		const worker = cluster.fork();
		workers.push(worker);
		worker.send(i);
		worker.on('message', message => {
            console.log('message from child:', message);
            while (workers.length) {
                const c = workers.pop();
                console.log('killing', c.process.pid);
                c.process.kill();
            }
		});
	}
	cluster.on('exit', (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} exit with code: ${code}`);
    });
    
    process.on('exit', () => {
        console.log(`mining took ${process.uptime()} seconds.`);
    });
} else {
	// we are in a child.
	process.on('message', id => {
		console.log('message from parent:', id);
		setTimeout(() => {
			const output = mine(id);
			if (process.send) {
				process.send(JSON.stringify(output));
			}
		}, 1000);

	});

	console.log(`Worker ${process.pid} started`);
}

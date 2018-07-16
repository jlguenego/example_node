const fs = require('fs');
const path = require('path');
const async = require('async');
const es = require('event-stream');
const { configure, client } = require('./lib/configure-elastic');



const queueSize = 8;

const taskHandler = function (task, done) {
    task(done);
};

const myQueue = async.queue(taskHandler, queueSize);

myQueue.drain = function () {
    console.log('The queue is now empty.');
    console.timeEnd('load-elastic');
};

async function main() {
    try {
        console.time('load-elastic');
        await configure();
        const csvFilename = path.resolve(__dirname, './input.csv');
        const readStream = fs.createReadStream(csvFilename);
        readStream
            .pipe(es.split('\n'))
            .pipe(es.map((line, cb) => {
                myQueue.push(async function (done) {
                    // console.log('line', line);
                    readStream.pause();
                    const [id, x, y] = line.split(';');
                    const obj = {
                        id: +id,
                        x: +x,
                        y: +y,
                    };

                    readStream.resume();
                    await client.index({
                        index: 'hello',
                        id: obj.id,
                        type: 'world',
                        body: obj
                    });
                    cb(null);
                    done();
                });
            }));

    } catch (e) {
        console.log('error', e);
    }
}

main();


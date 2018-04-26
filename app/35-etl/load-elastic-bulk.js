const fs = require('fs');
const path = require('path');
const es = require('event-stream');
const { configure, client } = require('./configure-elastic');

const BULK_SIZE = 30;

let myId = 0;

async function main() {
    try {
        await configure();
        const csvFilename = path.resolve(__dirname, './input.csv');
        const readStream = fs.createReadStream(csvFilename);
        let acc = [];
        const stream = readStream
            .pipe(es.split('\n'));

        stream.pipe(es.map(async (line, cb) => {
            myId++;
            const csvId = myId;
            stream.pause();
            console.log('pause', csvId);
            const [id, x, y] = line.split(';');
            const obj = {
                id: +id,
                x: +x,
                y: +y,
            };
            acc.push({ index: { _index: 'hello', _type: 'world', _id: obj.id } });
            acc.push(obj);
            console.log('acc.length', acc.length);
            if (acc.length >= BULK_SIZE * 2) {
                console.log('about to send bulk', csvId);
                const body = acc;
                acc = [];
                await client.bulk({ body });
                console.log('bulk sent', csvId);
            }
            console.log('resume', csvId);
            stream.resume();

            cb(null);
        }));
        // await client.bulk({ body: acc });
    } catch (e) {
        console.log('error', e);
    }
}

main();


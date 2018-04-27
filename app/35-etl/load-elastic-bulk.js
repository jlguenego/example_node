const fs = require('fs');
const path = require('path');
const es = require('event-stream');
const { configure, client } = require('./lib/configure-elastic');

const BULK_SIZE = 3000;

let myId = 0;

async function main() {
    try {
        await configure();
        console.time('load');
        const csvFilename = path.resolve(__dirname, './input.csv');
        const readStream = fs.createReadStream(csvFilename);
        let acc = [];
        const stream = readStream
            .pipe(es.split('\n'));

        stream.pipe(es.through(async (line) => {
            myId++;
            const csvId = myId;
            const [id, x, y] = line.split(';');
            if (isNaN(x)) {
                return;
            }
            const obj = {
                id: +id,
                x: +x,
                y: +y,
            };
            acc.push({ index: { _index: 'hello', _type: 'world', _id: obj.id } });
            acc.push(obj);
            // console.log('acc.length', acc.length);
            if (acc.length >= BULK_SIZE * 2) {
                // console.log('about to send bulk', csvId);
                const body = acc;
                acc = [];
                await client.bulk({ body });
                console.log('bulk sent', csvId);
            }
        }, async () => {
            const body = acc;
            acc = [];
            if (body.length > 0) {
                await client.bulk({ body });
            }
            console.log('last bulk sent');
            console.timeEnd('load');
        }));


    } catch (e) {
        console.log('error', e);
    }
}

main();


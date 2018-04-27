const fs = require('fs');
const path = require('path');
const es = require('event-stream');
const { configure, client } = require('./lib/configure-redis');

async function main() {
    try {
        console.time('redis');
        await configure();
        const csvFilename = path.resolve(__dirname, './input.csv');
        const readStream = fs.createReadStream(csvFilename);
        readStream
            .pipe(es.split('\n'))
            .pipe(es.through(async (line) => {
                const [id, x, y] = line.split(';');
                if (isNaN(x)) {
                    return;
                }
                const obj = {
                    id: +id,
                    x: +x,
                    y: +y,
                };
                await client.hmsetAsync(`point:${id}`, obj);
            }, async () => {
                console.log('about to quit');
                await client.quitAsync();
                console.timeEnd('redis');
            }));
        
    } catch (e) {
        console.log('error', e);
    }
}

main();


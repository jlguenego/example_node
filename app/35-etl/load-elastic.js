const fs = require('fs');
const path = require('path');
const es = require('event-stream');
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'warning'
});

async function configure() {
    try {
        await client.ping({
            // ping usually has a 3000ms timeout
            requestTimeout: 1000
        });
        console.log('Elasticsearch is on.');
        const alreadyExists = await client.indices.exists({
            index: 'hello'
        });
        if (alreadyExists) {
            console.log('Elasticsearch index hello already exists.');
            await client.indices.delete({
                index: 'hello'
            });
            console.log('Elasticsearch index hello deleted.');
        }
        await client.indices.create({
            index: 'hello'
        });
        console.log('Elasticsearch index hello created.');
    } catch (e) {
        console.log('error', e);
    }

}




async function main() {
    try {
        await configure();
        const csvFilename = path.resolve(__dirname, './input.csv');
        const readStream = fs.createReadStream(csvFilename);
        readStream
            .pipe(es.split('\n'))
            .pipe(es.map(async (line, cb) => {
                readStream.pause();
                const [id, x, y] = line.split(';');
                const obj = {
                    id: +id,
                    x: +x,
                    y: +y,
                };
                console.log('obj', obj);
                const response = await client.index({
                    index: 'hello',
                    id: obj.id,
                    type: 'world',
                    body: obj
                });
                console.log('response', response);
                readStream.resume();
                cb(null);
            }));

    } catch (e) {
        console.log('error', e);
    }


}

main();


const fs = require('fs');
const es = require('event-stream');
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    hosts: [
        'https://localhost:9200/'
    ]
});



async function main() {
    try {
        const csvFilename = 'input.csv';
        const readStream = fs.createReadStream(csvFilename);
        readStream
            .pipe(es.split('\n'))
            .pipe(es.map((line, cb) => {
                readStream.pause();
                const [id, value] = line.split(';');
                const obj = {
                    id: +id,
                    value
                };
                console.log('obj', obj);
                readStream.resume();
                cb(null);
            }));

    } catch (e) {
        console.log('error', e);
    }


}

main();


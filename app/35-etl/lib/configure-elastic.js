const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'warning'
});

async function configure() {
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
}

module.exports = { configure, client };
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'warning'
});

async function main() {
    try {
        await client.ping({
            // ping usually has a 3000ms timeout
            requestTimeout: 1000
        });
        console.log('All is well');
    } catch (e) {
        console.log('error', e);
    }
    
}

main();


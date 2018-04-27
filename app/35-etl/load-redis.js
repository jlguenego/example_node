// load from elasticsearch to redis.
const stream = require('stream');
const es = require('event-stream');
const { configure, client } = require('./lib/configure-redis');
const elasticClient = require('./lib/configure-elastic').client;
const { ReadableSearch } = require('elasticsearch-streams');

async function main() {
    try {
        console.time('redis');
        await configure();
        let scrollId;
        const readStream = new ReadableSearch((from, callback) => {
            if (scrollId !== undefined) {
                return elasticClient.scroll({
                    scrollId: scrollId,
                    scroll: '30s'
                }, callback);
            }
            // get a scroll id first

            elasticClient.search({
                index: 'hello',
                scroll: '20s',
                size: 42,
                body: {
                    query: { match_all: {} }
                }
            }, function (e, resp) {
                scrollId = resp._scroll_id;
                callback(e, resp);
            });
        });

        const writeStream = new stream.Writable({ objectMode: true });
        writeStream._write = async function (chunk, enc, next) {
            const source = chunk._source;
            // console.log('a hit', source);
            await client.hmsetAsync(`point:${source.id}`, 'id', source.id, 'x', source.x, 'y', source.y);
            next();
        };
        readStream
            .pipe(writeStream)
                .on('finish', async () => {
                console.log('about to quit');
                await client.quitAsync();
                console.timeEnd('redis');
            });

    } catch (e) {
        console.log('error', e);
    }
}

main();


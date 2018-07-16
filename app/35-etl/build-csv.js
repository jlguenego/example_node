const fs = require('fs');
const path = require('path');

async function main() {
    try {
        console.time('build csv');
        const csvFilename = path.resolve(__dirname, './input.csv');
        const writeStream = fs.createWriteStream(csvFilename);
        for (let i = 0; i < 10000; i++) {
            const x = Math.random() * Math.random() * 30;
            const y = Math.random() * Math.random() * 20;
            const line = [i, x, y].join(';');
            await writeStream.write(line + '\n', 'utf8');
        }
        writeStream.on('close', () => {
            console.log('end with success.');
            console.timeEnd('build csv');
        });
        writeStream.close();
        console.log('close order sent.');
        
    } catch (e) {
        console.log('error', e);
    }
}

main();


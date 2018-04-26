const fs = require('fs');
const path = require('path');

async function main() {
    try {
        const csvFilename = path.resolve(__dirname, './input.csv');
        const writeStream = fs.createWriteStream(csvFilename);
        for (let i = 0; i < 200; i++) {
            const x = Math.random() * 30;
            const y = Math.random() * 20;
            const line = [i, x, y].join(';');
            await writeStream.write(line + '\n', 'utf8');
        }
        writeStream.close();
        console.log('end with success.');
    } catch (e) {
        console.log('error', e);
    }
    

}

main();

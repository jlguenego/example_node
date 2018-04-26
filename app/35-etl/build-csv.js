const fs = require('fs');
const util = require('util');



async function main() {
    try {
        const csvFilename = 'input.csv';
        const writeStream = fs.createWriteStream(csvFilename);
        for (let i = 0; i < 20; i++) {
            const line = util.format('%s;%s\n', i.toString().padStart(8, 0), 'titi' + i);
            await writeStream.write(line, 'utf8');
        }
        writeStream.close();
        console.log('end with success.');
    } catch (e) {
        console.log('error', e);
    }
    

}

main();


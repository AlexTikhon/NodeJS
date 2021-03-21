import process from 'process';

import csv from 'csvtojson';
import fs from 'fs';
import { pipeline } from 'stream';

const csvFilePath = './csv/hw1-ex1-input.csv';
const resFile1Path = './output/hw1-ex1-task3-output.txt';
const resFile2Path = './output/hw1-ex2-task3-output.txt'

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(resFile1Path);

// task 1
// process.stdin.on('data', (data) => {
//     let chars = data.toString();
//     process.stdout.write([...chars].reverse().join('') + '\n' + '\n');     
// });


// task 2 - loaded into RAM
(async () => {
    try {
        const data = await csv().fromFile(csvFilePath);
        writeStream.write(JSON.stringify(data).slice(1, -1));
        console.log('File has been written and fully loaded into RAM')
    } catch (err){
        console.log(err);
    }
})();

// task 2 - doesn't loaded fully into RAM
pipeline(
    csv().fromStream(readStream),
    fs.createWriteStream(resFile2Path),
    (err) => {
      if (err) {
        console.error('Pipeline failed.', err);
      } else {
        console.log('Pipeline succeeded.');
      }
    }
);

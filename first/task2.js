const csv = require('csvtojson');
const fs = require('fs');
const { pipeline } = require('stream');

const csvFilePath = './csv/hw1-ex1-input.csv';
const resFile1Path = './output/hw1-ex1-output.txt';
const resFile2Path = './output/hw1-ex2-output.txt'

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(resFile1Path);


//      1-st: the file is loaded fully into the RAM
// csv()
// .fromFile(csvFilePath)
// .then((json) => {
//     fs.writeFile(
//       './output/hw1-ex1-output.txt',
//       JSON.stringify(json),
//       'utf8',
//       (err) => console.log(err)
//     );
// })


//      2-nd: the file is loaded fully into the RAM
(async () => {
    try {
        const data = await csv().fromFile(csvFilePath);
        writeStream.write(JSON.stringify(data).slice(1, -1));
        console.log('File has been written and fully loaded into RAM')
    } catch (err){
        console.log(err);
    }
})();


//      1-st: the file is not loaded fully in the RAM
// const readStream = fs.createReadStream(csvFilePath);
// const writeStream = fs.createWriteStream('./output/hw1-ex2-output.txt');
// readStream.pipe(csv()).pipe(writeStream);


//      2-nd: the file is not loaded fully in the RAM
// const readStream = fs.createReadStream(csvFilePath);
// const writeStream = fs.createWriteStream('./output/hw1-ex2-output.txt');
// csv().fromStream(readStream).subscribe().pipe(writeStream);


//      3-rd: the file is not loaded fully in the RAM
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
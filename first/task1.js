const process = require('process');

//  1-st variant
// process.stdin.on('data', (data) => {
//     let chars = data.toString();
//     let res = chars.split('');
//     process.stdout.write(res.reverse().join('') + '\n' + '\n');     
// });


//  2-nd
process.stdin.on('data', (data) => {
    let chars = data.toString();
    process.stdout.write([...chars].reverse().join('') + '\n' + '\n');     
});
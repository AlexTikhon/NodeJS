const process = require('process');

process.stdin.on('data', (data) => {
    let chars = data.toString();
    let res = chars.split('');
    process.stdout.write(res.reverse().join('') + '\n' + '\n');     
});
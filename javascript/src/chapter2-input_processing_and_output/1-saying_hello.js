const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What is your name? ', answer => {
    console.log(`Hello, ${answer}, nice to meet you!`);
    rl.close();
});



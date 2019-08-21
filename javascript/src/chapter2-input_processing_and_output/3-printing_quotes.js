const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt('What is the quote? ');
rl.prompt();

new Promise((resolve) => {
    rl.on('line', input => resolve(input));
}).then(a1 => {
    rl.setPrompt('Who said it? ');
    rl.prompt();
    return new Promise(resolve => {
        rl.on('line', a2 => resolve([a1, a2]));
    })
}).then(result => {
    console.log(result[1] + 'says, "' + result[0] + '"');
    rl.close();
});

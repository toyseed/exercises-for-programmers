const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


(function question() {
    rl.question('What is the input string? ', answer => {
        if (answer.length > 0) {
            console.log(`${answer} has ${answer.length} characters.`);
            rl.close();
        } else {
            console.log('type anything');
            question();
        }
    })
})();


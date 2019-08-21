const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const query = (() => {
    let answers = [];

    return (query) => {
        return (input) => {
            return new Promise(resolve => {
                rl.question(query, input => {
                    answers.push(input);
                    resolve(answers);
                })
            });
        }
    }
})();

Promise.resolve()
    .then(query('Enter a noun: '))
    .then(query('Enter a verb: '))
    .then(query('Enter an adjective: '))
    .then(query('Enter an adverb: '))
    .then(answers => {
        console.log(`Do you ${answers[1]} your ${answers[2]} ${answers[0]} ${answers[3]}? That's hilarious!`);
        rl.close();
    });

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => {
        rl.question(query, input => resolve(input));
    })
};

function questionForNumber(query) {
    return new Promise((resolve, reject) => {
        rl.question(query, input => {
            if (input === '') {
                resolve('');
            } else if (isNaN(input)) {
                reject();
            } else {
                resolve(+input);
            }
        });
    }).catch(() => {
        return questionForNumber(query);
    })
}
function close() {
    rl.close();
}

module.exports = {question, questionForNumber, close};

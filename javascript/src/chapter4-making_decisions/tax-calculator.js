const ru = require('../util/read-util');

(async () => {
    const answer = await question();
    const tax = getTax(answer.amount, answer.state);
    let result = '';

    if (answer.state.toUpperCase() === "WI") {
        result += `The subtotal is $${answer.amount}\nThe Tax is $${tax}\n`;
    }

    result += `The total is $${answer.amount + tax}`;
    console.log(result);
})();

function getTax(amount, state) {
    const taxRate = getTaxRate(state);

    return Math.floor(amount / 100 * taxRate * 100) / 100;
}

function getTaxRate(state) {
    let taxRate = 5.5;

    switch (state.toUpperCase()) {
        case 'WI':
            taxRate = 5.5;
            break;
    }

    return taxRate;
}
async function question() {
    const amount = await ru.questionForNumber('What is the order amount? ');
    const state = await ru.question("What is the state? ");

    ru.close();
    return {amount, state};
}
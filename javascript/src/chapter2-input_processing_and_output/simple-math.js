const ru = require('../util/read-util');

(async function math() {
    const num1 = await getNumber('What is the first number? ');
    const num2 = await getNumber('What is the second number? ');

    console.log(`${num1} + ${num2} = `, +num1 + +num2
        , `\n${num1} - ${num2} = `, +num1 - +num2
        , `\n${num1} * ${num2} = `, +num1 * +num2
        , `\n${num1} / ${num2} = `, +num1 / +num2
    );

    ru.close();
})()

async function getNumber(query) {
    let number;

    while(true) {
        number = await ru.question(query);
        if (!isNaN(number) && +number > 0) {
            return +number;
        }
    }
}

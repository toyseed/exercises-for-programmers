const ru = require('../util/read-util');

(async function calc() {
    const input1 = await ru.question('What is your current age? ');
    const input2 = await ru.question('At what age would you like to retire? ');

    const currentAge = +input1;
    const retireAge = +input2;

    if (currentAge > retireAge) {
        console.log('it seems you already retired.');
        ru.close();
        return;
    }

    const year = new Date().getFullYear();

    console.log(`You have ${retireAge - currentAge} years left until you can retire.`);
    console.log(`It's ${year}, so you can retire in ${year + (retireAge - currentAge)}.`);

    ru.close();
})()


/***
 * exercise 28 adding number
 */

const ru = require('../util/read-util');

(async () => {
  const times = await ru.questionForNumber(
    'how many times do you want to add? '
  );

  let result = 0;

  for (let i = 0; i < times; i++) {
    const num = await ru.question('enter a number: ');
    if (!isNaN(num)) {
      result += +num;
    }
  }

  console.log(`The total is ${result}.`);
})();

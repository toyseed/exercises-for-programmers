/***
 * exercise 29 handling bad input
 */

const ru = require('../util/read-util');

(async () => {
  while (true) {
    const num = await ru.question('what is the rate of return? ');
    if (isNaN(num) || num == 0) {
      console.log("sorry. that's not a valid input.");
      continue;
    }

    console.log(`it will take ${72 / +num} years to double your initial investment.`);
    break;
  }
})();

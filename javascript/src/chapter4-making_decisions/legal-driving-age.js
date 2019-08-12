(async function main() {
  const ru = require('../util/read-util');
  let age = await ru.questionForNumber('What is your age? ');

  while (age < 1) {
      console.log('you should endter positive number');
      age = await ru.questionForNumber('What is your age? ');
  }

  ru.close();

  console.log(`You are ${age < 16 ? 'not ' : ''}old enough to legally drive`);
})();

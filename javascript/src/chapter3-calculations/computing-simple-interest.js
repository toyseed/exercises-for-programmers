const ru = require('../util/read-util');

(async () => {
  const principal = await ru.questionForNumber('Enter the principal: ');
  const interestRate = await ru.questionForNumber(
    'Enter the rate of interest: '
  );
  const years = await ru.questionForNumber('Enter the number of years: ');

  for (let i = 1; i <= years; i++) {
    console.log(
      `after ${i} year: $${calculateSimpleInterest(principal, interestRate, i)}`
    );
  }

  ru.close();
})();

function calculateSimpleInterest(principal, interestRate, years) {
  return principal + ((principal * interestRate) / 100) * years;
}

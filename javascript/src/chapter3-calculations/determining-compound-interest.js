const ru = require('../util/read-util');

(async () => {
  const principal = await ru.questionForNumber(
    'What is the principal amount|goal? '
  );
  const rate = await ru.questionForNumber('What is the rate: ');
  const years = await ru.questionForNumber('What is the number of years: ');
  const times = await ru.questionForNumber(
    'What is the number of times the interest is compounded per year: '
  );

  console.log(
    `$${principal} invested at ${rate}% for ${years} compounded ${times} per year is $${calcCompoundedInterest(
      principal,
      rate,
      years,
      times
    )}`
  );

  console.log(
    `if your goal is $${principal}, you should invest $${calcPrincipal(
      principal,
      rate,
      years,
      times
    )}`
  );

  ru.close();
})();

function calcCompoundedInterest(principal, rate, years, times) {
  return (
    Math.ceil(
      principal * Math.pow(1 + rate / 100 / times, times * years) * 100
    ) / 100
  );
}

function calcPrincipal(goal, rate, years, times) {
  return (
    Math.ceil((goal / Math.pow(1 + rate / 100 / times, times * years)) * 100) /
    100
  );
}

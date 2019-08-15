/***
 * exercise 27 months to pay of a credit card
 *
 */

const ru = require('../util/read-util');

function calculateMonthsUntilPaidOff(balance, apr, monthlyPayment) {
  // formula source:
  // https://money.stackexchange.com/questions/64639/how-to-calculate-the-number-of-months-until-a-loan-is-paid-off-given-principal
  const monthlyAPR = apr / 100 / 12;
  const result =
    (-1 * Math.log(1 - (monthlyAPR * balance) / monthlyPayment)) /
    Math.log(1 + monthlyAPR);

  return Math.ceil(result);
}

function calculateMonthlyPaymentUntilPaidOff(balance, apr, months) {
  const monthlyAPR = apr / 100 / 12;
  const result =
    (-1 * monthlyAPR * balance) /
    (Math.exp(-1 * months * Math.log(1 + monthlyAPR)) - 1);

  return Math.ceil(result * 100) / 100;
}

(async () => {
  const balance = await ru.questionForNumber('what is your balance? ');
  const apr = await ru.questionForNumber(
    'what is the APR on the card (as a percent)? '
  );
  const monthlyPayment = await ru.questionForNumber(
    'what is the monthly payment you can make? '
  );

  const months = calculateMonthsUntilPaidOff(balance, apr, monthlyPayment);
  console.log(`it will take you ${months} months to pay off this card.`);

  // challenge
  const monthsWantToPay = await ru.questionForNumber(
    'what is number of month you want to pay? '
  );
  const expectedMonthlyPayment = calculateMonthlyPaymentUntilPaidOff(
    balance,
    apr,
    monthsWantToPay
  );
  console.log(`you need to pay $${expectedMonthlyPayment} per month.`);
})();

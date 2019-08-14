const ru = require('../util/read-util');

// const stateCodeMap = { wi: 'wisconsin', 'wisconsin': 'wisconsie' } ...
// const countyCodeMap = { ec: 'eau claire', 'eau claire': 'eau claire' } ...

const getTaxCalculator = (stateName, countyName) => {
  const stateMap = {
    wisconsin: {
      tax: 0.055,
      county: {
        'eau claire': {
          tax: 0.005
        },
        dunn: {
          tax: 0.004
        }
      }
    },
    illinois: {
      tax: 0.08
    }
  };

  const noTax = { tax: 0 };
  const state = stateMap[stateName.toLowerCase()] || noTax;
  const county =
    state.county && state.county[countyName.toLowerCase()]
      ? state.county[countyName.toLowerCase()]
      : noTax;

  return {
    calStateTax: amount => Math.floor(amount * state.tax * 100) / 100,
    calCountTax: amount => Math.floor(amount * county.tax * 100) / 100
  };
};

const getResultText = (state, stateTax, countyTax, amount) => {
  let resultText = '';

  if (
    state.toLowerCase() === 'wisconsin' ||
    state.toLowerCase() === 'illinois'
  ) {
    resultText +=
      `"The state tax is $${stateTax}."` +
      `\n"The county tax is $${countyTax}` +
      `\n"The total tax is $${Math.floor((stateTax + countyTax) * 100) / 100}"\n`;
  }

  resultText += `"The total is $${Math.floor((amount + stateTax + countyTax) * 100) / 100}`;

  return resultText;
};

(async () => {
  const amount = await ru.questionForNumber('What is the order amount? ');
  const state = await ru.question('what state do you live in? ');
  const county = await ru.question('What county do you live in? ');

  const taxCalculator = getTaxCalculator(state, county);
  const stateTax = taxCalculator.calStateTax(amount);
  const countyTax = taxCalculator.calCountTax(amount);

  console.log(getResultText(state, stateTax, countyTax, amount));
})();

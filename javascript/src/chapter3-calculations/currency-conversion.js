const ru = require('../util/read-util');
const https = require('https');

(async () => {
  const fromAmount = await ru.questionForNumber(
    'How many Euros are you exchanging? '
  );

  // const fromRate = await ru.questionForNumber('What is the exchange rate? ');
  const toCurrency = await ru.question('What is the currency? ');
  const currencyRages = await fetchCurrencyRates('EUR');

  const fromRate = currencyRages[toCurrency];

  if (!fromRate) {
    console.log('not supported currency.');
    ru.close();
    return;
  }

  console.log(
    `${fromAmount} Euros at an exchange rate of ${fromRate} is ${exchange(
      fromAmount,
      fromRate
    )} ${toCurrency}`
  );

  ru.close();
})();

function exchange(amount, rate) {
  return Math.ceil((amount * rate) * 100) / 100;
}

// https://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies/
function fetchCurrencyRates(currency) {
  return new Promise((resolve, reject) => {
    const request = https.get(
      `https://api.exchangeratesapi.io/latest?base=${currency}`,
      response => {
        const body = [];
        response.on('data', chunk => body.push(chunk));
        response.on('end', () => {
            const result = JSON.parse(body.join(''));
          resolve(result.rates);
        });
      }
    );

    request.on('error', err => reject(err));
  });
}

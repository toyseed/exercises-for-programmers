const ru = require('../util/read-util');

(async () => {
  const peoples = await ru.questionForNumber('How many people? ');
  const pizzas = await ru.questionForNumber('How many pizzas do you have? ');
  console.log('');
  const pieces = await ru.questionForNumber('How many pieces are in a pizza? ');
  const piecesPerPerson = Math.floor((pizzas * pieces) / peoples);
  const leftover = (pizzas * pieces) % peoples;

  console.log(`${peoples} people with ${pizzas} pizza${s(pizzas)}`);
  console.log(
    `Each person gets ${piecesPerPerson} piece${s(piecesPerPerson)} of pizza.`
  );
  console.log(`There are ${leftover} leftover piece${s(leftover)}.`);

  console.log();
  const piecesWanted = await ru.questionForNumber(
    'How many pieces of pizza do you want per porson? '
  );
  const neededPizzas = Math.ceil((piecesWanted * peoples) / pieces);
  console.log(`You need ${neededPizzas} pizza${s(neededPizzas)}`);

  ru.close();
})();

function s(num) {
  return num > 1 ? 's' : '';
}

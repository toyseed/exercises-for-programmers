/**
 * exercise 35 picking winner
 *
 * TODO:
 * - challenge2 gui, render shuffle
 * - divide program to picker and generator
 */


const ru = require('../util/read-util');

(async () => {
  let names = [];

  while (true) {
    let name = await ru.question('enter a name: ');

    if (!name || name === '') {
      let length = names.length;
      let picked = Math.floor(Math.random() * length);
      let pickedName = names[picked];

      names.splice(picked, 1);
      console.log(`The winner is... ${pickedName}`);
      console.log('participants--------------');
      names.forEach(name => console.log(name));
      continue;
    } else if (names.findIndex(n => n === name) >= 0) {
      console.log('duplicated name');
      continue;
    }

    names.push(name);
  }
})();
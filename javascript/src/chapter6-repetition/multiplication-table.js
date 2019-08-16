/***
 * exercise 30 multiplication table
 */


function printMultiplication(i) {
    for (let j = 0; j < 13; j++) {
      console.log(`${i} x ${j} = ${i * j}`);
    }
}

function printMultiplicationTable() {
  let base = [];

  for (let i = 0; i < 13; i++) {
    base.push(i);
  }

  let header = '\t|' + base.join('\t|');
  console.log(header);

  for (let i = 0; i < base.length; i++) {
    let num = base[i];
    let row = [num];

    for (let j = 0; j < 13; j++) {
      row.push(num * j);
    }
    console.log(row.join('\t|'));
  }
}

function printMultiplicationTable0to12() {
  for (let i = 0; i < 13; i++) {
    printMultiplication(i);
  }
}

async function printMultiplicationTableFromInput() {
  const ru = require('../util/read-util');
  const num = await ru.questionForNumber('multiplication :');

  printMultiplication(num);
}

(async () => {
  printMultiplicationTable0to12();
  printMultiplicationTable();
  await printMultiplicationTableFromInput();

})();

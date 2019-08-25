/**
 * exercise 42 parsing data file
 * ## TODO: challenges
 *
 * - [x] dollar format
 * - [x] order by salary
 * - [-] use csv parsing library
 *
 * ## reference
 *
 * - number format
 *  - <https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat>
 *  - <https://doolyit.tistory.com/127>
 */

const readline = require('readline');
const fs = require('fs');
const { printTable } = require('../util/print-util');
function member([last, first, salary]) {
  return {
    last,
    first,
    salary
  };
}

// const dollarFormat = /\B(?=(\d{3})+(?!\d))/g;
const dollarFormatter = new Intl.NumberFormat('arab', {
  style: 'currency',
  currency: 'USD'
});
function dollar(number) {
  // way 1
  // return ('$' + number).replace(dollarFormat, ',');
  // way 2
  return dollarFormatter.format(number);
}

async function readCSV(path) {
  const rl = readline.createInterface({
    input: fs.createReadStream(path),
    crlfDelay: Infinity
  });

  let lines = [];
  for await (let line of rl) {
    lines.push(member(line.split(',').map(column => column.trim())));
  }
  rl.close();
  return lines;
}

(async () => {
  const path = __dirname + '/parsing-data-file.csv';
  const fileData = await readCSV(path);

  printTable(
    fileData
      .sort((v1, v2) =>
        // v1.last.toLowerCase() > v2.last.toLowerCase() ? 1 : -1
        v2.salary - v1.salary
      )
      .map(each => {
        return {
          Last: each.last,
          First: each.first,
          Salary: dollar(+each.salary)
        };
      })
  );

  process.exit(0);
})();

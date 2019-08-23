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

function rpad(src, pad, length) {
  if (src.length > length) {
    return src;
  }

  while (src.length < length) {
    src += pad;
  }

  return src;
}

// 이름 짓기 너무 어렵다.
function printTable(data) {
  let columns = [];

  for (let column in data[0]) {
    if (data[0].hasOwnProperty(column))
    columns.push({ name: column, length: 0 });
  }

  // find max length
  for (let each of data) {
    for (let column of columns) {
      if (column.length < each[column.name].length) {
        column.length = each[column.name].length;
      }
    }
  }

  // print title
  let head = '';
  let divider = '';
  for (let column of columns) {
    head += rpad(column.name, ' ', column.length + 1);
    divider += rpad('', '-', column.length + 1);
  }
  console.log(head);
  console.log(divider);

  // print data
  for (let each of data) {
    let row = '';
    for (let column of columns) {
      row += rpad(each[column.name], ' ', column.length + 1);
    }
    console.log(row);
  }
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

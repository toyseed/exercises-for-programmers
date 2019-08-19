/**
 * exercise 49 filtering records
 * challenges
 * - [x] case sensitive
 * - [x] position search option
 * - [x] separation date search option
 * - [x] read data from file
 */

const readline = require('readline');
const fs = require('fs');
const ru = require('../util/read-util');

async function readData() {
  const rl = readline.createInterface({
    input: fs.createReadStream(__dirname + '/record.csv'),
    crlfDelay: Infinity
  });

  let result = [];
  let lineNum = 0;
  let columns = [];

  //https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line
  for await (let line of rl) {
    if (lineNum++ === 0) {
      columns = line.split(',').map(each => each.trim());
    } else {
      let row = line.split(',').map(each => each.trim());
      let rowMap = {};

      for (let i in row) {
        rowMap[columns[i]] = row[i];
      }
      result.push(rowMap);
    }
  }
  return result;
}

(async () => {
  const data = await readData();
  console.table(data);
  const term = await ru.question('enter a search string: ');

  let filtered = data.filter(
    each =>
      each['First Name'].indexOf(term) > -1 ||
      each['Last Name'].indexOf(term) > -1 ||
      each['Position'].indexOf(term) > -1
  );
  console.table(filtered);
  console.log('have worked more than 6 months : ');

  filtered = data.filter(each => {
    let separationDate = each['Separation date'];
    let basis = new Date();
    basis.setMonth(basis.getMonth() - 6);

    return (
      separationDate &&
      separationDate !== '' &&
      new Date(separationDate).getTime() < basis.getTime()
    );
  });

  console.table(filtered);
})();

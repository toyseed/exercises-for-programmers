/**
 * exercise 41 name sorter
 * TODO: challenges
 * - [x] read name from user input and write to file
 * - [-] big data performance
 * - [-] compare with functional language
 */

const readline = require('readline');
const fs = require('fs');
const ru = require('../util/read-util');

async function readFile() {
  const rl = readline.createInterface({
    input: fs.createReadStream(__dirname + '/name-sorter', {
      encoding: 'utf-8'
    }),
    crlfDelay: Infinity
  });

  return new Promise(resolve => {
    let maxLength = 0;
    let lines = [];
    rl.on('line', line => {
      if (maxLength < line.length) {
        maxLength = line.length;
      }
      if (line.trim() !== '') {
        lines.push(line);
      }
    }).on('close', () => {
      resolve({ maxLength, lines });
    });
  });
}

function writeFile(lines) {
  const file = fs.createWriteStream(__dirname + '/name-sorter', {
    encoding: 'utf-8'
    // flags: 'a'
  });
  const EOL = require('os').EOL;
  file.write(lines.join(EOL));
  file.close();
}

function print(char, times) {
  let str = '';
  for (let i = 0; i < times; i++) {
    str += char;
  }

  console.log(str);
}

function printTotal(lines, maxLength, sorter) {
  if (sorter) {
    lines.sort(sorter);
  }

  console.log(`Total of ${lines.length} names`);
  print('-', maxLength);
  for (let line of lines) {
    console.log(line);
  }
}

(async () => {
  let data = await readFile();
  let lines = data.lines;
  let maxLength = data.maxLength;
  const sorter = (line1, line2) => {
    return line1.toLowerCase() > line2.toLowerCase() ? 1 : -1;
  };
  printTotal(lines, maxLength, sorter);

  while (true) {
    let name = await ru.question('enter new name: ');

    if (!name || name.trim() === '') {
      break;
    }

    lines.push(name);
  }

  writeFile(lines.sort(sorter));
  data = await readFile();
  lines = data.lines;
  maxLength = data.maxLength;

  printTotal(lines, maxLength);

  process.exit(0);
})();

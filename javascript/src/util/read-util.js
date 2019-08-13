const readline = require('readline');

function question(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(query, input => {
      rl.close();
      resolve(input);
    });
  });
}

function questionForNumber(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    rl.question(query, input => {
      rl.close();
      if (input === '') {
        resolve('');
      } else if (isNaN(input)) {
        reject();
      } else {
        resolve(+input);
      }
    });
  }).catch(() => {
    return questionForNumber(query);
  });
}
function close() {}

module.exports = { question, questionForNumber, close };

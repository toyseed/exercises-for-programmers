/**
 * exercise 47 who's in space?
 */

const http = require('http');
const { printTable } = require('../util/print-util');

async function fetch() {
  return new Promise((resolve, reject) => {
    http.get('http://api.open-notify.org/astros.json', response => {
      const body = [];
      response.on('data', chunk => {
        body.push(chunk);
      });
      response.on('end', () => {
        const response = JSON.parse(body.join(''));
        if (response['message'] === 'success') {
          resolve(response['people']);
        } else {
          reject(response);
        }
      });
    });
  });
}

(async () => {
  const people = await fetch();

  people.push({name: 'And More', craft: 'BUT'});  // for test
  people.push({name: 'Hand Less', craft: 'BUT'});  // for test
  const lastNameRegex = /\b[^\s]+$/;
  printTable(
    people
      .sort((p1, p2) => {
        const lastName1 = lastNameRegex.exec(p1.name)[0];
        const lastName2 = lastNameRegex.exec(p2.name)[0];
        return p1.craft > p2.craft
          ? 1
          : p1.craft === p2.craft && lastName1 > lastName2
          ? 1
          : -1;
      })
      .map(each => ({ Name: each.name, Craft: each.craft }))
  );
  process.exit(0);
})();

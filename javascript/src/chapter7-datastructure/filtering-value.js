/**
 * exercise 38 filtering value
 */

const ru = require('../util/read-util');

function split(input, separator) {
  let result = [];
  let each = '';

  for (let i = 0; i < input.length; i++) {
    if (input.charAt(i) === separator && each !== '') {
      result.push(+each);
      each = '';
    } else if (input.charAt(i) !== separator) {
      each += input.charAt(i);
    }
  }

  if (each !== '') {
    result.push(+each);
  }

  return result;
}

function filterEvenNumber(srcArray) {
  let result = [];

  for (let each of srcArray) {
    if ((each & 1) === 0) {
      result.push(each);
    }
  }

  return result;
}

(async () => {
  const input = await ru.question('enter a list of numbers, separated by spaces: ');
  const splitInput = split(input, ' ');

  console.log(`the even numbers are ${filterEvenNumber(splitInput).join(' ')}`);
})();
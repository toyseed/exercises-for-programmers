/**
 * exercise 36 computing statistics
 */

// const ru = require('../util/read-util');
const fs = require('fs');

function avg(numbers) {
  const sum = numbers.reduce((sum, item) => sum + item);
  return sum / numbers.length;
}

function min(numbers) {
  return numbers.reduce((before, current) =>
    before > current ? current : before
  );
}

function max(numbers) {
  return numbers.reduce((before, current) =>
    before < current ? current : before
  );
}

function sd(numbers) {
  const average = avg(numbers);

  let sum = numbers.reduce((sum, item) => sum + Math.pow(average - item, 2), 0);
  return Math.sqrt(sum / numbers.length);
}

const challenge = function() {
  const content = fs.readFileSync(__dirname + '/computing-statistics', {
    encoding: 'utf-8'
  });

  const numbers = content
    .split('\n')
    .filter(value => value && value.trim() !== '' && !isNaN(value))
    .map(line => +line);

  let average = avg(numbers);
  let minimum = min(numbers);
  let maximum = max(numbers);
  let standardDeviation = sd(numbers);

  console.log('numbers: ', numbers.join(', '));
  console.log(`the average is ${average}.`);
  console.log(`the minimum is ${minimum}.`);
  console.log(`the maximum is ${maximum}`);
  console.log(`the standard deviation is ${standardDeviation.toFixed(2)}`);
};

(() => {
  const content = fs.readFileSync(__dirname + '/computing-statistics', {
    encoding: 'utf-8'
  });

  const numbers = content
    .split('\n')
    .filter(value => value && value.trim() !== '' && !isNaN(value))
    .map(line => +line);

  let sum = 0;
  let min;
  let max;
  let avg;
  let standardDeviation;

  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];

    if (min) {
      min = min > numbers[i] ? numbers[i] : min;
    } else {
      min = numbers[i];
    }

    if (max) {
      max = max < numbers[i] ? numbers[i] : max;
    } else {
      max = numbers[i];
    }
  }

  avg = sum / numbers.length;
  let subSum = 0;
  for (let i = 0; i < numbers.length; i++) {
    subSum += Math.pow(avg - numbers[i], 2);
  }

  standardDeviation = Math.sqrt(subSum / numbers.length);
  console.log('numbers: ', numbers.join(', '));
  console.log(`the average is ${avg}.`);
  console.log(`the minimum is ${min}.`);
  console.log(`the maximum is ${max}`);
  console.log(`the standard deviation is ${standardDeviation.toFixed(2)}`);

  challenge();
})();

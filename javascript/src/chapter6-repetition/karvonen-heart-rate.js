/***
 * exercise 31 karvonen heart rate
 */

const ru = require('../util/read-util');

function rpad(str, padLength, padChar) {
  if (str.length >= padLength) {
    return str;
  }

  while (str.length !== padLength) {
    str += padChar;
  }

  return str;
}

function c(str,pad) {
  return rpad(str, 10, pad);
}

function r(c1, c2, pad) {
  if (!pad) {
    pad = ' ';
  }

  return c(c1, pad) + '|' + c(c2, pad);
}

function calcTargetHeartRate(age, pulse, intensity) {
  return Math.floor((220 - age - pulse) /100 * intensity + pulse);
}

(async () => {
  const pulse = await ru.questionForNumber('resting pulse: ');
  const age = await ru.questionForNumber('age: ');

  console.log(`Resting Pulse: ${pulse} Age: ${age}`);
  console.log(`${r('Intensity', 'Rate')}`);
  console.log(`${r('-', '-', '-')}`);

  let targetHeartRate;
  for (let i = 55; i < 100; i += 5) {
    targetHeartRate = calcTargetHeartRate(age, pulse, i);
    console.log(`${r(i + '%', targetHeartRate + ' bpm')}`);
  }
})();
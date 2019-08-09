const ru = require('../util/read-util');

(async () => {
  const unit = await ru.question('select input unit (feet/meter):');
  if (unit !== 'feet' && unit !== 'meter') {
    console.log('wrong unit');
    ru.close();
    return;
  }

  const num1 = await ru.questionForNumber(
    `What is the length of the room in ${unit}? `
  );
  const num2 = await ru.questionForNumber(
    `What is the width of the room in ${unit}? `
  );

  if (unit === 'feet') {
    print(num1, num2, feetToMeter(num1, num2), 'feet', 'meter');
  } else if (unit === 'meter') {
    print(num1, num2, meterToFeet(num1, num2), 'meter', 'feet');
  }

  ru.close();
})();

const feetToMeterRate = 0.09290304;

function feetToMeter(num1, num2) {
  return Math.round(num1 * num2 * feetToMeterRate * 1000) / 1000;
}

function meterToFeet(num1, num2) {
    return Math.round((num1 * num2) / feetToMeterRate * 1000) / 1000;
}

function print(num1, num2, result, fromUnit, toUnit) {
  console.log(`You entered dimensions of ${num1} ${fromUnit} by ${num2} ${fromUnit}`);
  console.log('The area is');
  console.log(`${num1 * num2} square ${fromUnit}`);
  console.log(`${result} square ${toUnit}s`);
}

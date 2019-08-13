const ru = require('../util/read-util');

(async () => {
  const weight = await ru.questionForNumber('what is your weight in pound: ');
  const height = await ru.questionForNumber('what is your height in inch: ');

  const bmi = calcBMI(weight, height);
  console.log(`your bmi is ${bmi}`);
  if (bmi < 18.5) {
    console.log('you are underweight. you should see your doctor.');
  } else if (bmi > 25) {
    console.log('you are overweight. you should see your doctor.');
  } else {
    console.log('you are within the ideal weight range.');
  }
})();

function calcBMI(weight, height) {
  return Math.round((weight / (height * height)) * 703 * 100) / 100;
}
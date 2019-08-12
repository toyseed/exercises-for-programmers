(async () => {
  const ru = require('../util/read-util');

  const totalAlcohol = await ru.questionForNumber('total alcohol(oz): ');
  const weight = await ru.questionForNumber('weight(pound): ');
  const gender = await ru.question('gender(m/f): ');
  const hours = await ru.questionForNumber(
    'the number of hours after drinking: '
  );
  ru.close();

  const bac = calcBAC(totalAlcohol, weight, gender, hours);

  if (bac >= 0.08) {
    console.log('your BAC is ' + bac);
    console.log('it is not legal for you to drive');
  }
})();

function calcBAC(totalAlcohol, weight, gender, hours) {
  const absorbRate = gender === 'm' ? 0.73 : 0.6;

  return (
    Math.ceil(
      (((totalAlcohol * 5.14) / weight) * absorbRate - 0.015 * hours) * 100
    ) / 100
  );
}

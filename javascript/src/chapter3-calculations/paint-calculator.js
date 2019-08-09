const ru = require('../util/read-util');

(async () => {
  const width = await ru.questionForNumber('width in meters :');
  const height = await ru.questionForNumber('height in meters :');

  const areaPerLiter = 9;

  console.log(
    `You will need to purchase ${Math.ceil(
      (width * height) / 9
    )} liters of paint to cover ${width * height} square meters`
  );

  console.log();
  const radius = await ru.questionForNumber('radius in meters :');
  const circleArea = Math.ceil(Math.PI * radius * radius * 1000) / 1000;

  console.log(
    `You will need to purchase ${Math.ceil(
      circleArea / 9
    )} liters of paint to cover ${circleArea} square meters`
  );

  console.log();
  console.log('  __w1__');
  console.log(' |      |');
  console.log(' |      |');
  console.log(' |      |');
  console.log('h1      |____');
  console.log(' |           |');
  console.log(' |           h2');
  console.log(' |____w2_____|');
  console.log('');
  const w1 = await ru.questionForNumber('w1 : ');
  const w2 = await ru.questionForNumber('w2 : ');
  const h1 = await ru.questionForNumber('h1 : ');
  const h2 = await ru.questionForNumber('h2 : ');

  const area = w1 * h1 + (w2 - w1) * h2;

  console.log(
    `You will need to purchase ${Math.ceil(
      area / 9
    )} liters of paint to cover ${area} square meters`
  );
  ru.close();
})();

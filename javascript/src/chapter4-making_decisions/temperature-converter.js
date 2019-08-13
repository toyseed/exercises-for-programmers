const ru = require('../util/read-util');

const Celisus = {
  code: 'C',
  name: 'Celisus',
  toC: temperature => temperature,
  toF: temperature => (temperature * 9) / 5 + 32,
  toK: temperature => 273.15 + temperature
};

const Fahrenheit = {
  code: 'F',
  name: 'Fahrenheit',
  toC: temperature => ((temperature - 32) * 5) / 9,
  toF: temperature => temperature,
  toK: temperature => Celisus.toK(this.toC(temperature))
};

const Kelvin = {
  code: 'K',
  name: 'Kelvin',
  toC: temperature => temperature - 273.15,
  toF: temperature => Celisus.toF(this.toC(temperature)),
  toK: temperature => temperature
};

const temperatureTypes = [Celisus, Fahrenheit, Kelvin];

(async () => {
  const fromTemperatureType = await askTemperatureType('from');
  const toTemperatureType = await askTemperatureType('to');
  const temperatureConverter = getTemperatureConverter(
    fromTemperatureType,
    toTemperatureType
  );

  console.log('');
  const temperature = await askTemperature(fromTemperatureType);
  const convertedTemperature = temperatureConverter(temperature);

  console.log(
    `Them temperature in ${toTemperatureType.name} is ${convertedTemperature}.`
  );
})();

async function askTemperatureType(direction) {
  let temperatureType;

  temperatureTypes.forEach(type => console.log(`${type.code}: ${type.name}`));

  while (true) {
    let temperatureTypeCode = await ru.question(
      `choose convert ${direction}: `
    );
    if (!temperatureTypeCode) {
      continue;
    }

    let filteredTemperatureTypeArray = temperatureTypes.filter(
      type => type.code === temperatureTypeCode.toUpperCase()
    );

    if (
      filteredTemperatureTypeArray &&
      filteredTemperatureTypeArray.length === 1
    ) {
      temperatureType = filteredTemperatureTypeArray[0];
      break;
    }
  }

  return temperatureType;
}

async function askTemperature(fromTemperatureType) {
  const temperature = await ru.questionForNumber(
    `Please enter the temperature in ${fromTemperatureType.name}: `
  );

  return temperature;
}

function getTemperatureConverter(fromTemperatureType, toTemperatureType) {
  let converter;
  switch (toTemperatureType) {
    case Celisus:
      converter = fromTemperatureType.toC;
      break;
    case Fahrenheit:
      converter = fromTemperatureType.toF;
      break;
    case Kelvin:
      converter = fromTemperatureType.toK;
      break;
  }

  return converter;
}

/**
 * exercise 48 grabbing the weather
 *
 * api.openweathermap.org/data/2.5/weather?APPID=111111&q={city name},{country code}
 *
 * ref
 *
 * https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
 * https://openweathermap.org/current
 * http://www.physicalgeography.net/fundamentals/7n.html
 */
const https = require('https');
const ru = require('../util/read-util');
const {
  Kelvin
} = require('../chapter4-making_decisions/temperature-converter');

require('dotenv').config();
const appId = process.env.OpenWeather_ApiKey;

function fetchWeather(city, countryCode) {
  return new Promise((resolve, reject) => {
    https.get(
      `https://api.openweathermap.org/data/2.5/weather?APPID=${appId}&q=${city},${countryCode}`,
      response => {
        const body = [];
        response.on('data', chunk => body.push(chunk));
        response.on('end', () => {
          resolve(JSON.parse(body.join('')));
        });
        response.on('error', error => {
          reject(error);
        });
      }
    );
  });
}

function direction(deg) {
  if (deg === 0 || deg === 360) {
    return 'North';
  } else if (deg < 45) {
    return 'North-northeast';
  } else if (deg < 90) {
    return 'East-northeast';
  } else if (deg === 90) {
    return 'East';
  } else {
    return 'somewhere~';
  }
}

function printResult({
      main: { temp, humidity, temp_min, temp_max },
      wind: { deg },
      sys: { sunrise, sunset }
    }) {
  console.log(`current temperature: ${temp}K ${Kelvin.toC(temp)}C ${Kelvin.toF(temp)}F`)
  console.log(`minimum temperature: ${temp_min}K ${Kelvin.toC(temp_min)}C ${Kelvin.toF(temp_min)}F`);
  console.log(`minimum temperature: ${temp_max}K ${Kelvin.toC(temp_max)}C ${Kelvin.toF(temp_max)}F`);
  console.log(`current humidity: ${humidity}%`);
  console.log(`wind direction : ${direction(deg)}`);
  console.log(`sunrise at ${new Date(sunrise * 1000).toString()}`);
  console.log(`sunset at ${new Date(sunset * 1000).toString()}`);
};

(async () => {
  const answer = await ru.question('Where are you?(city countryCode) ');
  const [city, countryCode] = answer.split(' ');

  try {
    const weather = await fetchWeather(city, countryCode);
    printResult(weather);
  } catch (e) {
    console.log(e);
  }

  process.exit(0);
})();

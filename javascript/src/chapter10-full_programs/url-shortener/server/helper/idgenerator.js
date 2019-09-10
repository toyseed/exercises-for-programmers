const au = require('./arrayutil');
const cBase = [65, 97];
const cBound = 26;
const idLength = 8;

function getRandom(bound) {
  return Math.floor(Math.random() * bound);
}

function generate() {
  let chars = [];

  for (let i = chars.length; i < idLength; i++) {
    if (getRandom(2) === 0) {
      chars.push(getRandom(10) + '');
    } else {
      let baseIndex = getRandom(2);
      let base = cBase[baseIndex];
      chars.push(String.fromCharCode(base + getRandom(cBound)));
    }
  }

  return au.shuffle(chars).join('');
}

module.exports = { generate: generate };

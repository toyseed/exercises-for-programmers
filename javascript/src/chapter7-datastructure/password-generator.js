/**
 * exercise 37 password generator
 */

const ru = require('../util/read-util');
const au = require('../util/array-util');

const sps = '~!@#$%^&*()_+-='.split('');
const cBase = [65, 97];
const cBound = 26;

function getRandom(bound) {
  return Math.floor(Math.random() * bound);
}

function generatePasswords(count, minLength, specialCharacterCount, numberCount) {
  let passwords = [];

  for (let i = 0; i < count; i++) {
    passwords.push(generatePassword(minLength, specialCharacterCount, numberCount));
  }

  return passwords;
}

function generatePassword(minLength, specialCharacterCount, numberCount) {
  let maxAdditionalChar = 3;
  let chars = [];

  // fill sp
  for (let i = 0; i < specialCharacterCount; i++) {
    chars.push(sps[getRandom(sps.length)]);
  }

  // fill num
  for (let i = 0; i < numberCount; i++) {
    chars.push(getRandom(10));
  }

  // fill char
  for (let i = chars.length; i < minLength; i++) {
    let baseIndex = getRandom(2);
    let base = cBase[baseIndex];
    chars.push(String.fromCharCode(base + getRandom(cBound)));

    if (maxAdditionalChar > 0 && getRandom(2) === 1) {
      i--;
    }

    maxAdditionalChar--;
  }
  return au.shuffle(chars).join('');
}

function copyToClipboard(password) {
  const proc = require('child_process').spawn('pbcopy');
  proc.stdin.write(password);
  proc.stdin.end();

  return true;
}

function changeVowel(source) {
  let sourceArray = source.split('');
  for (let i = 0; i < sourceArray.length; i++) {
    let char = sourceArray[i];

    if (/[aeiouy]/i.test(char)) {
      sourceArray[i] = char.codePointAt(0) % 10 + '';
    }
  }

  return sourceArray.join('');
}

(async () => {
  const minLength = await ru.questionForNumber("what's the minimum length? ");
  const specialCharacterCount = await ru.questionForNumber("how many special characters? ");
  const numberCount = await ru.questionForNumber("how many numbers? ");

  const passwords = generatePasswords(4, minLength, specialCharacterCount, numberCount);

  console.log('your password is..');
  for (let i = 0; i < passwords.length; i++) {
    console.log(`${i + 1}) ${passwords[i]} (vowel changed: ${changeVowel(passwords[i])})`);
  }

  let picked = 0;
  while (true) {
    picked = await ru.questionForNumber('choose password: ');

    if (picked < 1 || picked > picked.length) {
      console.log('invalid index');
      continue;
    }

    break;
  }

  if (copyToClipboard(passwords[picked - 1])) {
    console.log(`"${passwords[picked - 1]}" is copied in clipboard`);
  }
})();
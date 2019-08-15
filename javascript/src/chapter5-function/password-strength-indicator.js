const ru = require('../util/read-util');

function passwordValidator(password) {
  let grade = -1;

  let hasNumber = false;
  let hasAlphabet = false;
  let hasSymbol = false;
  let hasEnoughLength = password.length > 7;

  for(let c of password) {
    if (/[0-9]/.test(c)) {
      hasNumber = true;
    } else if (/[a-zA-Z]/.test(c)) {
      hasAlphabet = true;
    } else {
      hasSymbol = true;
    }
  }

  // if (hasNumber && !hasAlphabet && !hasSymbol && !hasEnoughLength) {
  //   grade = 0;
  // } else if (!hasNumber && hasAlphabet && !hasSymbol && !hasEnoughLength) {
  //   grade = 1;
  // } else if (hasNumber && hasAlphabet && !hasSymbol && hasEnoughLength) {
  //   grade = 2;
  // } else if (hasNumber && hasAlphabet && hasSymbol && hasEnoughLength) {
  //   grade = 3;
  // }

  // i think way of below is better
  if (hasNumber) grade += 1;
  if (hasAlphabet) grade += 1;
  if (hasSymbol) grade += 1;
  if (hasEnoughLength) grade += 1;

  return grade;
}

const grades = ['very weak', 'weak', 'strong', 'very strong'];

(async () => {
  const password = await ru.question('enter password: ');

  const grade = passwordValidator(password);
  console.log(`The password '${password}' is a ${grades[grade]} password.`);
})();
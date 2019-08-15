/***
 * exercise 28 validating inputs
 */

const ru = require('../util/read-util');

const required = value => value || value.trim() !== '';
const minLength = value => value.length >= 2;
const idFormat = value => /[a-z]{2}-[0-9]{4}/i.test(value);
const onlyNumber = value => /[0-9]+/.test(value);

function validateInput(firstName, lastName, zipCode, employeeId) {
  let errorMessage = [];

  if (!(required(firstName) && minLength(firstName))) {
    errorMessage.push(
      `"${firstName}" is not a valid first name. it is ${
        required(firstName) ? 'too short.' : 'required.'
      }`
    );
  }

  if (!(required(lastName) && minLength(lastName))) {
    errorMessage.push(
      `"${lastName}" is not a valid last name. it is ${
        required(lastName) ? 'too short.' : 'required.'
      }`
    );
  }

  if (!idFormat(employeeId)) {
    errorMessage.push(`${employeeId} is not a valid ID.`);
  }

  if (!onlyNumber(zipCode)) {
    errorMessage.push('the zip code must be numeric');
  }

  return errorMessage;
}

(async () => {
  const firstName = await ru.question('enter the first name: ');
  const lastName = await ru.question('enter the last name: ');
  const zipCode = await ru.question('enter the zip code: ');
  const employeeId = await ru.question('enter an employee ID: ');

  const errorMessages = validateInput(firstName, lastName, zipCode, employeeId);
  let errorMessage = 'there were no errors found.';

  if (errorMessages.length > 0) {
    errorMessage = errorMessages.join('\n');
  }

  console.log(errorMessage);
})();

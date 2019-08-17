/***
 * exercise 34 employee list remover
 */


const ru = require('../util/read-util');
const fs = require('fs');

function employeeListFromFile() {
  const content = fs.readFileSync(__dirname + '/employee-list', {
    encoding: 'utf-8'
  });

  return content.split('\n').filter(value => value && value.trim() !== '');
}

function writeEmployeeListToFile(employees) {
  fs.writeFileSync(__dirname + '/employee-list', employees.join("\n"));
}

(async () => {
  const employees = employeeListFromFile();

  console.log(`there are ${employees.length} employees`);
  employees.forEach(employee => {
    console.log(employee);
  });

  const employeeToRemove = await ru.question(
    'enter an employee name to remove: '
  );
  const newEmployees = employees.filter(
    employee => employee.toUpperCase() !== employeeToRemove.toUpperCase()
  );

  writeEmployeeListToFile(newEmployees);
  const resultEmployees = employeeListFromFile();

  console.log(`there are ${resultEmployees.length} employees`);
  resultEmployees.forEach(employee => {
    console.log(employee);
  });
})();

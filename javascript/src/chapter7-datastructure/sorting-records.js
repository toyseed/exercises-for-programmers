/**
 * exercise 39 sorting record
 * TODO: challenge
 * - [x] sorting option
 * - [ ] working with redis
 * - [ ] print table ?
 */

const ru = require('../util/read-util');

const data = [
  member('John', 'Johnson', 'Manager', '2016-12-31'),
  member('Tou', 'Xiong', 'Software Engineer', '2016-10-15'),
  member('Michaela', 'Michaelson', 'District Manager', '2015-12-19'),
  member('Jake', 'Jacobson', 'Programmer', ''),
  member('Jacquelyn', 'Jackson', 'DBA', ''),
  member('Sally', 'Weber', 'Web Developer', '2015-12-18')
];

const stringSorter = field => (v1, v2) => (v1[field] > v2[field] ? 1 : -1);
const sortingOptions = [
  { name: 'First Name', sorter: stringSorter('firstName') },
  { name: 'Last Name', sorter: stringSorter('lastName') },
  { name: 'Position', sorter: stringSorter('position') },
  { name: 'Separation Date', sorter: stringSorter('separationDate') }
];

function member(firstName, lastName, position, separationDate) {
  return { firstName, lastName, position, separationDate };
}

function dataMapper(each) {
  return {
    Name: each.firstName + ' ' + each.lastName,
    Position: each.position,
    'Separation Date': each.separationDate
  };
}

function printTable(array) {}

(async () => {
  console.table(data.map(dataMapper));

  for (let i in sortingOptions) {
    console.log(`${i}) ${sortingOptions[i].name}`);
  }

  let picked = 0;
  while (true) {
    picked = await ru.questionForNumber('choose what to sort: ');

    if (picked < 0 || picked >= picked.length) {
      console.log('wrong number.');
      continue;
    }

    break;
  }

  let sortingOption = sortingOptions[picked];
  data.sort(sortingOption.sorter);

  console.table(data.map(dataMapper));
})();

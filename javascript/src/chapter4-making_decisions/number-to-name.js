const ru = require('../util/read-util');

function monthInEnglish(monthInNum) {
  switch (monthInNum) {
    case 1:
      return 'jan';
      break;
    case 2:
      return 'feb';
      break;
    case 3:
      return 'mar';
      break;
    case 4:
      return 'apr';
      break;
    case 5:
      return 'may';
      break;
    case 6:
      return 'jun';
      break;
    case 7:
      return 'jul';
      break;
    case 8:
      return 'aug';
      break;
    case 9:
      return 'sep';
      break;
    case 10:
      return 'oct';
      break;
    case 11:
      return 'nov';
      break;
    case 12:
      return 'dec';
      break;
    default:
      throw 'wrong number';
  }
};

const monthMap = {
  'english': ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
  'korean': ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
};

(async () => {
  let monthInLang;

  while(1) {
    let language = await ru.question('choose language: ');
    if (language && monthMap[language]) {
      monthInLang = monthMap[language];
      break;
    } else {
      console.log('not supported language');
    }
  }

  let monthInNumber;
  while(1) {
    monthInNumber = await ru.questionForNumber('please enter the number of the month: ');
    if (monthInNumber > 0 && monthInNumber < 13) {
      break;
    }
  }

  console.log(`the name of the month is ${monthInLang[monthInNumber - 1]}`);
  // console.log(`the name of the month is ${monthInEnglish(monthInNumber)}`);
})();
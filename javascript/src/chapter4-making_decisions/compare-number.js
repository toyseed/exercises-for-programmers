const ru = require('../util/read-util');

function hasSameNumber(nums) {
  if (nums.length < 2) {
    return false;
  }

  const numMap = {}
  for (let i = 0; i < nums.length - 1; i++) {
    if (numMap[nums[i]]) {
      return true;
    } else {
      numMap[nums[i]] = true;
    }
    // for (let j = i + 1; j < nums.length; j++) {
    //   if (nums[i] === nums[j]) {
    //     return true;
    //   }
    // }
  }

  return false;
}

function findMax(nums) {
  if (!nums || nums.length === 0) {
    throw 'invalid param';
  }

  let max = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (max < nums[i]) {
      max = nums[i];
    }
  }

  return max;
}

(async () => {
  // const num1 = await ru.questionForNumber('enter the first number: ');
  // const num2 = await ru.questionForNumber('enter the second number: ');
  // const num3 = await ru.questionForNumber('enter the third number: ');
  //
  // const nums = [num1, num2, num3];

  let nums = [];

  while (true) {
    let num = await ru.question('enter the number: ');

    if (!num || !/-?(0|[1-9][0-9]*)/.test(num)) {
      break;
    } else {
      nums.push(+num);
    }
  }

  if (!hasSameNumber(nums)) {
    const maxNum = findMax(nums);
    console.log(`The largest number is ${maxNum}`);
  }
})();

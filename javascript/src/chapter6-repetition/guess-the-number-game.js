/***
 * exercise 32 guess number game
 */

const ru = require('../util/read-util');

// 객체화의 목적
// ui와 관계 없이 사용할 수 있는 객체 정의.
class GuessNumber {
  constructor(level) {
    this.tryingCount = 0;
    this.wrongInputCount = 0;
    this.inputs = [];
    this.myNumber = Math.floor(Math.random() * Math.pow(10, level));

    // console.log('my number is: ', this.myNumber);
  }

  validate(guessInput) {
    this.tryingCount++;

    let isNumber = guessInput && guessInput.trim() !== '' && !isNaN(guessInput);

    if (!isNumber) {
      this.wrongInputCount++;
      return {
        success: false,
        noNumber: true,
        tryingCount: this.tryingCount,
        wrongInputCount: this.wrongInputCount
      };
    }

    let guess = +guessInput;

    let result = {};
    result.success = guess === this.myNumber;
    result.duplicatedInput =
      this.inputs.findIndex(input => input === guess) >= 0;
    result.low = guess < this.myNumber;
    result.high = guess > this.myNumber;
    result.tryingCount = this.tryingCount;
    result.wrongInputCount = this.wrongInputCount;

    if (!result.duplicatedInput) {
      this.inputs.push(guess);
    }

    return result;
  }
}

async function version2() {
  while (true) {
    console.log("let's play guess the number");
    let game;

    while (true) {
      let level = await ru.questionForNumber(
        'pick a difficulty level(1, 2, or 3): '
      );

      if (level < 1 || level > 3) {
        console.log(`"${level}" is wrong level`);
      } else {
        game = new GuessNumber(level);
        break;
      }
    }

    let question = "i have my number. what's your guess? ";
    while (true) {
      let guessInput = await ru.question(question);
      let result = game.validate(guessInput);

      // console.table(result);

      if (result.success) {
        printSuccess(result.tryingCount);
        break;
      } else if (result.low || result.high) {
        if (result.duplicatedInput) {
          console.log('duplicated input: ', guessInput);
        }
        question = (result.low ? 'too low' : 'too high') + ' guess again: ';
      } else if (result.noNumber) {
        console.log(`"${guessInput}" is not a number`);
      }
    }

    if (!(await askToRetry())) {
      console.log('good bye.');
      break;
    }
  }
}

async function version1() {
  while (true) {
    console.log("let's play guess the number");
    let level = 0;
    let tryingCount = 0;

    while (true) {
      level = await ru.questionForNumber(
        'pick a difficulty level(1, 2, or 3): '
      );

      if (level < 1 || level > 3) {
        console.log(`"${level}" is wrong level`);
      } else {
        break;
      }
    }

    let inputs = [];
    let wrongInputCount = 0;

    let myNumber = Math.floor(Math.random() * Math.pow(10, level));
    console.log('my number is : ', myNumber); // for debug

    // 아래도 while 로 들어가야함. - bug
    let guessInput = await ru.question("i have my number. what's your guess? ");
    tryingCount++;

    if (isNaN(guessInput)) {
      console.log(`${guessInput} is not a number`);
      wrongInputCount++;
      continue;
    }

    let guess = +guessInput;
    inputs.push(guess);

    while (true) {
      if (guess < myNumber || guess > myNumber) {
        guessInput = await ru.question(
          `${guess < myNumber ? 'too low' : 'too height'}, guess again: `
        );
        tryingCount++;

        if (isNaN(guessInput)) {
          console.log(`${guessInput} is not a number.`);
          wrongInputCount++;
          continue;
        }

        guess = +guessInput;
        if (inputs.findIndex(input => input === guess) > -1) {
          console.log(`you enter ${guess} again.`);
        }
      } else {
        printSuccess(tryingCount);
        break;
      }
    }

    if (!(await askToRetry())) {
      console.log('bye bye.');
      break;
    }
  }
}

function printSuccess(tryingCount) {
  if (tryingCount === 1) {
    console.log("you're a mind reader!");
  } else if (tryingCount > 1 && tryingCount < 5) {
    console.log('most impressive.');
  } else if (tryingCount > 5 && tryingCount < 7) {
    console.log('you can do better than that.');
  } else {
    console.log('better luck next time.');
  }
}

async function askToRetry() {
  const tryAgain = await ru.question('play again? ');
  return tryAgain && tryAgain.toLowerCase() === 'y';
}

(async () => version2())();

/***
 * exercise 33 magic 8 ball
 */

const ru = require('../util/read-util');

(async () => {
  const replies = [
    'yes',
    'no',
    'maybe',
    'ask again later',
    'absolutely',
    "i don't know",
    'you know the answer',
    'no way'
  ];
  await ru.question("what's your question? ");
  console.log(replies[Math.floor(Math.random() * 10) % 8]);
})();

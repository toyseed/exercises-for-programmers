/**
 * exercise 46 word frequency finder
 *
 * - [x] apply worker and compare
 *  - there are many overheads
 *    - worker creation
 *    - postMessage: structured cloning
 *    - result merging
 *  - in this case, worker is not good idea.
 *
 * ref
 * - https://cs.stackexchange.com/questions/26427/word-frequency-with-ordering-in-on-complexity
 */
const fs = require('fs');
const path = require('path');

class WordMap {
  constructor() {
    this.maxWordCount = 0;
    this.map = new Map();
  }

  put(word) {
    let current = this.map.get(word);
    if (current) {
      this.map.set(word, current + 1);
    } else {
      this.map.set(word, 1);
    }
    if (current >= this.maxWordCount) {
      this.maxWordCount = current + 1;
    }
  }
}

console.time('total');
console.time('read file');
const content = fs.readFileSync(
  // path.format({ dir: __dirname, name: 'word-frequency-finder.input' }),
  path.format({ dir: __dirname, name: '_macbeth' }),
  { encoding: 'utf-8' }
);

const words = content.split(/\s|\n/);
console.timeEnd('read file');

console.time('count word');
const wordMap = new WordMap();

for (let i = 0; i < words.length; i++) {
  wordMap.put(words[i]);
}
console.timeEnd('count word');

console.time('make result');
const result = [];
for (let [word, count] of wordMap.map) {
  let current = result[count];
  if (current) {
    current.push(word);
  } else {
    result[count] = [word];
  }
}
console.timeEnd('make result');

console.time('print result');
// for (let i = wordMap.maxWordCount; i > 0; i--) {
//   let words = result[i];
//   if (!words) {
//     continue;
//   }
//   let stars = '*'.repeat(i);
//   for (let j = 0; j < words.length; j++) {
//     console.log(words[j], stars);
//   }
// }
console.timeEnd('print result');
console.timeEnd('total');
console.log(wordMap.maxWordCount);
process.exit(0);

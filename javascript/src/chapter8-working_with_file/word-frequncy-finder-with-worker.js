const fs = require('fs');
const path = require('path');
const { Worker } = require('worker_threads');
const os = require('os');

class WorkerGroup {
  constructor(filepath) {
    this.workers = [];
    this.workerIndex = 0;

    const cpus = os.cpus();
    let index = 0;
    for (let cpu of cpus) {
      this.workers.push(
        new Worker(filepath, {
          workerData: { current: index++, workerCount: cpus.length }
        })
      );
    }

    this.workerCount = this.workers.length;
  }

  currentWorker() {
    this.workerIndex = ++this.workerIndex % this.workerCount;
    return this.workerIndex;
  }

  postMessage(message) {
    console.time('postMessage');
    this.workers[this.currentWorker()].postMessage(message);
    console.timeEnd('postMessage');
  }

  on(event, cb) {
    if (event === 'exit') {
      Promise.all(this.exitPromises()).then(() => {
        cb();
      });
      return;
    }

    for (let worker of this.workers) {
      worker.on(event, cb);
    }
  }

  broadcast(message) {
    console.time('broadcast');
    for (let worker of this.workers) {
      worker.postMessage(message);
    }
    console.timeEnd('broadcast');
  }

  exitPromises() {
    let promises = [];
    for (let worker of this.workers) {
      promises.push(
        new Promise(resolve => {
          worker.on('exit', () => {
            resolve();
          });
        })
      );
    }
    return promises;
  }
}
console.time('total');
console.time('read file');
const content = fs.readFileSync(
  path.format({ dir: __dirname, name: '_macbeth' }),
  { encoding: 'utf-8' }
);
const words = content.split(/\s|\n/);
console.timeEnd('read file');

console.time('create worker');
const workerPath = path.format({
  dir: __dirname,
  name: 'word-frequency-finder-with-worker-client.js'
});
const worker = new WorkerGroup(workerPath);
console.timeEnd('create worker');

console.time('broadcast event');
console.time('postMessage outer');
let part = parseInt(words.length / worker.workerCount);
for (let i = 0; i < worker.workerCount; i++) {
  worker.postMessage(words.slice(part * i, part * i + part));
}
console.timeEnd('postMessage outer');
worker.broadcast('exit');
console.timeEnd('broadcast event');

console.time('word count');
const wordMaps = [];
worker.on('message', message => {
  wordMaps.push(message);
});

worker.on('exit', () => {
  console.timeEnd('word count');
  console.time('merge');
  const merged = merge(wordMaps);
  console.timeEnd('merge');
  console.time('make result');
  const result = makeResult(merged.merged);
  console.timeEnd('make result');
  console.timeEnd('total');
  console.log(merged.maxWordLength);
});

function makeResult(wordMap) {
  const result = [];
  for (let [word, count] of wordMap) {
    let current = result[count];
    if (current) {
      current.push(word);
    } else {
      result[count] = [word];
    }
  }
  return result;
}

function merge(maps) {
  let maxWordLength = 0;
  let merged = new Map();
  for (let i = 0; i < maps.length; i++) {
    for (let [word, count] of maps[i]) {
      let wordCount = merged.get(word);
      if (typeof wordCount != 'undefined') {
        merged.set(word, wordCount + count);
      } else {
        merged.set(word, count);
      }

      if (maxWordLength < merged.get(word)) {
        maxWordLength = merged.get(word);
      }
    }
  }

  return {
    maxWordLength,
    merged
  };
}

// too slow
// const readline = require('readline');
// const rl = readline.createInterface({
//   input: fs.createReadStream(
//     // path.format({ dir: __dirname, name: 'word-frequency-finder.input' })
//     path.format({ dir: __dirname, name: '_macbeth' })
//   ),
//   crlfDelay: Infinity
// });
// console.time('read file');
// rl.on('line', line => {
//   worker.postMessage(line);
// });
//
// rl.on('close', () => {
//   worker.broadcast('exit');
//   console.timeEnd('read file');
//   console.time('make result');
// });

const { parentPort, threadId, workerData } = require('worker_threads');

class WordMap {
  constructor() {
    this.map = new Map();
  }

  put(word) {
    let current = this.map.get(word);
    if (current) {
      this.map.set(word, current + 1);
    } else {
      this.map.set(word, 1);
    }
  }
}

const wordMap = new WordMap();
const workerCount = workerData.workerCount;
const currentWorkerIndex = workerData.current;

parentPort.on('message', (message) => {
  if (message === 'exit') {
    parentPort.postMessage(wordMap.map);
    process.exit(0);
  }
  console.time(`${threadId} word count`);
  // const itemCount = parseInt(message.length / workerCount);
  // const fromIndex = itemCount * currentWorkerIndex;
  // const toIndex = fromIndex + itemCount;
  // for (let i = fromIndex; i < toIndex; i++) {
  //   wordMap.put(message[i]);
  // }
  // for (let word of message.split(' ')) {
  //   wordMap.put(word);
  // }

  for (let word of message) {
    wordMap.put(word);
  }

  console.timeEnd(`${threadId} word count`);
});


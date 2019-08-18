function shuffle(arr) {
  let [...shuffled] = arr;

  for (let i = shuffled.length - 1; i > 0; i--) {
    let temp = shuffled[i];
    let index = Math.floor(Math.random() * (i + 1));
    shuffled[i] = shuffled[index];
    shuffled[index] = temp;
  }

  return shuffled;
}

module.exports = {
  shuffle
}